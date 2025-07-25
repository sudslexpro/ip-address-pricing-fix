"use client";

import React, { useState, useRef, useEffect } from "react";
import {
	EnhancedModal as Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PDFViewerModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	content: React.ReactNode;
	filename?: string;
	size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}

interface PDFOptions {
	format: "a4" | "letter" | "legal";
	orientation: "portrait" | "landscape";
	margin: number;
	scale: number;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
	isOpen,
	onClose,
	title = "PDF Document",
	content,
	filename = "document.pdf",
	size = "xl",
}) => {
	const [isDownloading, setIsDownloading] = useState(false);
	const [isPrinting, setIsPrinting] = useState(false);
	const [pdfOptions, setPdfOptions] = useState<PDFOptions>({
		format: "a4",
		orientation: "portrait",
		margin: 20,
		scale: 2,
	});
	const [showOptions, setShowOptions] = useState(false);

	const contentRef = useRef<HTMLDivElement>(null);
	const printWindowRef = useRef<Window | null>(null);

	// Generate and download PDF
	const handleDownload = async () => {
		if (!contentRef.current) return;

		setIsDownloading(true);
		try {
			// Create a temporary container for PDF generation
			const tempContainer = document.createElement("div");
			tempContainer.style.position = "absolute";
			tempContainer.style.left = "-9999px";
			tempContainer.style.top = "-9999px";
			tempContainer.style.width = "210mm"; // A4 width
			tempContainer.style.background = "white";
			tempContainer.style.padding = `${pdfOptions.margin}px`;
			tempContainer.style.fontFamily = "Arial, sans-serif";
			tempContainer.style.fontSize = "12px";
			tempContainer.style.lineHeight = "1.4";
			tempContainer.style.color = "#000";

			// Clone the content and append to temp container
			const clonedContent = contentRef.current.cloneNode(true) as HTMLElement;

			// Remove any dark mode classes and ensure readability
			const removeClasses = (element: Element) => {
				element.classList.remove(
					"dark:text-white",
					"dark:bg-gray-800",
					"text-white",
					"bg-gray-800",
					"bg-background",
					"text-text-primary",
					"text-text-secondary"
				);
				element.classList.add("text-black", "bg-white");

				Array.from(element.children).forEach(removeClasses);
			};

			removeClasses(clonedContent);
			tempContainer.appendChild(clonedContent);
			document.body.appendChild(tempContainer);

			// Generate canvas from the temp container
			const canvas = await html2canvas(tempContainer, {
				scale: pdfOptions.scale,
				useCORS: true,
				allowTaint: true,
				backgroundColor: "#ffffff",
				logging: false,
			});

			// Calculate PDF dimensions
			const imgWidth = pdfOptions.format === "a4" ? 210 : 216; // mm
			const imgHeight = pdfOptions.format === "a4" ? 297 : 279; // mm
			const canvasWidth = canvas.width;
			const canvasHeight = canvas.height;

			// Calculate scale to fit content
			const pdfWidth = imgWidth - pdfOptions.margin * 2;
			const pdfHeight = imgHeight - pdfOptions.margin * 2;
			const ratio = Math.min(
				pdfWidth / (canvasWidth / pdfOptions.scale),
				pdfHeight / (canvasHeight / pdfOptions.scale)
			);

			const finalWidth = (canvasWidth / pdfOptions.scale) * ratio;
			const finalHeight = (canvasHeight / pdfOptions.scale) * ratio;

			// Create PDF
			const pdf = new jsPDF({
				orientation: pdfOptions.orientation,
				unit: "mm",
				format: pdfOptions.format,
			});

			const imgData = canvas.toDataURL("image/png");
			pdf.addImage(
				imgData,
				"PNG",
				pdfOptions.margin,
				pdfOptions.margin,
				finalWidth,
				finalHeight
			);

			// Clean up
			document.body.removeChild(tempContainer);

			// Download the PDF
			pdf.save(filename);
		} catch (error) {
			console.error("Error generating PDF:", error);
		} finally {
			setIsDownloading(false);
		}
	};

	// Print functionality
	const handlePrint = () => {
		if (!contentRef.current) return;

		setIsPrinting(true);
		try {
			// Create a new window for printing
			const printWindow = window.open("", "_blank");
			if (!printWindow) {
				alert("Please allow popups to enable printing");
				return;
			}

			printWindowRef.current = printWindow;

			// Create print-optimized HTML
			const printHTML = `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="utf-8">
					<title>${title}</title>
					<style>
						@media print {
							@page {
								margin: ${pdfOptions.margin}px;
								size: ${pdfOptions.format} ${pdfOptions.orientation};
							}
							body {
								font-family: Arial, sans-serif;
								font-size: 12px;
								line-height: 1.4;
								color: #000;
								background: white;
								margin: 0;
								padding: 0;
							}
							* {
								color: #000 !important;
								background: white !important;
								box-shadow: none !important;
								text-shadow: none !important;
							}
							.no-print {
								display: none !important;
							}
						}
						body {
							font-family: Arial, sans-serif;
							font-size: 12px;
							line-height: 1.4;
							color: #000;
							background: white;
							margin: 20px;
							padding: 0;
						}
						* {
							color: #000;
							background: white;
						}
					</style>
				</head>
				<body>
					${contentRef.current.innerHTML}
				</body>
				</html>
			`;

			printWindow.document.write(printHTML);
			printWindow.document.close();

			// Wait for content to load, then print
			setTimeout(() => {
				printWindow.focus();
				printWindow.print();

				// Close the print window after printing
				setTimeout(() => {
					printWindow.close();
					setIsPrinting(false);
				}, 1000);
			}, 500);
		} catch (error) {
			console.error("Error printing:", error);
			setIsPrinting(false);
		}
	};

	// Close print window when modal closes
	useEffect(() => {
		return () => {
			if (printWindowRef.current && !printWindowRef.current.closed) {
				printWindowRef.current.close();
			}
		};
	}, []);

	return (
		<Modal
			open={isOpen}
			onOpenChange={onClose}
			modalId={`pdf-viewer-${title.replace(/\s+/g, "-").toLowerCase()}`}>
			<ModalContent size={size} className="max-h-[90vh] flex flex-col">
				<ModalHeader className="flex-shrink-0">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Icon name="FileText" size={20} />
							<ModalTitle>{title}</ModalTitle>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowOptions(!showOptions)}
							className="text-muted-foreground hover:text-foreground">
							<Icon name="Settings" size={16} />
						</Button>
					</div>
				</ModalHeader>

				{/* PDF Options Panel */}
				{showOptions && (
					<div className="flex-shrink-0 border-b border-border p-4 space-y-4">
						<h4 className="text-sm font-medium">PDF Options</h4>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div>
								<label className="text-xs text-muted-foreground">Format</label>
								<select
									value={pdfOptions.format}
									onChange={(e) =>
										setPdfOptions((prev) => ({
											...prev,
											format: e.target.value as PDFOptions["format"],
										}))
									}
									className="w-full mt-1 px-2 py-1 text-xs border rounded">
									<option value="a4">A4</option>
									<option value="letter">Letter</option>
									<option value="legal">Legal</option>
								</select>
							</div>
							<div>
								<label className="text-xs text-muted-foreground">
									Orientation
								</label>
								<select
									value={pdfOptions.orientation}
									onChange={(e) =>
										setPdfOptions((prev) => ({
											...prev,
											orientation: e.target.value as PDFOptions["orientation"],
										}))
									}
									className="w-full mt-1 px-2 py-1 text-xs border rounded">
									<option value="portrait">Portrait</option>
									<option value="landscape">Landscape</option>
								</select>
							</div>
							<div>
								<label className="text-xs text-muted-foreground">
									Margin (px)
								</label>
								<input
									type="number"
									value={pdfOptions.margin}
									onChange={(e) =>
										setPdfOptions((prev) => ({
											...prev,
											margin: parseInt(e.target.value) || 20,
										}))
									}
									className="w-full mt-1 px-2 py-1 text-xs border rounded"
									min="0"
									max="50"
								/>
							</div>
							<div>
								<label className="text-xs text-muted-foreground">Scale</label>
								<select
									value={pdfOptions.scale}
									onChange={(e) =>
										setPdfOptions((prev) => ({
											...prev,
											scale: parseFloat(e.target.value),
										}))
									}
									className="w-full mt-1 px-2 py-1 text-xs border rounded">
									<option value="1">1x</option>
									<option value="1.5">1.5x</option>
									<option value="2">2x (Recommended)</option>
									<option value="3">3x</option>
								</select>
							</div>
						</div>
					</div>
				)}

				{/* PDF Content */}
				<div className="flex-1 overflow-auto p-6">
					<div
						ref={contentRef}
						className={cn(
							"w-full mx-auto bg-white text-black p-8 shadow-lg",
							"print:shadow-none print:p-0"
						)}
						style={{
							minHeight: "297mm", // A4 height
							maxWidth: "210mm", // A4 width
						}}>
						{content}
					</div>
				</div>

				{/* Action Buttons */}
				<ModalFooter className="flex-shrink-0 border-t border-border pt-4">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-2">
							<Button
								onClick={handleDownload}
								disabled={isDownloading}
								className="flex items-center gap-2">
								{isDownloading ? (
									<Icon name="Loader2" size={16} className="animate-spin" />
								) : (
									<Icon name="Download" size={16} />
								)}
								{isDownloading ? "Generating..." : "Download PDF"}
							</Button>
							<Button
								variant="outline"
								onClick={handlePrint}
								disabled={isPrinting}
								className="flex items-center gap-2">
								{isPrinting ? (
									<Icon name="Loader2" size={16} className="animate-spin" />
								) : (
									<Icon name="Printer" size={16} />
								)}
								{isPrinting ? "Preparing..." : "Print"}
							</Button>
						</div>
						<Button
							variant="secondary"
							onClick={onClose}
							className="flex items-center gap-2">
							<Icon name="X" size={16} />
							Close
						</Button>
					</div>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default PDFViewerModal;

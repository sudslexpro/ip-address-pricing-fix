"use client";

import React, { useState, useEffect } from "react";
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
import { Document, Page, pdfjs } from "react-pdf";

// Set up PDF.js worker
if (typeof window !== "undefined") {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PDFViewerModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	content?: React.ReactNode;
	pdfPath?: string;
	size?: "sm" | "default" | "md" | "lg" | "xl" | "full" | "auto";
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
	isOpen,
	onClose,
	title = "PDF Document",
	content,
	pdfPath,
	size = "xl",
}) => {
	const [numPages, setNumPages] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Reset state when modal opens with new content
	useEffect(() => {
		if (isOpen) {
			setPageNumber(1);
			setNumPages(0);
			setError(null);
			setLoading(false);
		}
	}, [isOpen, pdfPath, content]);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
		setLoading(false);
		setError(null);
	};

	const onDocumentLoadError = (error: Error) => {
		setError(`Failed to load PDF: ${error.message}`);
		setLoading(false);
	};

	const goToPrevPage = () => {
		setPageNumber((prev) => Math.max(prev - 1, 1));
	};

	const goToNextPage = () => {
		setPageNumber((prev) => Math.min(prev + 1, numPages));
	};

	const renderContent = () => {
		if (pdfPath) {
			return (
				<div className="w-full h-full flex flex-col">
					{loading && (
						<div className="flex items-center justify-center p-8">
							<Icon name="Loader2" size={24} className="animate-spin mr-2" />
							<span>Loading PDF...</span>
						</div>
					)}

					{error && (
						<div className="flex items-center justify-center p-8 text-red-600">
							<Icon name="AlertCircle" size={24} className="mr-2" />
							<span>{error}</span>
						</div>
					)}

					<div className="flex-1 flex items-center justify-center p-4">
						<Document
							file={pdfPath}
							onLoadSuccess={onDocumentLoadSuccess}
							onLoadError={onDocumentLoadError}
							loading={
								<div className="flex items-center justify-center p-8">
									<Icon
										name="Loader2"
										size={24}
										className="animate-spin mr-2"
									/>
									<span>Loading PDF...</span>
								</div>
							}
							error={
								<div className="flex items-center justify-center p-8 text-red-600">
									<Icon name="AlertCircle" size={24} className="mr-2" />
									<span>Failed to load PDF</span>
								</div>
							}
							className="flex items-center justify-center">
							<Page
								pageNumber={pageNumber}
								renderTextLayer={false}
								renderAnnotationLayer={false}
								className="max-w-full h-auto shadow-lg"
								width={Math.min(window.innerWidth * 0.7, 800)}
							/>
						</Document>
					</div>

					{numPages > 1 && (
						<div className="flex items-center justify-center gap-4 p-4 border-t border-border">
							<Button
								variant="outline"
								size="sm"
								onClick={goToPrevPage}
								disabled={pageNumber <= 1}
								className="flex items-center gap-2">
								<Icon name="ChevronLeft" size={16} />
								Previous
							</Button>

							<span className="text-sm text-muted-foreground">
								Page {pageNumber} of {numPages}
							</span>

							<Button
								variant="outline"
								size="sm"
								onClick={goToNextPage}
								disabled={pageNumber >= numPages}
								className="flex items-center gap-2">
								Next
								<Icon name="ChevronRight" size={16} />
							</Button>
						</div>
					)}
				</div>
			);
		}

		// Render React content (original functionality)
		return (
			<div
				className={cn(
					"w-full mx-auto bg-white text-black p-8 shadow-lg rounded-lg",
					"border border-gray-200"
				)}
				style={{
					minHeight: "297mm", // A4 height
					maxWidth: "210mm", // A4 width
				}}>
				{content}
			</div>
		);
	};

	return (
		<Modal
			open={isOpen}
			onOpenChange={onClose}
			modalId={`pdf-viewer-${title.replace(/\s+/g, "-").toLowerCase()}`}>
			<ModalContent size={size} className="max-h-[90vh] flex flex-col">
				<ModalHeader className="flex-shrink-0">
					<div className="flex items-center gap-2">
						<Icon name="FileText" size={20} />
						<ModalTitle>{title}</ModalTitle>
						{pdfPath && (
							<span className="text-sm text-muted-foreground">(PDF File)</span>
						)}
					</div>
				</ModalHeader>

				{/* PDF Content */}
				<div className="flex-1 overflow-auto p-6">{renderContent()}</div>

				{/* Action Buttons */}
				<ModalFooter className="flex-shrink-0 border-t border-border pt-4">
					<div className="flex justify-end w-full">
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

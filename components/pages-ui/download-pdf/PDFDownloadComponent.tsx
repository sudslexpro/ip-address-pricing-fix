"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import LexProtectorLetterhead from "./LexProtectorLetterhead";

interface QuoteCountry {
	country: string;
	flag: string;
	governmentFee: number;
	attorneyFee: number;
	commission: number;
	total: number;
	timeline: string;
	services: string[];
}

interface Service {
	id: string;
	name: string;
	description: string;
	basePrice: number;
}

interface GeneratedQuote {
	countries: QuoteCountry[];
	services: Service[];
	grandTotal: number;
	generatedAt: string;
}

interface PDFDownloadComponentProps {
	quote: GeneratedQuote;
	onDownloadComplete?: () => void;
}

const PDFDownloadComponent: React.FC<PDFDownloadComponentProps> = ({
	quote,
	onDownloadComplete,
}) => {
	const pdfContentRef = useRef<HTMLDivElement>(null);

	const generatePDF = async () => {
		if (!pdfContentRef.current) return;

		try {
			// Create a temporary container for PDF content
			const tempContainer = document.createElement("div");
			tempContainer.style.position = "absolute";
			tempContainer.style.left = "-9999px";
			tempContainer.style.top = "0";
			tempContainer.style.width = "210mm"; // A4 width
			tempContainer.style.backgroundColor = "white";
			tempContainer.style.fontFamily = "Arial, sans-serif";
			tempContainer.style.fontSize = "12px";
			tempContainer.style.lineHeight = "1.4";
			tempContainer.style.color = "#000";

			document.body.appendChild(tempContainer);

			// Clone the content to the temporary container
			const clonedContent = pdfContentRef.current.cloneNode(
				true
			) as HTMLElement;
			tempContainer.appendChild(clonedContent);

			// Wait a bit for rendering
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Generate canvas from the temporary container
			const canvas = await html2canvas(tempContainer, {
				scale: 2,
				useCORS: true,
				backgroundColor: "#ffffff",
				width: 794, // A4 width in pixels at 96 DPI
				height: 1123, // A4 height in pixels at 96 DPI
			});

			// Remove temporary container
			document.body.removeChild(tempContainer);

			// Create PDF
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "mm",
				format: "a4",
			});

			const imgData = canvas.toDataURL("image/png");
			const imgWidth = 210; // A4 width in mm
			const pageHeight = 297; // A4 height in mm
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			let heightLeft = imgHeight;

			let position = 0;

			// Add first page
			pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;

			// Add additional pages if content is longer than one page
			while (heightLeft >= 0) {
				position = heightLeft - imgHeight;
				pdf.addPage();
				pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;
			}

			// Generate filename with timestamp
			const timestamp = new Date().toISOString().slice(0, 10);
			const filename = `LexProtector_MultiCountry_Quote_${timestamp}.pdf`;

			// Download the PDF
			pdf.save(filename);

			// Call completion callback
			if (onDownloadComplete) {
				onDownloadComplete();
			}
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Error generating PDF. Please try again.");
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div>
			{/* Hidden PDF Content */}
			<div
				ref={pdfContentRef}
				className="hidden print:block"
				style={{
					width: "210mm",
					minHeight: "297mm",
					padding: "20mm",
					backgroundColor: "white",
					fontFamily: "Arial, sans-serif",
					fontSize: "12px",
					lineHeight: "1.4",
					color: "#000",
				}}>
				{/* Letterhead */}
				<LexProtectorLetterhead
					date={formatDate(quote.generatedAt)}
					quoteNumber={`LPQ-${Date.now().toString().slice(-6)}`}
				/>

				{/* Quote Summary */}
				<div className="mb-8">
					<h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
						QUOTE SUMMARY
					</h3>
					<div className="grid grid-cols-2 gap-6">
						<div>
							<p className="text-sm text-gray-700">
								<strong>Number of Countries:</strong> {quote.countries.length}
							</p>
							<p className="text-sm text-gray-700">
								<strong>Services Selected:</strong> {quote.services.length}
							</p>
							<p className="text-sm text-gray-700">
								<strong>Quote Generated:</strong>{" "}
								{formatDate(quote.generatedAt)}
							</p>
						</div>
						<div>
							<p className="text-xl font-bold text-blue-600">
								<strong>
									Total Investment: {formatCurrency(quote.grandTotal)}
								</strong>
							</p>
						</div>
					</div>
				</div>

				{/* Services Section */}
				<div className="mb-8">
					<h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
						SELECTED SERVICES
					</h3>
					<div className="grid gap-3">
						{quote.services.map((service, index) => (
							<div
								key={index}
								className="flex justify-between items-center p-3 bg-gray-50 rounded">
								<div>
									<p className="font-medium text-gray-900">{service.name}</p>
									<p className="text-sm text-gray-600">{service.description}</p>
								</div>
								<p className="font-medium text-gray-900">
									{formatCurrency(service.basePrice)}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Country-wise Breakdown Table */}
				<div className="mb-8">
					<h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
						COUNTRY-WISE COST BREAKDOWN
					</h3>
					<table className="w-full border-collapse border border-gray-300">
						<thead>
							<tr className="bg-blue-50">
								<th className="border border-gray-300 p-3 text-left font-bold text-gray-900">
									Country
								</th>
								<th className="border border-gray-300 p-3 text-right font-bold text-gray-900">
									Government Fee
								</th>
								<th className="border border-gray-300 p-3 text-right font-bold text-gray-900">
									Attorney Fee
								</th>
								<th className="border border-gray-300 p-3 text-right font-bold text-gray-900">
									Commission
								</th>
								<th className="border border-gray-300 p-3 text-right font-bold text-gray-900">
									Total
								</th>
								<th className="border border-gray-300 p-3 text-center font-bold text-gray-900">
									Timeline
								</th>
							</tr>
						</thead>
						<tbody>
							{quote.countries.map((country, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
									<td className="border border-gray-300 p-3">
										<div className="flex items-center space-x-2">
											<span className="text-lg">{country.flag}</span>
											<span className="font-medium text-gray-900">
												{country.country}
											</span>
										</div>
									</td>
									<td className="border border-gray-300 p-3 text-right text-gray-700">
										{formatCurrency(country.governmentFee)}
									</td>
									<td className="border border-gray-300 p-3 text-right text-gray-700">
										{formatCurrency(country.attorneyFee)}
									</td>
									<td className="border border-gray-300 p-3 text-right text-gray-700">
										{formatCurrency(country.commission)}
									</td>
									<td className="border border-gray-300 p-3 text-right font-bold text-blue-600">
										{formatCurrency(country.total)}
									</td>
									<td className="border border-gray-300 p-3 text-center text-gray-700">
										{country.timeline}
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="bg-blue-100">
								<td
									className="border border-gray-300 p-3 font-bold text-gray-900"
									colSpan={4}>
									GRAND TOTAL
								</td>
								<td className="border border-gray-300 p-3 text-right font-bold text-blue-600 text-lg">
									{formatCurrency(quote.grandTotal)}
								</td>
								<td className="border border-gray-300 p-3"></td>
							</tr>
						</tfoot>
					</table>
				</div>

				{/* Terms and Conditions */}
				<div className="mb-8">
					<h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
						TERMS & CONDITIONS
					</h3>
					<div className="text-sm text-gray-700 space-y-2">
						<p>
							• This quote is valid for 30 days from the date of generation.
						</p>
						<p>
							• Government fees are subject to change based on official fee
							schedules.
						</p>
						<p>
							• Timeline estimates are approximate and may vary based on
							examination complexity.
						</p>
						<p>
							• Additional costs may apply for office actions, oppositions, or
							other proceedings.
						</p>
						<p>• Payment terms: 50% advance, 50% upon filing confirmation.</p>
						<p>• All fees are exclusive of applicable taxes.</p>
					</div>
				</div>

				{/* Footer */}
				<div className="border-t border-gray-300 pt-4">
					<div className="text-center text-sm text-gray-600">
						<p className="font-medium text-gray-900">
							LEX PROTECTOR - Global Trademark Protection Services
						</p>
						<p>
							For questions about this quote, please contact us at
							info@lexprotector.com or +1 (555) 123-4567
						</p>
						<p className="mt-2 text-xs">
							This document is computer-generated and does not require a
							signature.
						</p>
					</div>
				</div>
			</div>

			{/* Download Button */}
			<button
				onClick={generatePDF}
				className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
				<svg
					className="w-4 h-4 mr-2"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>
				Download PDF Quote
			</button>
		</div>
	);
};

export default PDFDownloadComponent;

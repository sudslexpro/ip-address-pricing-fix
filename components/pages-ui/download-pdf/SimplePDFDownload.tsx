"use client";
import React from "react";
import jsPDF from "jspdf";

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

interface SimplePDFDownloadProps {
	quote: GeneratedQuote;
	onDownloadComplete?: () => void;
}

const SimplePDFDownload: React.FC<SimplePDFDownloadProps> = ({
	quote,
	onDownloadComplete,
}) => {
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

	const generatePDF = async () => {
		try {
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "mm",
				format: "a4",
			});

			let yPos = 20;
			const pageWidth = 210;
			const margin = 20;
			const contentWidth = pageWidth - 2 * margin;

			// Header
			pdf.setFontSize(24);
			pdf.setFont("helvetica", "bold");
			pdf.text("LEX PROTECTOR", margin, yPos);

			yPos += 8;
			pdf.setFontSize(14);
			pdf.setFont("helvetica", "normal");
			pdf.text("Global Trademark Protection Services", margin, yPos);

			yPos += 15;
			pdf.setFontSize(18);
			pdf.setFont("helvetica", "bold");
			pdf.text("MULTI-COUNTRY TRADEMARK REGISTRATION QUOTE", margin, yPos);

			// Quote details
			yPos += 15;
			pdf.setFontSize(10);
			pdf.setFont("helvetica", "normal");
			const currentDate = formatDate(quote.generatedAt);
			const quoteNumber = `LPQ-${Date.now().toString().slice(-6)}`;
			pdf.text(`Quote #: ${quoteNumber}`, margin, yPos);
			pdf.text(`Date: ${currentDate}`, pageWidth - margin - 40, yPos);

			// Quote Summary
			yPos += 15;
			pdf.setFontSize(14);
			pdf.setFont("helvetica", "bold");
			pdf.text("QUOTE SUMMARY", margin, yPos);

			yPos += 10;
			pdf.setFontSize(10);
			pdf.setFont("helvetica", "normal");
			pdf.text(`Number of Countries: ${quote.countries.length}`, margin, yPos);
			yPos += 5;
			pdf.text(`Services Selected: ${quote.services.length}`, margin, yPos);
			yPos += 5;
			pdf.text(
				`Total Investment: ${formatCurrency(quote.grandTotal)}`,
				margin,
				yPos
			);

			// Services
			yPos += 15;
			pdf.setFontSize(14);
			pdf.setFont("helvetica", "bold");
			pdf.text("SELECTED SERVICES", margin, yPos);

			yPos += 10;
			pdf.setFontSize(10);
			pdf.setFont("helvetica", "normal");
			quote.services.forEach((service) => {
				pdf.text(
					`• ${service.name} - ${formatCurrency(service.basePrice)}`,
					margin,
					yPos
				);
				yPos += 5;
				pdf.text(`  ${service.description}`, margin + 5, yPos);
				yPos += 8;
			});

			// Country breakdown table
			yPos += 10;
			pdf.setFontSize(14);
			pdf.setFont("helvetica", "bold");
			pdf.text("COUNTRY-WISE COST BREAKDOWN", margin, yPos);

			yPos += 10;

			// Table header
			pdf.setFontSize(9);
			pdf.setFont("helvetica", "bold");
			const colWidths = [40, 25, 25, 25, 25, 30];
			const headers = [
				"Country",
				"Gov Fee",
				"Atty Fee",
				"Commission",
				"Total",
				"Timeline",
			];
			let xPos = margin;

			headers.forEach((header, index) => {
				pdf.text(header, xPos, yPos);
				xPos += colWidths[index];
			});

			yPos += 8;
			pdf.setFont("helvetica", "normal");

			// Table rows
			quote.countries.forEach((country) => {
				if (yPos > 250) {
					// Check if we need a new page
					pdf.addPage();
					yPos = 20;
				}

				xPos = margin;
				const rowData = [
					country.country,
					formatCurrency(country.governmentFee),
					formatCurrency(country.attorneyFee),
					formatCurrency(country.commission),
					formatCurrency(country.total),
					country.timeline,
				];

				rowData.forEach((data, index) => {
					pdf.text(data, xPos, yPos);
					xPos += colWidths[index];
				});
				yPos += 6;
			});

			// Total row
			yPos += 5;
			pdf.setFont("helvetica", "bold");
			pdf.text("GRAND TOTAL", margin, yPos);
			pdf.text(formatCurrency(quote.grandTotal), margin + 140, yPos);

			// Terms and conditions
			yPos += 15;
			pdf.setFontSize(12);
			pdf.text("TERMS & CONDITIONS", margin, yPos);

			yPos += 8;
			pdf.setFontSize(9);
			pdf.setFont("helvetica", "normal");
			const terms = [
				"• This quote is valid for 30 days from the date of generation.",
				"• Government fees are subject to change based on official fee schedules.",
				"• Timeline estimates are approximate and may vary based on examination complexity.",
				"• Additional costs may apply for office actions, oppositions, or other proceedings.",
				"• Payment terms: 50% advance, 50% upon filing confirmation.",
				"• All fees are exclusive of applicable taxes.",
			];

			terms.forEach((term) => {
				if (yPos > 270) {
					pdf.addPage();
					yPos = 20;
				}
				pdf.text(term, margin, yPos);
				yPos += 6;
			});

			// Footer
			yPos += 10;
			pdf.text(
				"LEX PROTECTOR - Global Trademark Protection Services",
				margin,
				yPos
			);
			yPos += 5;
			pdf.text(
				"For questions about this quote, please contact us at info@lexprotector.com",
				margin,
				yPos
			);

			// Save the PDF
			const timestamp = new Date().toISOString().slice(0, 10);
			const filename = `LexProtector_MultiCountry_Quote_${timestamp}.pdf`;
			pdf.save(filename);

			if (onDownloadComplete) {
				onDownloadComplete();
			}
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("Error generating PDF. Please try again.");
		}
	};

	return (
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
	);
};

export default SimplePDFDownload;

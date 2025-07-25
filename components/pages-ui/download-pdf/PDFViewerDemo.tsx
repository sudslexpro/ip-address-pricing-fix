"use client";

import React from "react";
import PDFViewerModal from "./PDFViewerModal";
import { usePDFViewerModal } from "@/hooks/usePDFViewerModal";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import LexProtectorLetterhead from "./LexProtectorLetterhead";

// Sample quotation data
const sampleQuotationData = {
	quoteNumber: "LPQ-2025-001",
	clientName: "Global Tech Solutions Ltd.",
	clientEmail: "legal@globaltechsolutions.com",
	dateGenerated: new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}),
	validUntil: new Date(
		Date.now() + 30 * 24 * 60 * 60 * 1000
	).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}),
	countries: [
		{
			country: "United States",
			flag: "🇺🇸",
			governmentFee: 250,
			attorneyFee: 300,
			commission: 75,
			total: 625,
			timeline: "8-12 months",
			services: ["Trademark Search", "Application Filing"],
		},
		{
			country: "United Kingdom",
			flag: "🇬🇧",
			governmentFee: 200,
			attorneyFee: 280,
			commission: 70,
			total: 550,
			timeline: "4-6 months",
			services: ["Trademark Search", "Application Filing"],
		},
		{
			country: "Germany",
			flag: "🇩🇪",
			governmentFee: 180,
			attorneyFee: 290,
			commission: 72.5,
			total: 542.5,
			timeline: "6-8 months",
			services: ["Trademark Search", "Application Filing"],
		},
	],
	services: [
		{
			name: "Trademark Search",
			description:
				"Comprehensive database search to check trademark availability",
			basePrice: 150,
		},
		{
			name: "Application Filing",
			description: "Complete trademark application preparation and filing",
			basePrice: 200,
		},
	],
	grandTotal: 1717.5,
	notes: [
		"All fees are quoted in USD",
		"Government fees are subject to change",
		"Timeline estimates are approximate and may vary",
		"Commission rates are based on current partnership terms",
	],
};

// Sample Quotation Content Component
const SampleQuotationContent: React.FC = () => {
	return (
		<div className="space-y-8">
			{/* Letterhead */}
			<LexProtectorLetterhead />

			{/* Quote Header */}
			<div className="text-center border-b-2 border-gray-300 pb-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					TRADEMARK REGISTRATION QUOTATION
				</h1>
				<div className="text-lg text-gray-600">
					Quote #{sampleQuotationData.quoteNumber}
				</div>
			</div>

			{/* Client and Quote Information */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<h3 className="text-lg font-semibold text-gray-800 mb-3">
						Client Information
					</h3>
					<div className="space-y-2 text-gray-700">
						<div>
							<strong>Company:</strong> {sampleQuotationData.clientName}
						</div>
						<div>
							<strong>Email:</strong> {sampleQuotationData.clientEmail}
						</div>
					</div>
				</div>
				<div>
					<h3 className="text-lg font-semibold text-gray-800 mb-3">
						Quote Details
					</h3>
					<div className="space-y-2 text-gray-700">
						<div>
							<strong>Date Generated:</strong>{" "}
							{sampleQuotationData.dateGenerated}
						</div>
						<div>
							<strong>Valid Until:</strong> {sampleQuotationData.validUntil}
						</div>
					</div>
				</div>
			</div>

			{/* Services Overview */}
			<div>
				<h3 className="text-lg font-semibold text-gray-800 mb-4">
					Services Included
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{sampleQuotationData.services.map((service, index) => (
						<div key={index} className="border border-gray-300 rounded-lg p-4">
							<h4 className="font-medium text-gray-800">{service.name}</h4>
							<p className="text-sm text-gray-600 mt-1">
								{service.description}
							</p>
							<div className="text-right text-lg font-semibold text-blue-600 mt-2">
								${service.basePrice}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Country-wise Breakdown */}
			<div>
				<h3 className="text-lg font-semibold text-gray-800 mb-4">
					Country-wise Fee Breakdown
				</h3>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse border border-gray-300">
						<thead>
							<tr className="bg-gray-50">
								<th className="border border-gray-300 px-4 py-3 text-left">
									Country
								</th>
								<th className="border border-gray-300 px-4 py-3 text-right">
									Gov. Fee
								</th>
								<th className="border border-gray-300 px-4 py-3 text-right">
									Attorney Fee
								</th>
								<th className="border border-gray-300 px-4 py-3 text-right">
									Commission
								</th>
								<th className="border border-gray-300 px-4 py-3 text-right">
									Total
								</th>
								<th className="border border-gray-300 px-4 py-3 text-center">
									Timeline
								</th>
							</tr>
						</thead>
						<tbody>
							{sampleQuotationData.countries.map((country, index) => (
								<tr
									key={index}
									className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
									<td className="border border-gray-300 px-4 py-3">
										<div className="flex items-center gap-2">
											<span className="text-lg">{country.flag}</span>
											<span className="font-medium">{country.country}</span>
										</div>
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										${country.governmentFee.toFixed(2)}
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										${country.attorneyFee.toFixed(2)}
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										${country.commission.toFixed(2)}
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right font-semibold">
										${country.total.toFixed(2)}
									</td>
									<td className="border border-gray-300 px-4 py-3 text-center text-sm">
										{country.timeline}
									</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="bg-blue-50">
								<td
									className="border border-gray-300 px-4 py-3 font-bold"
									colSpan={4}>
									GRAND TOTAL
								</td>
								<td className="border border-gray-300 px-4 py-3 text-right font-bold text-lg text-blue-600">
									${sampleQuotationData.grandTotal.toFixed(2)}
								</td>
								<td className="border border-gray-300 px-4 py-3"></td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>

			{/* Important Notes */}
			<div>
				<h3 className="text-lg font-semibold text-gray-800 mb-4">
					Important Notes
				</h3>
				<ul className="space-y-2">
					{sampleQuotationData.notes.map((note, index) => (
						<li key={index} className="flex items-start gap-2 text-gray-700">
							<span className="text-blue-600 mt-1">•</span>
							<span>{note}</span>
						</li>
					))}
				</ul>
			</div>

			{/* Contact Information */}
			<div className="border-t-2 border-gray-300 pt-6 text-center">
				<h3 className="text-lg font-semibold text-gray-800 mb-2">
					Contact Information
				</h3>
				<div className="text-gray-600 space-y-1">
					<div>For questions about this quotation, please contact:</div>
					<div className="font-medium">partner@lexprotector.com</div>
					<div>+1 (555) 123-4567</div>
				</div>
			</div>

			{/* Footer */}
			<div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
				<div>© 2025 Lex Protector. All rights reserved.</div>
				<div className="mt-1">
					This quotation is confidential and proprietary to Lex Protector and
					the intended recipient.
				</div>
			</div>
		</div>
	);
};

// Schedule of Charges Content Component
const ScheduleOfChargesContent: React.FC = () => {
	return (
		<div className="space-y-8">
			{/* Letterhead */}
			<LexProtectorLetterhead />

			{/* Header */}
			<div className="text-center border-b-2 border-gray-300 pb-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					SCHEDULE OF CHARGES
				</h1>
				<div className="text-lg text-gray-600">
					Trademark Registration Services - 2025
				</div>
			</div>

			{/* Service Categories */}
			<div className="space-y-8">
				{/* Trademark Search Services */}
				<div>
					<h3 className="text-xl font-semibold text-gray-800 mb-4 bg-blue-50 p-3 rounded">
						Trademark Search Services
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse border border-gray-300">
							<thead>
								<tr className="bg-gray-50">
									<th className="border border-gray-300 px-4 py-3 text-left">
										Service
									</th>
									<th className="border border-gray-300 px-4 py-3 text-left">
										Description
									</th>
									<th className="border border-gray-300 px-4 py-3 text-right">
										Price (USD)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Basic Search
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Identical mark search in primary databases
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$75
									</td>
								</tr>
								<tr className="bg-gray-50">
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Comprehensive Search
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Comprehensive search including similar marks and common law
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$150
									</td>
								</tr>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Watch Service Setup
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Ongoing monitoring for conflicting applications
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$100
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Application Services */}
				<div>
					<h3 className="text-xl font-semibold text-gray-800 mb-4 bg-green-50 p-3 rounded">
						Application Filing Services
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse border border-gray-300">
							<thead>
								<tr className="bg-gray-50">
									<th className="border border-gray-300 px-4 py-3 text-left">
										Service
									</th>
									<th className="border border-gray-300 px-4 py-3 text-left">
										Description
									</th>
									<th className="border border-gray-300 px-4 py-3 text-right">
										Price (USD)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Application Preparation
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Complete application drafting and review
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$200
									</td>
								</tr>
								<tr className="bg-gray-50">
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Filing Service
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Electronic filing with relevant trademark office
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$100
									</td>
								</tr>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Priority Claim
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Paris Convention priority claim preparation
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$75
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Prosecution Services */}
				<div>
					<h3 className="text-xl font-semibold text-gray-800 mb-4 bg-yellow-50 p-3 rounded">
						Prosecution & Response Services
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse border border-gray-300">
							<thead>
								<tr className="bg-gray-50">
									<th className="border border-gray-300 px-4 py-3 text-left">
										Service
									</th>
									<th className="border border-gray-300 px-4 py-3 text-left">
										Description
									</th>
									<th className="border border-gray-300 px-4 py-3 text-right">
										Price (USD)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Office Action Response
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Response to examiner objections or rejections
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$300-500
									</td>
								</tr>
								<tr className="bg-gray-50">
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Opposition Response
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Defense against third-party oppositions
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$500-1000
									</td>
								</tr>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Extension Requests
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Time extension requests and filings
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$150
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				{/* Maintenance Services */}
				<div>
					<h3 className="text-xl font-semibold text-gray-800 mb-4 bg-purple-50 p-3 rounded">
						Maintenance & Renewal Services
					</h3>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse border border-gray-300">
							<thead>
								<tr className="bg-gray-50">
									<th className="border border-gray-300 px-4 py-3 text-left">
										Service
									</th>
									<th className="border border-gray-300 px-4 py-3 text-left">
										Description
									</th>
									<th className="border border-gray-300 px-4 py-3 text-right">
										Price (USD)
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Renewal Filing
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Trademark renewal application preparation and filing
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$125-250
									</td>
								</tr>
								<tr className="bg-gray-50">
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Use Declaration
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Declaration of continued use filing
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$200
									</td>
								</tr>
								<tr>
									<td className="border border-gray-300 px-4 py-3 font-medium">
										Portfolio Management
									</td>
									<td className="border border-gray-300 px-4 py-3">
										Annual portfolio review and deadline tracking
									</td>
									<td className="border border-gray-300 px-4 py-3 text-right">
										$300-500
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Regional Variations */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Regional Fee Variations
				</h3>
				<div className="bg-blue-50 p-4 rounded-lg">
					<ul className="space-y-2 text-gray-700">
						<li>
							<strong>North America:</strong> Base rates as listed above
						</li>
						<li>
							<strong>Europe:</strong> +10-15% due to local counsel requirements
						</li>
						<li>
							<strong>Asia-Pacific:</strong> +15-20% due to translation and
							local procedures
						</li>
						<li>
							<strong>Latin America:</strong> +20-25% due to complex local
							requirements
						</li>
						<li>
							<strong>Africa/Middle East:</strong> +25-30% due to specialized
							expertise required
						</li>
					</ul>
				</div>
			</div>

			{/* Payment Terms */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Payment Terms & Conditions
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 className="font-semibold text-gray-800 mb-2">Payment Terms</h4>
						<ul className="space-y-1 text-gray-700 text-sm">
							<li>• Net 30 days for established clients</li>
							<li>• 50% advance for new clients</li>
							<li>• Government fees paid upon filing</li>
							<li>• Credit card payments accepted</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold text-gray-800 mb-2">
							Important Notes
						</h4>
						<ul className="space-y-1 text-gray-700 text-sm">
							<li>• All fees exclude government charges</li>
							<li>• Prices subject to change annually</li>
							<li>• Volume discounts available</li>
							<li>• Currency exchange at time of billing</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-4">
				<div>© 2025 Lex Protector. All rights reserved.</div>
				<div className="mt-1">
					This schedule of charges is effective January 1, 2025 and subject to
					periodic review.
				</div>
			</div>
		</div>
	);
};

// Main component with demo buttons
const PDFViewerDemo: React.FC = () => {
	const pdfModal = usePDFViewerModal({
		defaultSize: "xl",
	});

	const handleShowSampleQuotation = () => {
		pdfModal.openModal(<SampleQuotationContent />, {
			title: "Sample Trademark Quotation",
		});
	};

	const handleShowScheduleOfCharges = () => {
		pdfModal.openModal(<ScheduleOfChargesContent />, {
			title: "Schedule of Charges",
		});
	};

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<Button
					onClick={handleShowSampleQuotation}
					className="flex items-center gap-2">
					<Icon name="FileText" size={16} />
					Sample Quotation Demo
				</Button>
				<Button
					variant="outline"
					onClick={handleShowScheduleOfCharges}
					className="flex items-center gap-2">
					<Icon name="DollarSign" size={16} />
					Schedule of Charges
				</Button>
			</div>

			{/* PDF Viewer Modal */}
			<PDFViewerModal
				isOpen={pdfModal.isOpen}
				onClose={pdfModal.closeModal}
				title={pdfModal.title}
				content={pdfModal.content}
				size={pdfModal.size}
			/>
		</div>
	);
};

export default PDFViewerDemo;

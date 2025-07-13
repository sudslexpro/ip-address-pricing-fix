"use client";
import React from "react";
import { PDFDownloadComponent, LexProtectorLetterhead } from "./index";

// Demo component to showcase PDF functionality
const PDFDemo = () => {
	// Sample quote data for demonstration
	const sampleQuote = {
		countries: [
			{
				country: "United States",
				flag: "🇺🇸",
				governmentFee: 325,
				attorneyFee: 350,
				commission: 101,
				total: 776,
				timeline: "8-12 months",
				services: ["Trademark Search", "Application Filing"],
			},
			{
				country: "United Kingdom",
				flag: "🇬🇧",
				governmentFee: 280,
				attorneyFee: 350,
				commission: 94,
				total: 724,
				timeline: "4-6 months",
				services: ["Trademark Search", "Application Filing"],
			},
			{
				country: "Germany",
				flag: "🇩🇪",
				governmentFee: 290,
				attorneyFee: 350,
				commission: 96,
				total: 736,
				timeline: "6-8 months",
				services: ["Trademark Search", "Application Filing"],
			},
		],
		services: [
			{
				id: "search",
				name: "Trademark Search",
				description: "Comprehensive database search",
				basePrice: 150,
			},
			{
				id: "application",
				name: "Trademark Application",
				description: "Full application filing",
				basePrice: 200,
			},
		],
		grandTotal: 2236,
		generatedAt: new Date().toISOString(),
	};

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">
				PDF Download Demo
			</h1>

			{/* Letterhead Preview */}
			<div className="mb-8">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Letterhead Preview:
				</h2>
				<div className="border border-gray-200 rounded-lg p-4 bg-white">
					<LexProtectorLetterhead />
				</div>
			</div>

			{/* PDF Download Button */}
			<div className="mb-8">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Generate PDF Quote:
				</h2>
				<PDFDownloadComponent
					quote={sampleQuote}
					onDownloadComplete={() => {
						alert("PDF downloaded successfully!");
					}}
				/>
			</div>

			{/* Sample Quote Data Display */}
			<div className="bg-gray-50 rounded-lg p-6">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Sample Quote Data:
				</h2>
				<pre className="text-sm text-gray-600 overflow-auto">
					{JSON.stringify(sampleQuote, null, 2)}
				</pre>
			</div>
		</div>
	);
};

export default PDFDemo;

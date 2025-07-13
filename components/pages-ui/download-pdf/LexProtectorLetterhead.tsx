"use client";
import React from "react";

interface LexProtectorLetterheadProps {
	date?: string;
	quoteNumber?: string;
}

const LexProtectorLetterhead: React.FC<LexProtectorLetterheadProps> = ({
	date,
	quoteNumber,
}) => {
	const currentDate =
		date ||
		new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

	const currentQuoteNumber =
		quoteNumber || `LPQ-${Date.now().toString().slice(-6)}`;

	return (
		<div className="w-full bg-white print:bg-white" id="letterhead">
			{/* Header Section */}
			<div className="border-b-4 border-blue-600 pb-6 mb-8">
				<div className="flex items-center justify-between">
					{/* Logo and Company Info */}
					<div className="flex items-center space-x-4">
						<div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-xl">LP</span>
						</div>
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								LEX PROTECTOR
							</h1>
							<p className="text-lg text-blue-600 font-medium">
								Global Trademark Protection Services
							</p>
						</div>
					</div>

					{/* Contact Information */}
					<div className="text-right text-sm text-gray-600">
						<div className="space-y-1">
							<p className="font-semibold text-gray-900">Contact Information</p>
							<p>📧 info@lexprotector.com</p>
							<p>📞 +1 (555) 123-4567</p>
							<p>🌐 www.lexprotector.com</p>
						</div>
					</div>
				</div>

				{/* Address Bar */}
				<div className="mt-4 bg-gray-50 p-3 rounded-lg">
					<div className="flex justify-between items-center text-sm">
						<div className="flex space-x-8">
							<div>
								<span className="font-medium text-gray-700">Headquarters:</span>
								<span className="ml-2 text-gray-600">
									123 Business Avenue, Suite 400, New York, NY 10001
								</span>
							</div>
						</div>
						<div className="text-right">
							<div className="text-gray-700">
								<span className="font-medium">Quote #:</span>{" "}
								{currentQuoteNumber}
							</div>
							<div className="text-gray-700">
								<span className="font-medium">Date:</span> {currentDate}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Document Title */}
			<div className="text-center mb-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-2">
					MULTI-COUNTRY TRADEMARK REGISTRATION QUOTE
				</h2>
				<div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
			</div>
		</div>
	);
};

export default LexProtectorLetterhead;

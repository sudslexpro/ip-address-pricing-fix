"use client";

import React from "react";
import CurrencyPrice from "@/components/ui/currency-price";
import {
	withCurrencyConversion,
	AutoConvertPrices,
} from "@/components/ui/currency-conversion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Example of a simple price component that can be enhanced with currency conversion
const SimplePriceComponent: React.FC<{ price: number; label: string }> = ({
	price,
	label,
}) => (
	<div className="flex justify-between items-center">
		<span>{label}</span>
		<Badge variant="secondary">${price}</Badge>
	</div>
);

// Enhanced version with currency conversion
const CurrencyPriceComponent = withCurrencyConversion(SimplePriceComponent, {
	showCurrencySelector: true,
	enableRounding: true,
});

const CurrencyConversionDemo: React.FC = () => {
	const samplePrices = [
		{ id: 1, label: "Basic Package", price: 299 },
		{ id: 2, label: "Professional Package", price: 599 },
		{ id: 3, label: "Enterprise Package", price: 999 },
	];

	const sampleText =
		"Our basic package starts at $299, professional at $599, and enterprise at $999. Additional services are available from $50 to $200.";

	return (
		<div className="space-y-8 p-6">
			<Card>
				<CardHeader>
					<CardTitle>Currency Conversion Demo</CardTitle>
					<CardDescription>
						Automatic price conversion based on user location with manual
						controls
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Individual Currency Price Component */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Individual Price with Full Controls
						</h3>
						<div className="flex items-center gap-4">
							<span>Professional Package:</span>
							<CurrencyPrice
								amount={599}
								showCurrencySelector={true}
								showConversionSettings={true}
								variant="inline"
								conversionOptions={{
									enableAutoDetection: true,
									enableRounding: true,
									roundingMode: "nearest",
								}}
							/>
						</div>
					</div>

					{/* Multiple Prices in Different Variants */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Different Display Variants
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{samplePrices.map((item) => (
								<Card key={item.id}>
									<CardContent className="p-4">
										<div className="space-y-2">
											<h4 className="font-medium">{item.label}</h4>

											{/* Compact variant */}
											<div className="text-sm text-muted-foreground">
												Compact:{" "}
												<CurrencyPrice amount={item.price} variant="compact" />
											</div>

											{/* Block variant */}
											<CurrencyPrice
												amount={item.price}
												variant="block"
												showCurrencySelector={true}
												showConversionSettings={false}
											/>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>

					{/* Auto-convert text content */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Auto-convert Text Content
						</h3>
						<Card>
							<CardContent className="p-4">
								<p className="text-muted-foreground mb-2">Original text:</p>
								<p className="mb-4 text-sm bg-muted p-3 rounded">
									{sampleText}
								</p>

								<p className="text-muted-foreground mb-2">Converted text:</p>
								<AutoConvertPrices
									className="text-sm bg-primary/10 p-3 rounded"
									conversionOptions={{
										enableAutoDetection: true,
										enableRounding: true,
									}}>
									{sampleText}
								</AutoConvertPrices>
							</CardContent>
						</Card>
					</div>

					{/* HOC Example */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Higher-Order Component Example
						</h3>
						<Card>
							<CardContent className="p-4 space-y-3">
								{samplePrices.map((item) => (
									<CurrencyPriceComponent
										key={item.id}
										price={item.price}
										label={item.label}
									/>
								))}
							</CardContent>
						</Card>
					</div>

					{/* Usage Examples */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Quick Usage Examples</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Card>
								<CardHeader>
									<CardTitle className="text-base">
										Simple Price Display
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="text-2xl font-bold">
											<CurrencyPrice amount={299} variant="compact" />
										</div>
										<div className="text-sm text-muted-foreground">
											Starting price for basic package
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-base">
										Price with Selection
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CurrencyPrice
										amount={599}
										variant="block"
										showCurrencySelector={true}
										showConversionSettings={true}
										prefix="From "
										suffix="/month"
									/>
								</CardContent>
							</Card>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CurrencyConversionDemo;

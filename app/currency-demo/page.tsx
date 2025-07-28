import React from "react";
import CurrencyConversionDemo from "@/components/ui/currency-conversion-demo";

export default function CurrencyConversionDemoPage() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto py-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-foreground mb-4">
							Currency Conversion Demo
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Automatic price conversion based on user location with manual
							controls and rounding options.
						</p>
					</div>
					<CurrencyConversionDemo />
				</div>
			</div>
		</div>
	);
}

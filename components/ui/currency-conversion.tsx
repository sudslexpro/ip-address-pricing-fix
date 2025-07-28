"use client";

import React from "react";
import CurrencyPrice from "./currency-price";
import {
	CurrencyConversionOptions,
	useCurrencyConversion,
} from "@/hooks/useCurrencyConversion";

interface WithCurrencyConversionOptions extends CurrencyConversionOptions {
	showCurrencySelector?: boolean;
	showConversionSettings?: boolean;
	enableTooltip?: boolean;
	variant?: "inline" | "block" | "compact";
}

/**
 * Higher-order component that wraps price displays with automatic currency conversion
 */
export function withCurrencyConversion<T extends object>(
	WrappedComponent: React.ComponentType<T>,
	options: WithCurrencyConversionOptions = {}
) {
	const CurrencyConvertedComponent = (
		props: T & {
			price?: number;
			amount?: number;
			value?: number;
			disableCurrencyConversion?: boolean;
		}
	) => {
		const {
			price,
			amount,
			value,
			disableCurrencyConversion = false,
			...restProps
		} = props;

		// Extract the price value from different possible prop names
		const priceValue = price ?? amount ?? value;

		// If currency conversion is disabled or no price value, render original component
		if (disableCurrencyConversion || priceValue === undefined) {
			return <WrappedComponent {...(restProps as T)} />;
		}

		// Render with currency conversion
		return (
			<CurrencyPrice
				amount={priceValue}
				showCurrencySelector={options.showCurrencySelector}
				showConversionSettings={options.showConversionSettings}
				enableTooltip={options.enableTooltip}
				variant={options.variant}
				conversionOptions={options}
			/>
		);
	};

	CurrencyConvertedComponent.displayName = `withCurrencyConversion(${
		WrappedComponent.displayName || WrappedComponent.name
	})`;

	return CurrencyConvertedComponent;
}

/**
 * Helper function to extract and convert prices from text content
 */
export function convertPricesInText(
	text: string,
	convertAmount: (amount: number) => number,
	formatCurrency: (amount: number) => string
): string {
	// Regex to match price patterns like $100, $1,000, $1.50, etc.
	const priceRegex = /\$([0-9,]+(?:\.[0-9]{2})?)/g;

	return text.replace(priceRegex, (match, price) => {
		// Remove commas and convert to number
		const numericPrice = parseFloat(price.replace(/,/g, ""));

		if (isNaN(numericPrice)) {
			return match; // Return original if not a valid number
		}

		// Convert and format the price
		const convertedPrice = convertAmount(numericPrice);
		return formatCurrency(convertedPrice);
	});
}

/**
 * React component that automatically converts prices in text content
 */
interface AutoConvertPricesProps {
	children: string;
	className?: string;
	conversionOptions?: CurrencyConversionOptions;
}

export const AutoConvertPrices: React.FC<AutoConvertPricesProps> = ({
	children,
	className,
	conversionOptions = {},
}) => {
	const { convertAmount, formatCurrency } =
		useCurrencyConversion(conversionOptions);

	const convertedText = convertPricesInText(
		children,
		convertAmount,
		formatCurrency
	);

	return (
		<span
			className={className}
			dangerouslySetInnerHTML={{ __html: convertedText }}
		/>
	);
};

export default CurrencyPrice;

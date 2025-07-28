"use client";

import React from "react";
import SmartPrice from "./smart-price";

/**
 * Utility functions and helpers for SmartPrice component
 */

/**
 * Props for bulk price conversion
 */
interface BulkPriceItem {
	id: string;
	amount: number;
	label?: string;
	prefix?: string;
	suffix?: string;
}

interface BulkSmartPriceProps {
	items: BulkPriceItem[];
	variant?: "inline" | "block" | "compact" | "large";
	showCurrencySelector?: boolean;
	showRoundingControls?: boolean;
	className?: string;
	itemClassName?: string;
}

/**
 * Component for displaying multiple prices with smart conversion
 */
export const BulkSmartPrice: React.FC<BulkSmartPriceProps> = ({
	items,
	variant = "inline",
	showCurrencySelector = true,
	showRoundingControls = false,
	className,
	itemClassName,
}) => {
	return (
		<div className={className}>
			{items.map((item, index) => (
				<div key={item.id} className={itemClassName}>
					{item.label && <span className="mr-2">{item.label}:</span>}
					<SmartPrice
						amount={item.amount}
						prefix={item.prefix}
						suffix={item.suffix}
						variant={variant}
						showCurrencySelector={showCurrencySelector && index === 0} // Only show on first item
						showRoundingControls={showRoundingControls && index === 0} // Only show on first item
					/>
				</div>
			))}
		</div>
	);
};

/**
 * Higher-order component to wrap existing price components with smart conversion
 */
export function withSmartPrice<
	T extends { price?: number; amount?: number; value?: number }
>(WrappedComponent: React.ComponentType<T>) {
	const SmartPriceWrapper = (
		props: T & {
			enableSmartPrice?: boolean;
			smartPriceProps?: Partial<React.ComponentProps<typeof SmartPrice>>;
		}
	) => {
		const { enableSmartPrice = true, smartPriceProps, ...restProps } = props;
		const priceValue = props.price ?? props.amount ?? props.value;

		if (!enableSmartPrice || priceValue === undefined) {
			return <WrappedComponent {...(restProps as T)} />;
		}

		return (
			<SmartPrice
				amount={priceValue}
				variant="compact"
				showCurrencySelector={false}
				showLocationIndicator={false}
				{...smartPriceProps}
			/>
		);
	};

	SmartPriceWrapper.displayName = `withSmartPrice(${
		WrappedComponent.displayName || WrappedComponent.name
	})`;
	return SmartPriceWrapper;
}

/**
 * Text processor to automatically convert price strings in content
 */
export function convertPricesInText(
	text: string,
	options: {
		baseCurrency?: string;
		targetCurrency?: string;
		exchangeRate?: number;
		formatCurrency?: (amount: number, currency: string) => string;
	} = {}
): string {
	const {
		baseCurrency = "USD",
		targetCurrency,
		exchangeRate = 1,
		formatCurrency = (amount, currency) =>
			`${currency === "USD" ? "$" : ""}${amount.toFixed(2)}${
				currency !== "USD" ? ` ${currency}` : ""
			}`,
	} = options;

	if (!targetCurrency || !exchangeRate || exchangeRate === 1) {
		return text;
	}

	// Regex to match price patterns like $100, $1,000, $1.50, etc.
	const priceRegex = /\$([0-9,]+(?:\.[0-9]{2})?)/g;

	return text.replace(priceRegex, (match, price) => {
		// Remove commas and convert to number
		const numericPrice = parseFloat(price.replace(/,/g, ""));

		if (isNaN(numericPrice)) {
			return match; // Return original if not a valid number
		}

		// Convert and format the price
		const convertedPrice = numericPrice * exchangeRate;
		return formatCurrency(convertedPrice, targetCurrency);
	});
}

/**
 * Hook for getting conversion context to use with text conversion
 */
export function useSmartPriceContext() {
	// This would need to import the useCurrencyConversion hook
	// For now, returning a placeholder that shows the pattern
	return {
		convertText: (text: string) => text,
		currentCurrency: "USD",
		exchangeRate: 1,
		isLoading: false,
	};
}

export default SmartPrice;

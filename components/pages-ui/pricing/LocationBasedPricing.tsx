"use client";

import React, { useEffect, useState } from "react";
import Icon from "@/components/icon/AppIcon";
import useIPLocation from "@/hooks/useIPLocation";

interface ExchangeRateData {
	rates: {
		INR: number;
	};
	lastUpdated: string;
}

interface LocationBasedPricingProps {
	priceUSD: number;
	priceINR?: number; // Manual INR price override
	convertToINR?: boolean;
}

export const LocationBasedPricing: React.FC<LocationBasedPricingProps> = ({
	priceUSD,
	priceINR,
	convertToINR = true,
}) => {
	const {
		location,
		isLoading: locationLoading,
		isIndian,
		currencySymbol,
	} = useIPLocation();
	const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(
		null
	);
	const [rateLoading, setRateLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchExchangeRate = async () => {
			try {
				setRateLoading(true);
				const response = await fetch("/api/exchange-rates?target=INR");

				if (!response.ok) {
					throw new Error("Failed to fetch exchange rate data");
				}

				const data = await response.json();
				setExchangeRate(data);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Failed to fetch exchange rates";
				setError(errorMessage);
				console.error("Exchange rate fetch error:", err);
			} finally {
				setRateLoading(false);
			}
		};

		if (isIndian && !priceINR) {
			fetchExchangeRate();
		}
	}, [isIndian, priceINR]);

	const formatPrice = () => {
		if (locationLoading || (isIndian && rateLoading && !priceINR)) {
			return <span className="animate-pulse">Loading...</span>;
		}

		if (!location) {
			return `${currencySymbol}${priceUSD}`;
		}

		if (isIndian && convertToINR) {
			if (priceINR) {
				// Use manual override price without showing USD equivalent
				return <span>₹{priceINR.toLocaleString("en-IN")}</span>;
			}

			// Use real-time exchange rate if available, fallback to default rate
			const rate = exchangeRate?.rates?.INR ?? 83;
			const calculatedINR = Math.round(priceUSD * rate);

			return (
				<span>
					₹{calculatedINR.toLocaleString("en-IN")}
					<span className="text-xs text-text-muted ml-1">
						(≈ ${priceUSD})
						{exchangeRate && (
							<span className="text-xs text-text-muted ml-1">
								• Live rate: ₹{rate.toFixed(2)}
							</span>
						)}
					</span>
				</span>
			);
		}

		return `${currencySymbol}${priceUSD}`;
	};

	return (
		<div className="inline-flex items-center">
			<span className="font-bold">{formatPrice()}</span>
		</div>
	);
};

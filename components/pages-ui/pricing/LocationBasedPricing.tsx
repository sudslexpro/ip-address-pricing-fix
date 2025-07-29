"use client";

import React, { useEffect, useState } from "react";
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

const EXCHANGE_RATE_CACHE_KEY = "exchange-rate-cache";
const EXCHANGE_RATE_CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CachedExchangeRate {
	data: ExchangeRateData;
	timestamp: number;
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
		() => {
			// Try to get cached exchange rate on initial render
			if (typeof window !== "undefined") {
				try {
					const cached = localStorage.getItem(EXCHANGE_RATE_CACHE_KEY);
					if (cached) {
						const { data, timestamp }: CachedExchangeRate = JSON.parse(cached);
						if (Date.now() - timestamp < EXCHANGE_RATE_CACHE_DURATION) {
							return data;
						}
						localStorage.removeItem(EXCHANGE_RATE_CACHE_KEY);
					}
				} catch (err) {
					localStorage.removeItem(EXCHANGE_RATE_CACHE_KEY);
				}
			}
			return null;
		}
	);
	const [rateLoading, setRateLoading] = useState(!exchangeRate);
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

				// Cache the exchange rate data
				if (typeof window !== "undefined") {
					try {
						localStorage.setItem(
							EXCHANGE_RATE_CACHE_KEY,
							JSON.stringify({
								data,
								timestamp: Date.now(),
							})
						);
					} catch (err) {
						console.error("Failed to cache exchange rate:", err);
					}
				}

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

		// Fetch exchange rate if we're showing INR prices and don't have a manual override or cached rate
		if (isIndian && convertToINR && !priceINR && !exchangeRate) {
			fetchExchangeRate();
		}
	}, [isIndian, priceINR, exchangeRate, convertToINR]);

	const formatPrice = () => {
		if (
			locationLoading ||
			(isIndian && rateLoading && !priceINR && convertToINR)
		) {
			return <span className="animate-pulse">Loading...</span>;
		}

		if (!location || !convertToINR) {
			return (
				<span>
					{currencySymbol}
					{priceUSD}
				</span>
			);
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

		return (
			<span>
				{currencySymbol}
				{priceUSD}
			</span>
		);
	};

	return (
		<div className="inline-flex items-center">
			<span className="font-bold">{formatPrice()}</span>
		</div>
	);
};

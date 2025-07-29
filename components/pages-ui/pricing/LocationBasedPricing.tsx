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
				setError(null); // Clear any previous errors

				// Add retry logic with exponential backoff
				const MAX_RETRIES = 3;
				let retryCount = 0;
				let lastError;

				while (retryCount < MAX_RETRIES) {
					try {
						const response = await fetch("/api/exchange-rates?target=INR");

						if (!response.ok) {
							throw new Error("Failed to fetch exchange rate data");
						}

						const data = await response.json();

						// Validate the response data
						if (!data.rates?.INR) {
							throw new Error("Invalid exchange rate data received");
						}

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
								console.warn("Failed to cache exchange rate:", err);
								// Don't throw - caching failure shouldn't break functionality
							}
						}

						setExchangeRate(data);
						return; // Success - exit retry loop
					} catch (err) {
						lastError = err;
						retryCount++;
						if (retryCount < MAX_RETRIES) {
							// Wait with exponential backoff before retrying
							await new Promise((resolve) =>
								setTimeout(resolve, Math.pow(2, retryCount) * 1000)
							);
						}
					}
				}

				// If we get here, all retries failed
				throw lastError;
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : "Failed to fetch exchange rates";
				setError(errorMessage);
				console.error("Exchange rate fetch error after retries:", err);

				// If we have cached data, keep using it even if refresh failed
				if (!exchangeRate) {
					// Try to recover cached data even if it's expired
					try {
						const cached = localStorage.getItem(EXCHANGE_RATE_CACHE_KEY);
						if (cached) {
							const { data } = JSON.parse(cached);
							setExchangeRate(data);
						}
					} catch (cacheErr) {
						console.warn("Failed to recover cached exchange rate:", cacheErr);
					}
				}
			} finally {
				setRateLoading(false);
			}
		};

		// Fetch exchange rate if we're showing INR prices and don't have a manual override or cached rate
		if (
			isIndian &&
			convertToINR &&
			!priceINR &&
			(!exchangeRate ||
				Date.now() -
					JSON.parse(
						localStorage.getItem(EXCHANGE_RATE_CACHE_KEY) || '{"timestamp":0}'
					).timestamp >=
					EXCHANGE_RATE_CACHE_DURATION)
		) {
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
			<div>
				<span>
					{currencySymbol}
					{priceUSD}
				</span>
			</div>
		);
	};

	return (
		<div className="inline-flex items-center">
			<span className="font-bold">{formatPrice()}</span>
		</div>
	);
};

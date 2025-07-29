"use client";

import React, { useEffect, useState } from "react";
import Icon from "@/components/icon/AppIcon";

interface GeolocationData {
	country: string;
	countryName: string;
	currency: string;
	timezone: string;
	ip: string;
}

interface ExchangeRateData {
	INR: number;
	timestamp: number;
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
	const [location, setLocation] = useState<GeolocationData | null>(null);
	const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch location and exchange rate in parallel
				const [locationResponse, rateResponse] = await Promise.all([
					fetch("/api/geolocation"),
					fetch("/api/exchange-rates"),
				]);

				if (!locationResponse.ok) {
					throw new Error("Failed to fetch location data");
				}
				if (!rateResponse.ok) {
					throw new Error("Failed to fetch exchange rate data");
				}

				const [locationData, rateData] = await Promise.all([
					locationResponse.json(),
					rateResponse.json(),
				]);

				setLocation(locationData);
				setExchangeRate(rateData);
			} catch (err) {
				setError("Unable to fetch required data");
				console.error("Data fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const formatPrice = () => {
		if (loading) {
			return <span className="animate-pulse">Loading...</span>;
		}

		if (error || !location) {
			return `${priceUSD}`;
		}

		if (location.country === "IN" && convertToINR) {
			if (priceINR) {
				// Use manual override price without showing USD equivalent
				return <span>₹{priceINR.toLocaleString("en-IN")}</span>;
			}

			// Use real-time exchange rate if available, fallback to default rate
			const rate = exchangeRate?.INR ?? 83;
			const calculatedINR = Math.round(priceUSD * rate);

			return (
				<span>
					₹{calculatedINR.toLocaleString("en-IN")}
					<span className="text-xs text-text-muted ml-1">
						(≈ {priceUSD})
						{exchangeRate && (
							<span className="text-xs text-text-muted ml-1">
								• Live rate: ₹{rate.toFixed(2)}
							</span>
						)}
					</span>
				</span>
			);
		}

		return `${priceUSD}`;
	};

	return (
		<div className="inline-flex items-center">
			{location?.country === "IN" && convertToINR ? (
				<Icon name="IndianRupee" size={16} className="mr-1" />
			) : (
				<Icon name="DollarSign" size={16} className="mr-1" />
			)}
			<span className="font-bold">{formatPrice()}</span>
		</div>
	);
};

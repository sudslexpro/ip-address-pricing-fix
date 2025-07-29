"use client";
import { useState, useEffect } from "react";

interface IPLocation {
	country_code: string;
	country_name?: string;
	currency?: string;
	timezone?: string;
	city?: string;
	region?: string;
}

const LOCATION_CACHE_KEY = "user-location-cache";
const LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedLocation {
	data: IPLocation;
	timestamp: number;
}

const useIPLocation = () => {
	const [location, setLocation] = useState<IPLocation | null>(() => {
		// Try to get cached location on initial render
		if (typeof window !== "undefined") {
			const cached = localStorage.getItem(LOCATION_CACHE_KEY);
			if (cached) {
				const { data, timestamp }: CachedLocation = JSON.parse(cached);
				if (Date.now() - timestamp < LOCATION_CACHE_DURATION) {
					return data;
				}
				localStorage.removeItem(LOCATION_CACHE_KEY);
			}
		}
		return null;
	});
	const [isLoading, setIsLoading] = useState(!location);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLocation = async () => {
			// Don't fetch if we already have cached data
			if (location) {
				return;
			}

			try {
				setIsLoading(true);
				const response = await fetch("https://ipapi.co/json/");

				if (!response.ok) {
					throw new Error("Failed to fetch location");
				}

				const data = await response.json();

				// Cache the location data
				if (typeof window !== "undefined") {
					localStorage.setItem(
						LOCATION_CACHE_KEY,
						JSON.stringify({
							data,
							timestamp: Date.now(),
						})
					);
				}

				setLocation(data);
			} catch (err) {
				const errorMessage =
					err instanceof Error
						? err.message
						: "An error occurred while fetching location";
				setError(errorMessage);
				// Default to non-Indian location if detection fails
				const defaultLocation = { country_code: "US" };
				setLocation(defaultLocation);

				// Cache the default location too
				if (typeof window !== "undefined") {
					localStorage.setItem(
						LOCATION_CACHE_KEY,
						JSON.stringify({
							data: defaultLocation,
							timestamp: Date.now(),
						})
					);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchLocation();
	}, [location]);

	const isIndian = location?.country_code === "IN";
	const currency = isIndian ? "INR" : "USD";
	const currencySymbol = isIndian ? "₹" : "$";

	return {
		location,
		isLoading,
		error,
		isIndian,
		currency,
		currencySymbol,
	};
};

export default useIPLocation;

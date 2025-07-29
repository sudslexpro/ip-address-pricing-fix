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
		const controller = new AbortController();
		let isMounted = true;

		const fetchLocation = async () => {
			// Check if we already have valid cached data
			if (typeof window !== "undefined") {
				const cached = localStorage.getItem(LOCATION_CACHE_KEY);
				if (cached) {
					try {
						const { data, timestamp } = JSON.parse(cached);
						if (Date.now() - timestamp < LOCATION_CACHE_DURATION) {
							if (isMounted) {
								setLocation(data);
								setIsLoading(false);
							}
							return;
						}
					} catch (err) {
						console.warn("Failed to parse cached location:", err);
					}
				}
			}

			try {
				if (isMounted) {
					setIsLoading(true);
					setError(null);
				}

				const MAX_RETRIES = 3;
				let retryCount = 0;
				let lastError: Error | null = null;

				while (retryCount < MAX_RETRIES && isMounted) {
					try {
						// Try our own geolocation API first
						const localApiResponse = await fetch("/api/geolocation", {
							signal: controller.signal,
						});

						if (localApiResponse.ok) {
							const data = await localApiResponse.json();
							if (data.country) {
								const locationData = {
									country_code: data.country,
									country_name: data.countryName,
									currency: data.currency,
									timezone: data.timezone,
									city: data.city,
									region: data.region,
								};

								// Cache the location data
								if (typeof window !== "undefined") {
									localStorage.setItem(
										LOCATION_CACHE_KEY,
										JSON.stringify({
											data: locationData,
											timestamp: Date.now(),
										})
									);
								}

								if (isMounted) {
									setLocation(locationData);
								}
								return;
							}
						}

						// Fallback to ipapi.co if our API fails
						const response = await fetch("https://ipapi.co/json/", {
							signal: controller.signal,
						});

						if (!response.ok) {
							throw new Error("Failed to fetch location");
						}

						const data = await response.json();

						// Validate the response data
						if (!data.country_code) {
							throw new Error("Invalid location data received");
						}

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

						if (isMounted) {
							setLocation(data);
						}
						return; // Success - exit retry loop
					} catch (err) {
						// Ignore aborted requests
						if (err instanceof Error && err.name === "AbortError") {
							return;
						}

						lastError =
							err instanceof Error
								? err
								: new Error("Failed to fetch location");
						retryCount++;
						if (retryCount < MAX_RETRIES && isMounted) {
							// Wait with exponential backoff before retrying
							await new Promise((resolve) =>
								setTimeout(resolve, Math.pow(2, retryCount) * 1000)
							);
						}
					}
				}

				// If all retries failed, try to use cached data even if expired
				if (typeof window !== "undefined") {
					try {
						const cached = localStorage.getItem(LOCATION_CACHE_KEY);
						if (cached) {
							const { data } = JSON.parse(cached);
							if (isMounted) {
								setLocation(data);
							}
							return;
						}
					} catch (cacheErr) {
						console.warn("Failed to recover cached location:", cacheErr);
					}
				}

				// If everything fails, use default US location
				if (isMounted) {
					const errorMessage = lastError
						? lastError.message
						: "An error occurred while fetching location";
					setError(errorMessage);
					const defaultLocation = { country_code: "US" };
					setLocation(defaultLocation);

					// Cache the default location
					if (typeof window !== "undefined") {
						localStorage.setItem(
							LOCATION_CACHE_KEY,
							JSON.stringify({
								data: defaultLocation,
								timestamp: Date.now(),
							})
						);
					}
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchLocation();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []); // Remove location from dependencies to prevent refetch loops

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

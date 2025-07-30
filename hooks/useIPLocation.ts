"use client";
import { useState, useEffect } from "react";

interface IPLocation {
	country: string;
	countryName: string;
	currency: string;
	timezone: string;
	city: string | null;
	region: string | null;
	ip: string;
	error?: string;
}

const LOCATION_CACHE_KEY = "user-location-cache";
const LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedLocation {
	data: IPLocation;
	timestamp: number;
}

const useIPLocation = () => {
	const [location, setLocation] = useState<IPLocation | null>(() => {
		// Try to load from cache on mount
		if (typeof window !== "undefined") {
			try {
				const cached = localStorage.getItem(LOCATION_CACHE_KEY);
				if (cached) {
					const { data, timestamp } = JSON.parse(cached);
					if (Date.now() - timestamp < LOCATION_CACHE_DURATION) {
						console.log("Using cached location data:", data);
						return data;
					} else {
						console.log("Cache expired, will fetch fresh data");
						localStorage.removeItem(LOCATION_CACHE_KEY);
					}
				}
			} catch (err) {
				console.warn("Failed to load cached location:", err);
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
						// Use our geolocation API
						const response = await fetch("/api/geolocation", {
							signal: controller.signal,
						});

						if (!response.ok) {
							throw new Error(`Failed to fetch location: ${response.status}`);
						}

						const data = await response.json();

						// Validate the response data
						if (!data.country) {
							throw new Error("Invalid location data received");
						}

						// Cache the location data with shorter duration in development
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
							console.log("Setting location:", data); // Debug log
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
					const defaultLocation: IPLocation = {
						country: "US",
						countryName: "United States",
						currency: "USD",
						timezone: "America/New_York",
						city: null,
						region: null,
						ip: "unknown",
					};
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

	const isIndian = location?.country === "IN";
	const shouldShowINR = isIndian;
	const isUSorDefault = !location || location.country === "US";

	// Debug logging
	useEffect(() => {
		console.log("Location state:", {
			location,
			isIndian,
			shouldShowINR,
			isUSorDefault,
			country: location?.country,
		});
	}, [location, isIndian, shouldShowINR, isUSorDefault]);

	return {
		location,
		isLoading,
		error,
		isIndian,
		shouldShowINR,
		isUSorDefault,
	};
};

export default useIPLocation;

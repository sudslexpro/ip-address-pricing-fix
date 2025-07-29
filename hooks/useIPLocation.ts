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

const useIPLocation = () => {
	const [location, setLocation] = useState<IPLocation | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("https://ipapi.co/json/");

				if (!response.ok) {
					throw new Error("Failed to fetch location");
				}

				const data = await response.json();
				setLocation(data);
			} catch (err) {
				const errorMessage =
					err instanceof Error
						? err.message
						: "An error occurred while fetching location";
				setError(errorMessage);
				// Default to non-Indian location if detection fails
				setLocation({ country_code: "US" });
			} finally {
				setIsLoading(false);
			}
		};

		fetchLocation();
	}, []);

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

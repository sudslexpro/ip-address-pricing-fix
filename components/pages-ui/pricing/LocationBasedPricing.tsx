"use client";

import React from "react";
import useIPLocation from "@/hooks/useIPLocation";

interface LocationBasedPricingProps {
	priceUSD: number;
	priceINR: number;
}

export const LocationBasedPricing: React.FC<LocationBasedPricingProps> = ({
	priceUSD,
	priceINR,
}) => {
	const { location, isLoading, shouldShowINR } = useIPLocation();
	const [key, setKey] = React.useState(0); // Add a key to force re-render

	// Force re-render when location changes
	React.useEffect(() => {
		setKey((prev) => prev + 1);
		console.log("LocationBasedPricing: Location update", {
			location,
			shouldShowINR,
			priceUSD,
			priceINR,
		});
	}, [location, shouldShowINR]);

	if (isLoading) {
		return (
			<span className="inline-flex items-center">
				<span className="animate-pulse">Loading...</span>
			</span>
		);
	}

	if (shouldShowINR) {
		console.log("Rendering INR price:", priceINR);
		return (
			<span className="inline-flex items-center" key={key}>
				<span className="mr-0.5">₹</span>
				{priceINR.toLocaleString("en-IN")}
			</span>
		);
	}

	return (
		<span className="inline-flex items-center">
			<span className="mr-0.5">$</span>
			{priceUSD.toLocaleString("en-US")}
		</span>
	);
};

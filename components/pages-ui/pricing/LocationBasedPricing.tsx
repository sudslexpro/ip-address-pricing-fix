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

	if (isLoading) {
		return (
			<span className="inline-flex items-center">
				<span className="animate-pulse">...</span>
			</span>
		);
	}

	if (shouldShowINR) {
		return (
			<span className="inline-flex items-center">
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

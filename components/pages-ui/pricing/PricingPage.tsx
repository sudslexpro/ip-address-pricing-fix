import React from "react";
import CommisionCalculator from "@/components/pages-ui/pricing/CommisionCalculator";
import PricingSection from "@/components/pages-ui/pricing/PricingSection";

const PricingPage: React.FC = () => {
	return (
		<main>
			<div>
				{/* Commission Calculator */}
				<CommisionCalculator />
				{/* Pricing Section */}
				<PricingSection />
			</div>
		</main>
	);
};

export default PricingPage;

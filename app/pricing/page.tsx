import PricingPage from "@/components/pages-ui/pricing/PricingPage";
import React from "react";

const page: React.FC = () => {
	return (
		<main>
			<div className={`min-h-screen bg-background`}>
				<PricingPage />
			</div>
		</main>
	);
};

export default page;

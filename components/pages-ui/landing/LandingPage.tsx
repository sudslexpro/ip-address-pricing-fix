import React from "react";
import HeroSection from "@/components/pages-ui/hero/HeroSection";
import ProblemSection from "@/components/pages-ui/landing/ProblemSection";

const LandingPage: React.FC = () => {
	return (
		<main>
			<div>
				{/* Hero Section */}
				<HeroSection />
				{/* Problem Agitation */}
				<ProblemSection />
			</div>
		</main>
	);
};

export default LandingPage;

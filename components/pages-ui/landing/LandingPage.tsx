import React from "react";
import HeroSection from "@/components/pages-ui/hero/HeroSection";
import ProblemSection from "@/components/pages-ui/landing/ProblemSection";
import SolutionDemo from "@/components/pages-ui/solution-demo/SolutionDemo";
import InteractiveCoverageMap from "@/components/pages-ui/landing/InteractiveCoverageMap";

const LandingPage: React.FC = () => {
	return (
		<main>
			<div>
				{/* Hero Section */}
				<HeroSection />
				{/* Problem Agitation */}
				<ProblemSection />
				{/* Solution Demo */}
				<SolutionDemo />
				{/* Interactive Coverage Map */}
				<InteractiveCoverageMap />
			</div>
		</main>
	);
};

export default LandingPage;

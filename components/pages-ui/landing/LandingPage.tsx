import React from "react";
import HeroSection from "@/components/pages-ui/hero/HeroSection";
import ProblemSection from "@/components/pages-ui/landing/ProblemSection";
import SolutionDemo from "@/components/pages-ui/solution-demo/SolutionDemo";

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
			</div>
		</main>
	);
};

export default LandingPage;

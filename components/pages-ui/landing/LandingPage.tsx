import React from "react";
import HeroSection from "@/components/pages-ui/landing/HeroSection";
import ProblemSection from "@/components/pages-ui/landing/ProblemSection";
import SolutionDemo from "@/components/pages-ui/solution-demo/SolutionDemo";
import InteractiveCoverageMap from "@/components/pages-ui/landing/InteractiveCoverageMap";
import TestimonialSection from "@/components/pages-ui/testimonial/TestimonialSection";
import CommisionCalculator from "@/components/pages-ui/pricing/CommisionCalculator";
import PricingSection from "@/components/pages-ui/pricing/PricingSection";

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
				{/* Commission Calculator */}
				<CommisionCalculator />
				{/* Testimonials & Social Proof */}
				<TestimonialSection />
				{/* Pricing Section */}
				<PricingSection />
			</div>
		</main>
	);
};

export default LandingPage;

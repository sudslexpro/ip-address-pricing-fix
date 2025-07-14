import React from "react";
import LegalResourcesHero from "@/components/pages-ui/legal-resources/LegalResourcesHero";
import ResourceCategories from "@/components/pages-ui/legal-resources/ResourceCategories";
import FeaturedResources from "@/components/pages-ui/legal-resources/FeaturedResources";
import QuickLinksSection from "@/components/pages-ui/legal-resources/QuickLinksSection";

const LegalResources: React.FC = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<LegalResourcesHero />

			{/* Resource Categories */}
			<ResourceCategories />

			{/* Featured Resources */}
			<FeaturedResources />

			{/* Quick Links & Recent Updates */}
			<QuickLinksSection />
		</div>
	);
};

export default LegalResources;

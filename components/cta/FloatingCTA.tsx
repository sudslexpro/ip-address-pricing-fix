"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

declare global {
	interface Window {
		gtag: (
			command: string,
			action: string,
			params?: { [key: string]: string | number | boolean }
		) => void;
	}
}

const FloatingCTA = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentSection, setCurrentSection] = useState("");
	const [ctaText, setCtaText] = useState("Get Started");

	const sectionCTAMap: Record<string, string> = {
		"solution-demo": "Try Demo Now",
		coverage: "Check Coverage",
		pricing: "View Pricing",
		"success-stories": "Join Success Stories",
		"get-started": "Start Trial",
		default: "Request Demo",
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// Show CTA after scrolling 20% of the page
			const showThreshold = windowHeight * 0.2;

			// Hide CTA when near footer (last 10% of page)
			const hideThreshold = documentHeight - windowHeight * 1.1;

			setIsVisible(scrollTop > showThreshold && scrollTop < hideThreshold);

			// Detect current section for context-aware CTA text
			const sections = [
				"solution-demo",
				"coverage",
				"pricing",
				"success-stories",
				"get-started",
			];
			let activeSection = "default";

			for (const sectionId of sections) {
				const element = document.getElementById(sectionId);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
						activeSection = sectionId;
						break;
					}
				}
			}

			setCurrentSection(activeSection);
			setCtaText(sectionCTAMap[activeSection] || sectionCTAMap.default);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Check initial state

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleCTAClick = () => {
		let targetSection = "#get-started";

		// Context-specific navigation
		switch (currentSection) {
			case "solution-demo":
				targetSection = "#solution-demo";
				break;
			case "coverage":
				targetSection = "#coverage";
				break;
			case "pricing":
				targetSection = "#pricing";
				break;
			case "success-stories":
				targetSection = "#get-started";
				break;
			default:
				targetSection = "#get-started";
		}

		const element = document.querySelector(targetSection);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}

		// Analytics tracking could be added here
		if (window.gtag) {
			window.gtag("event", "floating_cta_click", {
				section: currentSection,
				cta_text: ctaText,
			});
		}
	};

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-6 right-6 z-150 animate-fade-in">
			<div className="relative">
				{/* Pulse animation for attention */}
				<div className="absolute -inset-1 bg-yellow-500 rounded-full opacity-20 animate-pulse"></div>

				<Button
					variant="default"
					size="lg"
					onClick={handleCTAClick}
					className="shadow-cta hover:shadow-elevation transition-all duration-200 bg-gradient-to-r from-blue-900 to-indigo-800 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full border-0">
					{ctaText}
					<ArrowRight className="ml-2" />
				</Button>
			</div>

			{/* Mobile optimization - adjust positioning */}
			<style jsx>{`
				@media (max-width: 768px) {
					.fixed.bottom-6.right-6 {
						bottom: 1rem;
						right: 1rem;
					}
				}
			`}</style>
		</div>
	);
};

export default FloatingCTA;

"use client";
import { useEffect } from "react";

/**
 * CalendlyPreloader Component
 *
 * This component preloads the Calendly script in the background
 * to improve performance when the modal is opened.
 * Include this in your layout or main app component.
 */
const CalendlyPreloader: React.FC = () => {
	useEffect(() => {
		// Only run on client side
		if (typeof window === "undefined") return;

		// Check if we should preload (avoid preloading on mobile to save bandwidth)
		const shouldPreload = () => {
			// Don't preload on slow connections
			if ("connection" in navigator) {
				const connection = (navigator as any).connection;
				if (
					connection &&
					(connection.effectiveType === "2g" ||
						connection.effectiveType === "slow-2g")
				) {
					return false;
				}
			}

			// Don't preload on mobile devices to save bandwidth
			if (window.innerWidth < 768) {
				return false;
			}

			return true;
		};

		if (!shouldPreload()) return;

		// Check if Calendly script is already loaded or loading
		const existingScript = document.querySelector(
			'script[src*="calendly.com/assets/external/widget.js"]'
		);

		if (existingScript || window.Calendly) return;

		// Create preload link for better performance
		const preloadLink = document.createElement("link");
		preloadLink.rel = "preload";
		preloadLink.href = "https://assets.calendly.com/assets/external/widget.js";
		preloadLink.as = "script";
		preloadLink.crossOrigin = "anonymous";

		// Add DNS prefetch for Calendly domains
		const dnsPrefetch1 = document.createElement("link");
		dnsPrefetch1.rel = "dns-prefetch";
		dnsPrefetch1.href = "//assets.calendly.com";

		const dnsPrefetch2 = document.createElement("link");
		dnsPrefetch2.rel = "dns-prefetch";
		dnsPrefetch2.href = "//calendly.com";

		document.head.appendChild(dnsPrefetch1);
		document.head.appendChild(dnsPrefetch2);
		document.head.appendChild(preloadLink);

		// Optionally preload the script after a delay (when user is likely idle)
		const preloadTimer = setTimeout(() => {
			if (
				!window.Calendly &&
				!document.querySelector(
					'script[src*="calendly.com/assets/external/widget.js"]'
				)
			) {
				const script = document.createElement("script");
				script.src = "https://assets.calendly.com/assets/external/widget.js";
				script.async = true;
				script.crossOrigin = "anonymous";

				// Don't show any loading indicators for preloading
				script.onload = () => {
					console.log("Calendly script preloaded successfully");
				};

				script.onerror = () => {
					console.warn("Calendly script preloading failed");
				};

				document.head.appendChild(script);
			}
		}, 3000); // Preload after 3 seconds

		return () => {
			clearTimeout(preloadTimer);
		};
	}, []);

	// This component doesn't render anything
	return null;
};

export default CalendlyPreloader;

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

		// Enhanced preload conditions - more aggressive for better UX
		const shouldPreload = () => {
			// Don't preload on slow connections
			if ("connection" in navigator) {
				const connection = (navigator as any).connection;
				if (connection) {
					// Check for slow connections
					if (
						connection.effectiveType === "2g" ||
						connection.effectiveType === "slow-2g"
					) {
						return false;
					}
					// Only skip on explicitly limited data plans
					if (connection.saveData === true) {
						return false;
					}
				}
			}

			// Check device memory (if available) - only skip on very low memory devices
			if ("deviceMemory" in navigator) {
				const deviceMemory = (navigator as any).deviceMemory;
				if (deviceMemory && deviceMemory < 2) {
					// Only skip on devices with less than 2GB RAM
					return false;
				}
			}

			// Check for reduced motion preference
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return false;
			}

			// Allow preload on tablets and larger mobile devices for better UX
			const isMobile =
				window.innerWidth < 480 ||
				/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				);

			// Don't preload only on very small mobile devices
			if (isMobile && window.innerWidth < 480) {
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

		// Add comprehensive resource hints
		const addResourceHints = () => {
			const hints = [
				{ rel: "dns-prefetch", href: "//assets.calendly.com" },
				{ rel: "dns-prefetch", href: "//calendly.com" },
				{ rel: "dns-prefetch", href: "//js.calendly.com" },
				{
					rel: "preconnect",
					href: "https://assets.calendly.com",
					crossOrigin: "anonymous",
				},
				{
					rel: "preconnect",
					href: "https://calendly.com",
					crossOrigin: "anonymous",
				},
				{
					rel: "preload",
					href: "https://assets.calendly.com/assets/external/widget.js",
					as: "script",
					crossOrigin: "anonymous",
				},
			];

			hints.forEach((hint) => {
				// Check if hint already exists
				const existing = document.querySelector(`link[href="${hint.href}"]`);
				if (!existing) {
					const link = document.createElement("link");
					link.rel = hint.rel;
					link.href = hint.href;
					if (hint.as) link.setAttribute("as", hint.as);
					if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
					document.head.appendChild(link);
				}
			});
		};

		addResourceHints();

		// Use Intersection Observer to detect when user is likely to interact
		let preloadTimer: NodeJS.Timeout;

		// Check if user is actively browsing (mouse movement, scroll, etc.)
		let userActivity = false;
		const activityEvents = ["mousemove", "scroll", "touchstart", "click"];

		const handleActivity = () => {
			if (!userActivity) {
				userActivity = true;
				// User is active, preload immediately for better UX
				clearTimeout(preloadTimer);
				preloadTimer = setTimeout(preloadScript, 500); // Reduced delay
			}
		};

		activityEvents.forEach((event) => {
			document.addEventListener(event, handleActivity, {
				once: true,
				passive: true,
			});
		});

		// Fallback: preload after shorter idle time for faster loading
		const idleTimer = setTimeout(() => {
			if (!userActivity) {
				preloadScript();
			}
		}, 2000); // Reduced from 5000 to 2000ms

		function preloadScript() {
			if (
				!window.Calendly &&
				!document.querySelector(
					'script[src*="calendly.com/assets/external/widget.js"]'
				)
			) {
				// Use requestIdleCallback for better performance
				const loadScript = () => {
					const script = document.createElement("script");
					script.src = "https://assets.calendly.com/assets/external/widget.js";
					script.async = true;
					script.defer = true;
					script.crossOrigin = "anonymous";

					// Add cache headers
					script.setAttribute("cache", "force-cache");

					// Don't show any loading indicators for preloading
					script.onload = () => {
						console.log("✅ Calendly script preloaded successfully");
					};

					script.onerror = () => {
						console.warn(
							"⚠️ Calendly script preloading failed - will load on demand"
						);
					};

					document.head.appendChild(script);
				};

				// Use requestIdleCallback if available, otherwise setTimeout
				if ("requestIdleCallback" in window) {
					requestIdleCallback(loadScript, { timeout: 3000 });
				} else {
					setTimeout(loadScript, 100);
				}
			}
		}

		return () => {
			clearTimeout(preloadTimer);
			clearTimeout(idleTimer);
			activityEvents.forEach((event) => {
				document.removeEventListener(event, handleActivity);
			});
		};
	}, []);

	// This component doesn't render anything
	return null;
};

export default CalendlyPreloader;

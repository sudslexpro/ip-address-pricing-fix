"use client";
import { useEffect, useState, useCallback } from "react";
import { performanceMonitor } from "@/lib/calendly-performance";

interface CalendlyOptions {
	url: string;
	prefill?: Record<string, string>;
	utm?: Record<string, string>;
}

interface UseCalendlyReturn {
	isLoaded: boolean;
	isLoading: boolean;
	error: string | null;
	openPopup: (options: CalendlyOptions) => void;
	closePopup: () => void;
	initInlineWidget: (elementId: string, options: CalendlyOptions) => void;
	retryLoad: () => void;
}

// Global state to prevent multiple script loads
let calendlyScriptLoaded = false;
let calendlyScriptLoading = false;
let calendlyScriptPromise: Promise<void> | null = null;

const loadCalendlyScript = (): Promise<void> => {
	if (window.Calendly) {
		calendlyScriptLoaded = true;
		return Promise.resolve();
	}

	if (calendlyScriptPromise) {
		return calendlyScriptPromise;
	}

	calendlyScriptLoading = true;
	performanceMonitor.markScriptLoadStart();
	calendlyScriptPromise = new Promise((resolve, reject) => {
		// Check if script already exists
		const existingScript = document.querySelector(
			'script[src*="calendly.com/assets/external/widget.js"]'
		);

		if (existingScript) {
			if (window.Calendly) {
				calendlyScriptLoaded = true;
				calendlyScriptLoading = false;
				resolve();
				return;
			}
			// If script exists but Calendly is not available, wait for it
			existingScript.addEventListener("load", () => {
				calendlyScriptLoaded = true;
				calendlyScriptLoading = false;
				resolve();
			});
			existingScript.addEventListener("error", () => {
				calendlyScriptLoading = false;
				reject(new Error("Failed to load Calendly script"));
			});
			return;
		}

		// Add resource hints for better performance
		const addResourceHints = () => {
			// DNS prefetch for faster domain resolution
			const dnsPrefetch = document.createElement("link");
			dnsPrefetch.rel = "dns-prefetch";
			dnsPrefetch.href = "https://assets.calendly.com";
			document.head.appendChild(dnsPrefetch);

			// Preconnect for complete connection setup
			const preconnect = document.createElement("link");
			preconnect.rel = "preconnect";
			preconnect.href = "https://assets.calendly.com";
			preconnect.crossOrigin = "anonymous";
			document.head.appendChild(preconnect);

			// Preload the script
			const preloadLink = document.createElement("link");
			preloadLink.rel = "preload";
			preloadLink.href =
				"https://assets.calendly.com/assets/external/widget.js";
			preloadLink.as = "script";
			preloadLink.crossOrigin = "anonymous";
			document.head.appendChild(preloadLink);
		};

		addResourceHints();

		// Create new script with optimizations
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		script.defer = true; // Better for performance
		script.crossOrigin = "anonymous";

		// Add cache control for better caching
		script.setAttribute("cache", "force-cache");

		script.onload = () => {
			calendlyScriptLoaded = true;
			calendlyScriptLoading = false;
			performanceMonitor.markScriptLoadEnd();
			resolve();
		};

		script.onerror = () => {
			calendlyScriptLoading = false;
			reject(new Error("Failed to load Calendly script"));
		};

		// Reduced timeout for faster feedback
		const timeoutId = setTimeout(() => {
			if (!calendlyScriptLoaded) {
				calendlyScriptLoading = false;
				script.remove(); // Clean up failed script
				reject(new Error("Calendly script loading timeout"));
			}
		}, 5000); // Reduced to 5 seconds

		// Clear timeout on successful load
		script.addEventListener("load", () => clearTimeout(timeoutId));

		document.head.appendChild(script);
	});

	return calendlyScriptPromise;
};

export const useCalendly = (): UseCalendlyReturn => {
	const [isLoaded, setIsLoaded] = useState(calendlyScriptLoaded);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadScript = useCallback(async () => {
		if (calendlyScriptLoaded) {
			setIsLoaded(true);
			return;
		}

		if (calendlyScriptLoading) {
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			await loadCalendlyScript();
			setIsLoaded(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load Calendly");
			console.error("Calendly loading error:", err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadScript();
	}, [loadScript]);

	const openPopup = useCallback((options: CalendlyOptions) => {
		if (window.Calendly && calendlyScriptLoaded) {
			window.Calendly.initPopupWidget(options);
		} else {
			console.warn("Calendly not loaded yet. Please wait.");
		}
	}, []);

	const closePopup = useCallback(() => {
		if (window.Calendly && calendlyScriptLoaded) {
			window.Calendly.closePopupWidget();
		}
	}, []);

	const initInlineWidget = useCallback(
		(elementId: string, options: CalendlyOptions) => {
			const element = document.getElementById(elementId);
			if (!element) {
				console.warn(`Element with id "${elementId}" not found`);
				return;
			}

			if (!window.Calendly || !calendlyScriptLoaded) {
				console.warn("Calendly not loaded yet. Please wait.");
				return;
			}

			try {
				// Clear previous widget content
				element.innerHTML = "";

				// Mark widget initialization start
				performanceMonitor.markWidgetInitStart();

				// Initialize with better error handling
				window.Calendly.initInlineWidget({
					...options,
					parentElement: element,
				});

				// Mark widget initialization end
				setTimeout(() => {
					performanceMonitor.markWidgetInitEnd();
				}, 100); // Small delay to account for widget rendering
			} catch (err) {
				console.error("Failed to initialize Calendly widget:", err);
				setError("Failed to initialize booking calendar");
			}
		},
		[]
	);

	const retryLoad = useCallback(() => {
		calendlyScriptPromise = null;
		calendlyScriptLoaded = false;
		calendlyScriptLoading = false;
		loadScript();
	}, [loadScript]);

	return {
		isLoaded,
		isLoading,
		error,
		openPopup,
		closePopup,
		initInlineWidget,
		retryLoad,
	};
};

declare global {
	interface Window {
		Calendly: {
			initInlineWidget: (options: {
				url: string;
				parentElement: HTMLElement;
				prefill?: Record<string, string>;
				utm?: Record<string, string>;
			}) => void;
			closePopupWidget: () => void;
			initPopupWidget: (options: { url: string }) => void;
		};
	}
}

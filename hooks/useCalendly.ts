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

		// Create new script
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		script.crossOrigin = "anonymous";

		// Add preload hints for better performance
		const preloadLink = document.createElement("link");
		preloadLink.rel = "preload";
		preloadLink.href = script.src;
		preloadLink.as = "script";
		preloadLink.crossOrigin = "anonymous";
		document.head.appendChild(preloadLink);

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

		// Add timeout for script loading
		setTimeout(() => {
			if (!calendlyScriptLoaded) {
				calendlyScriptLoading = false;
				reject(new Error("Calendly script loading timeout"));
			}
		}, 10000); // 10 second timeout

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

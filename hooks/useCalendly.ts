"use client";
import { useEffect, useState } from "react";

interface CalendlyOptions {
	url: string;
	prefill?: Record<string, string>;
	utm?: Record<string, string>;
}

interface UseCalendlyReturn {
	isLoaded: boolean;
	openPopup: (options: CalendlyOptions) => void;
	closePopup: () => void;
	initInlineWidget: (elementId: string, options: CalendlyOptions) => void;
}

export const useCalendly = (): UseCalendlyReturn => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// Check if Calendly is already loaded
		if (window.Calendly) {
			setIsLoaded(true);
			return;
		}

		// Load Calendly script
		const script = document.createElement("script");
		script.src = "https://assets.calendly.com/assets/external/widget.js";
		script.async = true;
		script.onload = () => setIsLoaded(true);
		document.head.appendChild(script);

		// Cleanup function
		return () => {
			try {
				document.head.removeChild(script);
			} catch (error) {
				// Script might already be removed
				console.warn("Calendly script cleanup failed:", error);
			}
		};
	}, []);

	const openPopup = (options: CalendlyOptions) => {
		if (window.Calendly) {
			window.Calendly.initPopupWidget(options);
		}
	};

	const closePopup = () => {
		if (window.Calendly) {
			window.Calendly.closePopupWidget();
		}
	};

	const initInlineWidget = (elementId: string, options: CalendlyOptions) => {
		const element = document.getElementById(elementId);
		if (element && window.Calendly) {
			// Clear previous widget
			element.innerHTML = "";

			window.Calendly.initInlineWidget({
				...options,
				parentElement: element,
			});
		}
	};

	return {
		isLoaded,
		openPopup,
		closePopup,
		initInlineWidget,
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

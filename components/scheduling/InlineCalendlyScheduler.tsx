"use client";

import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/icon/AppIcon";

export interface InlineCalendlySchedulerProps {
	/** Calendly URL for the inline widget */
	calendlyUrl: string;
	/** Minimum width for the widget */
	minWidth?: string;
	/** Height for the widget */
	height?: string;
	/** Container class name */
	containerClassName?: string;
	/** Custom title */
	title?: string;
	/** Custom description */
	description?: string;
	/** Show loading spinner */
	showLoader?: boolean;
	/** Auto-load Calendly script */
	autoLoadScript?: boolean;
	/** Responsive height for different screen sizes */
	responsiveHeight?: {
		mobile?: string;
		tablet?: string;
		desktop?: string;
	};
	/** Callback when widget is loaded */
	onLoad?: () => void;
}

declare global {
	interface Window {
		Calendly?: {
			initInlineWidget: (options: {
				url: string;
				parentElement: HTMLElement;
				prefill?: Record<string, any>;
				utm?: Record<string, any>;
			}) => void;
		};
	}
}

const InlineCalendlyScheduler: React.FC<InlineCalendlySchedulerProps> = ({
	calendlyUrl,
	minWidth = "320px",
	height = "700px",
	containerClassName = "",
	title,
	description,
	showLoader = true,
	autoLoadScript = true,
	responsiveHeight,
	onLoad,
}) => {
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);
	const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
	const inlineWidgetRef = useRef<HTMLDivElement>(null);

	// Load Calendly script
	useEffect(() => {
		if (autoLoadScript && !isScriptLoaded) {
			// Check if script is already loaded
			const existingScript = document.querySelector(
				'script[src="https://assets.calendly.com/assets/external/widget.js"]'
			);

			if (existingScript) {
				setIsScriptLoaded(true);
				return;
			}

			const script = document.createElement("script");
			script.src = "https://assets.calendly.com/assets/external/widget.js";
			script.async = true;
			script.onload = () => {
				setIsScriptLoaded(true);
			};
			script.onerror = () => {
				console.error("Failed to load Calendly script");
			};
			document.head.appendChild(script);

			return () => {
				// Clean up script if component unmounts and no other instances need it
				const calendlyElements = document.querySelectorAll(
					".calendly-inline-widget"
				);
				if (calendlyElements.length <= 1) {
					const scriptToRemove = document.querySelector(
						'script[src="https://assets.calendly.com/assets/external/widget.js"]'
					);
					if (scriptToRemove) {
						document.head.removeChild(scriptToRemove);
					}
				}
			};
		}
	}, [autoLoadScript, isScriptLoaded]);

	// Initialize inline widget when script is loaded
	useEffect(() => {
		if (isScriptLoaded && inlineWidgetRef.current && calendlyUrl) {
			// Clear any existing content
			inlineWidgetRef.current.innerHTML = "";

			if (window.Calendly) {
				try {
					window.Calendly.initInlineWidget({
						url: calendlyUrl,
						parentElement: inlineWidgetRef.current,
					});
					setIsWidgetLoaded(true);
					onLoad?.();
				} catch (error) {
					console.error("Failed to initialize Calendly widget:", error);
				}
			}
		}
	}, [isScriptLoaded, calendlyUrl, onLoad]);

	if (!calendlyUrl) {
		return (
			<div className={`text-center py-8 space-y-4 ${containerClassName}`}>
				<div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
					<Icon name="AlertTriangle" size={32} className="text-destructive" />
				</div>
				<div>
					<h3 className="text-lg font-semibold text-foreground mb-2">
						Calendly URL Required
					</h3>
					<p className="text-sm text-muted-foreground">
						Please provide a valid Calendly URL to display the scheduler.
					</p>
				</div>
			</div>
		);
	}

	const finalHeight = responsiveHeight?.desktop || height;

	return (
		<div className={`space-y-4 ${containerClassName}`}>
			{/* Optional header */}
			{(title || description) && (
				<div className="text-center space-y-2">
					{title && (
						<h3 className="text-xl font-semibold text-foreground">{title}</h3>
					)}
					{description && (
						<p className="text-sm text-muted-foreground">{description}</p>
					)}
				</div>
			)}

			{/* Loading state */}
			{showLoader && !isWidgetLoaded && (
				<div className="text-center py-8">
					<div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
					<p className="text-sm text-muted-foreground">
						Loading Calendly widget...
					</p>
				</div>
			)}

			{/* Inline Calendly widget container */}
			<div
				ref={inlineWidgetRef}
				className="calendly-inline-widget w-full"
				data-url={calendlyUrl}
				style={{
					minWidth,
					height: finalHeight,
					display: isWidgetLoaded || !showLoader ? "block" : "none",
				}}
			/>

			{/* Responsive styles */}
			{responsiveHeight && (
				<style jsx>{`
					@media (max-width: 768px) {
						.calendly-inline-widget {
							height: ${responsiveHeight.mobile || "500px"} !important;
						}
					}
					@media (min-width: 769px) and (max-width: 1024px) {
						.calendly-inline-widget {
							height: ${responsiveHeight.tablet || "600px"} !important;
						}
					}
					@media (min-width: 1025px) {
						.calendly-inline-widget {
							height: ${responsiveHeight.desktop || height} !important;
						}
					}
				`}</style>
			)}
		</div>
	);
};

export default InlineCalendlyScheduler;

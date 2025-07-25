"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";

export interface VersatileCalendlySchedulerProps {
	/** Base Calendly URL (without duration suffix) */
	calendlyUrl?: string;
	/** Event type for the Calendly URL */
	eventType?: "consultation" | "demo" | "15min" | "30min" | "45min" | "60min";
	/** Custom title for the scheduler */
	title?: string;
	/** Custom description */
	description?: string;
	/** Features to highlight */
	features?: string[];
	/** Button text */
	buttonText?: string;
	/** Duration text */
	duration?: string;
	/** Callback when Calendly is opened */
	onCalendlyOpen?: () => void;
	/** Show features list */
	showFeatures?: boolean;
	/** Compact mode for smaller displays */
	compact?: boolean;
	/** Start with Calendly widget open */
	startWithWidget?: boolean;
	/** Height of the Calendly widget */
	widgetHeight?: string;
	/** Responsive height classes for different screen sizes */
	responsiveHeight?: {
		mobile?: string;
		tablet?: string;
		desktop?: string;
	};
	/** Custom duration suffix mapping */
	durationSuffixes?: Record<string, string>;
	/** Display mode: 'modal', 'inline', or 'widget' */
	mode?: "modal" | "inline" | "widget";
	/** Container class name for inline mode */
	containerClassName?: string;
	/** Minimum width for inline widget */
	minWidth?: string;
	/** Auto-load Calendly script for inline mode */
	autoLoadScript?: boolean;
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

const VersatileCalendlyScheduler: React.FC<VersatileCalendlySchedulerProps> = ({
	calendlyUrl,
	eventType = "30min",
	title = "Schedule Your Demo",
	description = "Book a personalized demo with our team to see how Lex Protector can transform your legal practice.",
	features = [
		"How to generate accurate quotes in minutes",
		"Custom branding and white-label options",
		"Advanced analytics and reporting features",
		"Integration with your existing workflow",
	],
	buttonText = "Schedule Now",
	duration = "30-minute session",
	onCalendlyOpen,
	showFeatures = true,
	compact = false,
	startWithWidget = false,
	widgetHeight = "650px",
	responsiveHeight,
	durationSuffixes,
	mode = "modal",
	containerClassName = "",
	minWidth = "320px",
	autoLoadScript = true,
}) => {
	const [showWidget, setShowWidget] = useState(startWithWidget);
	const [isScriptLoaded, setIsScriptLoaded] = useState(false);
	const inlineWidgetRef = useRef<HTMLDivElement>(null);

	// Base Calendly URL - REPLACE THIS WITH YOUR ACTUAL CALENDLY URL
	const BASE_CALENDLY_URL = calendlyUrl || null;

	// Default duration suffixes - customize these based on your Calendly setup
	const defaultSuffixes: Record<string, string> = {
		consultation: "/consultation",
		demo: "/demo",
		"15min": "/15min",
		"30min": "/30min",
		"45min": "/45min",
		"60min": "/60min",
		...durationSuffixes, // Allow custom overrides
	};

	// Auto-generate duration text based on event type
	const getDurationText = (type: string): string => {
		const durationMap: Record<string, string> = {
			consultation: "30-minute consultation",
			demo: "30-minute demo",
			"15min": "15-minute session",
			"30min": "30-minute session",
			"45min": "45-minute session",
			"60min": "60-minute session",
		};
		return durationMap[type] || `${type} session`;
	};

	// Generate the final URL by combining base URL with suffix
	const generateCalendlyUrl = (type: string): string => {
		if (!BASE_CALENDLY_URL) {
			return "#"; // Return placeholder if no URL configured
		}
		const suffix = defaultSuffixes[type] || `/${type}`;
		return `${BASE_CALENDLY_URL}${suffix}`;
	};

	// Check if Calendly URL is configured
	const isCalendlyConfigured = Boolean(BASE_CALENDLY_URL);

	const finalUrl = generateCalendlyUrl(eventType);
	const finalDuration = duration || getDurationText(eventType);

	// Load Calendly script for inline widget
	useEffect(() => {
		if (mode === "inline" && autoLoadScript && !isScriptLoaded) {
			const script = document.createElement("script");
			script.src = "https://assets.calendly.com/assets/external/widget.js";
			script.async = true;
			script.onload = () => setIsScriptLoaded(true);
			document.head.appendChild(script);

			return () => {
				// Clean up script if component unmounts
				const existingScript = document.querySelector(
					'script[src="https://assets.calendly.com/assets/external/widget.js"]'
				);
				if (existingScript) {
					document.head.removeChild(existingScript);
				}
			};
		}
	}, [mode, autoLoadScript, isScriptLoaded]);

	// Initialize inline widget when script is loaded
	useEffect(() => {
		if (
			mode === "inline" &&
			isScriptLoaded &&
			inlineWidgetRef.current &&
			isCalendlyConfigured &&
			window.Calendly
		) {
			// Clear any existing content
			inlineWidgetRef.current.innerHTML = "";

			// Initialize the inline widget
			window.Calendly.initInlineWidget({
				url: finalUrl,
				parentElement: inlineWidgetRef.current,
			});
		}
	}, [mode, isScriptLoaded, finalUrl, isCalendlyConfigured]);

	const handleShowWidget = () => {
		setShowWidget(true);
		onCalendlyOpen?.();
	};

	const handleBackToInfo = () => {
		setShowWidget(false);
	};

	// Inline mode - directly embed the Calendly widget
	if (mode === "inline") {
		if (!isCalendlyConfigured) {
			return (
				<div className={`text-center py-8 space-y-4 ${containerClassName}`}>
					<div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
						<Icon name="AlertTriangle" size={32} className="text-destructive" />
					</div>
					<div>
						<h3 className="text-lg font-semibold text-foreground mb-2">
							Calendly URL Not Configured
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Please configure your Calendly URL to enable appointment
							scheduling.
						</p>
						<p className="text-xs text-muted-foreground">
							Contact your administrator to set up the Calendly integration.
						</p>
					</div>
				</div>
			);
		}

		return (
			<div className={`space-y-4 ${containerClassName}`}>
				{/* Optional header for inline mode */}
				{title && (
					<div className="text-center space-y-2">
						<h3 className="text-xl font-semibold text-foreground">{title}</h3>
						{description && (
							<p className="text-sm text-muted-foreground">{description}</p>
						)}
					</div>
				)}

				{/* Inline Calendly widget container */}
				<div
					ref={inlineWidgetRef}
					className="calendly-inline-widget w-full"
					data-url={finalUrl}
					style={{
						minWidth,
						height: responsiveHeight?.desktop || widgetHeight || "700px",
					}}
				/>

				{/* Fallback if script doesn't load */}
				{!isScriptLoaded && (
					<div className="text-center py-8">
						<div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
						<p className="text-sm text-muted-foreground">
							Loading Calendly widget...
						</p>
					</div>
				)}

				{/* Custom styles for responsive behavior */}
				<style jsx>{`
					@media (max-width: 768px) {
						.calendly-inline-widget {
							height: ${responsiveHeight?.mobile || "500px"} !important;
						}
					}
					@media (min-width: 769px) and (max-width: 1024px) {
						.calendly-inline-widget {
							height: ${responsiveHeight?.tablet || "600px"} !important;
						}
					}
				`}</style>
			</div>
		);
	}

	// Modal/Widget mode (existing implementation)
	// Widget view
	if (showWidget) {
		// Show configuration error if no URL is provided
		if (!isCalendlyConfigured) {
			return (
				<div className="space-y-4">
					{/* Back button */}
					<div className="flex items-center justify-between">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleBackToInfo}
							className="text-muted-foreground hover:text-foreground">
							<Icon name="ArrowLeft" size={16} className="mr-2" />
							Back to Details
						</Button>
					</div>

					{/* Configuration error */}
					<div className="text-center py-8 space-y-4">
						<div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
							<Icon
								name="AlertTriangle"
								size={32}
								className="text-destructive"
							/>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-2">
								Calendly URL Not Configured
							</h3>
							<p className="text-sm text-muted-foreground mb-4">
								Please configure your Calendly URL to enable appointment
								scheduling.
							</p>
							<p className="text-xs text-muted-foreground">
								Contact your administrator to set up the Calendly integration.
							</p>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="space-y-4">
				{/* Back button */}
				<div className="flex items-center justify-between">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleBackToInfo}
						className="text-muted-foreground hover:text-foreground">
						<Icon name="ArrowLeft" size={16} className="mr-2" />
						Back to Details
					</Button>
					<div className="text-xs text-muted-foreground">
						{finalDuration} • No commitment required
					</div>
				</div>

				{/* Calendly widget */}
				<div
					className="w-full border border-border rounded-lg overflow-hidden calendly-responsive-container"
					style={
						{
							"--mobile-height": responsiveHeight?.mobile || "500px",
							"--tablet-height": responsiveHeight?.tablet || "600px",
							"--desktop-height": responsiveHeight?.desktop || "800px",
							height: responsiveHeight ? "var(--mobile-height)" : widgetHeight,
						} as React.CSSProperties
					}>
					<style
						dangerouslySetInnerHTML={{
							__html: responsiveHeight
								? `
							.calendly-responsive-container {
								height: var(--mobile-height);
							}
							@media (min-width: 768px) {
								.calendly-responsive-container {
									height: var(--tablet-height);
								}
							}
							@media (min-width: 1024px) {
								.calendly-responsive-container {
									height: var(--desktop-height);
								}
							}
						`
								: "",
						}}
					/>
					<iframe
						src={finalUrl}
						width="100%"
						height="100%"
						frameBorder="0"
						title="Schedule a meeting"
						className="w-full h-full"
					/>
				</div>
			</div>
		);
	}

	// Compact info view
	if (compact) {
		return (
			<div className="text-center space-y-4">
				<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
					<Icon name="Calendar" size={24} className="text-primary" />
				</div>
				<div>
					<h3 className="text-lg font-semibold text-foreground mb-2">
						{title}
					</h3>
					<p className="text-sm text-muted-foreground mb-4">{description}</p>
				</div>
				{isCalendlyConfigured ? (
					<Button onClick={handleShowWidget} className="w-full" size="lg">
						<Icon name="Calendar" size={16} className="mr-2" />
						{buttonText}
					</Button>
				) : (
					<Button variant="outline" disabled className="w-full" size="lg">
						<Icon name="AlertTriangle" size={16} className="mr-2" />
						Calendly URL Not Configured
					</Button>
				)}
				<p className="text-xs text-muted-foreground">
					{finalDuration} • No commitment required
				</p>
			</div>
		);
	}

	// Full info view
	return (
		<div className="text-center space-y-6">
			{/* Header */}
			<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
				<Icon name="Calendar" size={32} className="text-primary" />
			</div>

			<div>
				<h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
				<p className="text-muted-foreground leading-relaxed">{description}</p>
			</div>

			{/* Features List */}
			{showFeatures && features.length > 0 && (
				<div className="text-left space-y-3">
					<p className="text-sm font-medium text-foreground mb-3">
						We'll show you:
					</p>
					{features.map((feature, index) => (
						<div key={index} className="flex items-start space-x-3">
							<Icon
								name="Check"
								size={16}
								className="text-green-500 mt-1 flex-shrink-0"
							/>
							<span className="text-sm text-muted-foreground">{feature}</span>
						</div>
					))}
				</div>
			)}

			{/* Action Button */}
			<div className="space-y-3">
				{isCalendlyConfigured ? (
					<Button onClick={handleShowWidget} className="w-full" size="lg">
						<Icon name="Calendar" size={16} className="mr-2" />
						{buttonText}
					</Button>
				) : (
					<Button variant="outline" disabled className="w-full" size="lg">
						<Icon name="AlertTriangle" size={16} className="mr-2" />
						Calendly URL Not Configured
					</Button>
				)}
			</div>

			<p className="text-xs text-muted-foreground">
				{finalDuration} • No commitment required
			</p>
		</div>
	);
};

export default VersatileCalendlyScheduler;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";

interface CalendlySchedulerProps {
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
	/** Custom duration suffix mapping */
	durationSuffixes?: Record<string, string>;
}

const CalendlyScheduler: React.FC<CalendlySchedulerProps> = ({
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
	durationSuffixes,
}) => {
	const [showWidget, setShowWidget] = useState(startWithWidget);

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

	const handleShowWidget = () => {
		setShowWidget(true);
		onCalendlyOpen?.();
	};

	const handleBackToInfo = () => {
		setShowWidget(false);
	};

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
					className="w-full border border-border rounded-lg overflow-hidden"
					style={{ height: widgetHeight }}>
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

export default CalendlyScheduler;

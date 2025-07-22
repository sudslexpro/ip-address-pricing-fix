/**
 * Calendly Configuration
 *
 * This file contains configuration settings for Calendly integration.
 * Update the CALENDLY_URL with your actual Calendly scheduling URL.
 */

export const CALENDLY_CONFIG = {
	// Replace with your actual Calendly URL
	// Example: "https://calendly.com/your-username/30min"
	URL: "https://calendly.com/your-calendly-username",

	// Default prefill data for forms
	DEFAULT_PREFILL: {
		name: "",
		email: "",
		company: "",
	},

	// UTM parameters for tracking
	UTM_PARAMS: {
		utmCampaign: "lex-protector-demo",
		utmSource: "website",
		utmMedium: "booking-widget",
	},

	// Widget settings
	WIDGET_SETTINGS: {
		hideEventTypeDetails: false,
		hideLandingPageDetails: false,
		primaryColor: "00a2ff", // Customize to match your brand
		textColor: "ffffff",
		backgroundColor: "ffffff",
	},
};

/**
 * Calendly Event Types
 *
 * Different meeting types you might want to offer
 */
export const CALENDLY_EVENT_TYPES = {
	DEMO: "30min", // 30-minute demo
	CONSULTATION: "consultation", // Longer consultation
	ONBOARDING: "onboarding", // Onboarding session
	SUPPORT: "support", // Support session
};

/**
 * Get Calendly URL for specific event type
 */
export const getCalendlyUrl = (eventType?: string): string => {
	const baseUrl = CALENDLY_CONFIG.URL;
	if (eventType && baseUrl.includes("your-calendly-username")) {
		// If using placeholder URL, return it as-is
		return baseUrl;
	}

	if (eventType) {
		// Replace the event type in the URL if specified
		const basePath = baseUrl.split("/").slice(0, -1).join("/");
		return `${basePath}/${eventType}`;
	}

	return baseUrl;
};

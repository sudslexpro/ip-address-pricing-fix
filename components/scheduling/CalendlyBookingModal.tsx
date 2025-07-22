"use client";
import React, { useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/icon/AppIcon";
import { useCalendly } from "@/hooks/useCalendly";

interface CalendlyBookingModalProps {
	isOpen: boolean;
	onClose: () => void;
	calendlyUrl?: string;
}

const CalendlyBookingModal: React.FC<CalendlyBookingModalProps> = ({
	isOpen,
	onClose,
	calendlyUrl = "https://calendly.com/your-calendly-username", // Replace with your actual Calendly URL
}) => {
	const { isLoaded, closePopup, initInlineWidget } = useCalendly();

	useEffect(() => {
		if (isOpen && isLoaded) {
			// Initialize the inline widget when modal opens and Calendly is loaded
			initInlineWidget("calendly-inline-widget", {
				url: calendlyUrl,
				prefill: {
					// You can prefill form fields if needed
					name: "",
					email: "",
				},
				utm: {
					// UTM parameters for tracking
					utmCampaign: "lex-protector-demo",
					utmSource: "pricing-page",
					utmMedium: "website",
				},
			});
		}
	}, [isOpen, isLoaded, calendlyUrl, initInlineWidget]);

	const handleClose = () => {
		// Close any open Calendly popups
		closePopup();
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden p-0">
				<DialogHeader className="p-6 pb-4">
					<DialogTitle className="flex items-center gap-2 text-xl font-bold text-text-primary">
						<Icon name="Calendar" size={20} className="text-primary" />
						Schedule Your Demo
					</DialogTitle>
					<DialogDescription className="text-text-secondary">
						Book a personalized demo with our team to see how Lex Protector can
						transform your legal practice. Choose a time that works best for
						you.
					</DialogDescription>
				</DialogHeader>

				{/* Calendly Inline Widget Container */}
				<div className="flex-1 min-h-[600px] px-6 pb-6">
					<div
						id="calendly-inline-widget"
						className="w-full h-full min-h-[600px] rounded-lg border border-border overflow-hidden"
						style={{ minWidth: "320px" }}>
						{/* Loading state */}
						{!isLoaded && (
							<div className="flex items-center justify-center h-full bg-surface">
								<div className="text-center">
									<Icon
										name="Calendar"
										size={48}
										className="text-primary mx-auto mb-4"
									/>
									<p className="text-text-secondary">
										Loading booking calendar...
									</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Alternative: Direct link fallback */}
				<div className="px-6 pb-6">
					<div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
						<p className="text-sm text-text-secondary mb-2">
							Having trouble with the calendar?{" "}
							<a
								href={calendlyUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:text-accent underline font-medium">
								Open in new window
							</a>
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CalendlyBookingModal;

"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import { useCalendly } from "@/hooks/useCalendly";
import { useCalendlyModal } from "@/components/providers/CalendlyModalProvider";

interface CalendlyBookingModalProps {
	isOpen: boolean;
	onClose: () => void;
	calendlyUrl?: string;
}

const CalendlyBookingModal: React.FC<CalendlyBookingModalProps> = ({
	isOpen,
	onClose,
	calendlyUrl = "https://calendly.com/lexprotectortech/", // Replace with your actual Calendly URL
}) => {
	const {
		isLoaded,
		isLoading,
		error,
		closePopup,
		initInlineWidget,
		retryLoad,
	} = useCalendly();
	const { closeModal } = useCalendlyModal();
	const [widgetInitialized, setWidgetInitialized] = useState(false);
	const [widgetError, setWidgetError] = useState<string | null>(null);
	const [isRetrying, setIsRetrying] = useState(false);

	// Initialize widget when modal opens and Calendly is loaded
	const initializeWidget = useCallback(() => {
		if (!isOpen || !isLoaded || widgetInitialized) return;

		try {
			initInlineWidget("calendly-inline-widget", {
				url: calendlyUrl,
				prefill: {
					name: "",
					email: "",
				},
				utm: {
					utmCampaign: "lex-protector-demo",
					utmSource: "pricing-page",
					utmMedium: "website",
				},
			});
			setWidgetInitialized(true);
			setWidgetError(null);
		} catch (err) {
			console.error("Widget initialization failed:", err);
			setWidgetError("Failed to load booking calendar");
		}
	}, [isOpen, isLoaded, calendlyUrl, initInlineWidget, widgetInitialized]);

	useEffect(() => {
		if (isOpen && isLoaded) {
			// Small delay to ensure DOM is ready
			const timer = setTimeout(initializeWidget, 100);
			return () => clearTimeout(timer);
		}
	}, [isOpen, isLoaded, initializeWidget]);

	// Reset widget state when modal closes
	useEffect(() => {
		if (!isOpen) {
			setWidgetInitialized(false);
			setWidgetError(null);
		}
	}, [isOpen]);

	const handleClose = useCallback(() => {
		closePopup();
		closeModal(); // Update global context
		onClose();
	}, [closePopup, closeModal, onClose]);

	const handleRetry = useCallback(() => {
		setWidgetError(null);
		setWidgetInitialized(false);
		setIsRetrying(true);

		// Add a small delay to show retry feedback
		setTimeout(() => {
			if (error) {
				retryLoad();
			} else {
				initializeWidget();
			}
			setIsRetrying(false);
		}, 800);
	}, [error, retryLoad, initializeWidget]);

	// Determine container height based on screen size and device capabilities
	const getResponsiveHeight = () => {
		if (typeof window !== "undefined") {
			const viewportHeight = window.innerHeight;
			const isMobile = window.innerWidth < 768;
			const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

			// Account for mobile browser UI chrome and keyboard
			const mobileViewportAdjustment = isMobile ? 0.65 : 0.8;
			const tabletViewportAdjustment = isTablet ? 0.75 : 0.8;

			if (isMobile) {
				// On mobile, be more conservative with height to account for virtual keyboard
				const baseHeight = Math.min(
					500,
					viewportHeight * mobileViewportAdjustment
				);
				// Ensure minimum usable height
				return Math.max(350, baseHeight);
			} else if (isTablet) {
				return Math.min(650, viewportHeight * tabletViewportAdjustment);
			}

			return Math.min(700, viewportHeight * 0.85);
		}
		return 600;
	};

	const [containerHeight, setContainerHeight] = useState(600);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const updateHeight = () => setContainerHeight(getResponsiveHeight());
		updateHeight();

		// Debounce resize handler for better performance
		let resizeTimeout: NodeJS.Timeout;
		const debouncedResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(updateHeight, 150);
		};

		window.addEventListener("resize", debouncedResize, { passive: true });

		// Also listen for orientation changes on mobile
		window.addEventListener(
			"orientationchange",
			() => {
				// Delay to account for browser UI changes
				setTimeout(updateHeight, 300);
			},
			{ passive: true }
		);

		// Listen for viewport height changes (mobile keyboard)
		if ("visualViewport" in window) {
			window.visualViewport?.addEventListener("resize", updateHeight, {
				passive: true,
			});
		}

		return () => {
			window.removeEventListener("resize", debouncedResize);
			window.removeEventListener("orientationchange", updateHeight);
			if ("visualViewport" in window) {
				window.visualViewport?.removeEventListener("resize", updateHeight);
			}
			clearTimeout(resizeTimeout);
		};
	}, []);

	const showError = error || widgetError;
	const showLoading =
		(isLoading || !widgetInitialized || isRetrying) && !showError;

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent
				className="
					w-[95vw] max-w-4xl 
					h-[95vh] max-h-[780px]
					sm:w-[90vw] sm:h-[90vh]
					md:w-[85vw] md:h-[85vh]
					lg:w-[80vw] lg:max-w-4xl
					overflow-hidden p-0
					flex flex-col mt-8
				"
				style={{ minHeight: "400px" }}>
				<DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4 flex-shrink-0">
					<DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold text-text-primary">
						<Icon name="Calendar" size={20} className="text-primary" />
						Schedule Your Demo
					</DialogTitle>
					<DialogDescription className="text-sm sm:text-base text-text-secondary">
						Book a personalized demo with our team to see how Lex Protector can
						transform your legal practice. Choose a time that works best for
						you.
					</DialogDescription>
				</DialogHeader>

				{/* Calendly Inline Widget Container */}
				<div className="flex-1 px-4 sm:px-6 pb-4 sm:pb-6 min-h-0">
					<div
						id="calendly-inline-widget"
						className="w-full h-full rounded-lg border border-border overflow-hidden bg-white"
						style={{
							minHeight: `${Math.max(containerHeight, 350)}px`,
							height: "100%",
						}}>
						{/* Loading State */}
						{showLoading && (
							<div className="flex items-center justify-center h-full bg-surface">
								<div className="text-center p-4">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
									<Icon
										name="Calendar"
										size={48}
										className="text-primary mx-auto mb-4 opacity-60"
									/>
									<p className="text-text-secondary text-sm sm:text-base">
										{isRetrying
											? "Retrying connection..."
											: isLoading
											? "Loading booking system..."
											: "Setting up calendar..."}
									</p>
									<p className="text-text-muted text-xs mt-2">
										{isRetrying
											? "Please wait while we reconnect..."
											: "This may take a few seconds"}
									</p>
									{isLoading && !isRetrying && (
										<div className="mt-4">
											<div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
												<div
													className="bg-primary h-2 rounded-full animate-pulse"
													style={{ width: "45%" }}></div>
											</div>
										</div>
									)}
								</div>
							</div>
						)}

						{/* Error State */}
						{showError && (
							<div className="flex items-center justify-center h-full bg-surface">
								<div className="text-center p-4 max-w-md">
									<Icon
										name="AlertCircle"
										size={48}
										className="text-red-500 mx-auto mb-4"
									/>
									<h3 className="text-lg font-semibold text-text-primary mb-2">
										Loading Failed
									</h3>
									<p className="text-text-secondary text-sm mb-4">
										{showError}
									</p>
									<div className="space-y-2">
										<Button
											onClick={handleRetry}
											className="w-full sm:w-auto"
											disabled={isRetrying}>
											<Icon
												name={isRetrying ? "Loader2" : "RefreshCw"}
												size={16}
												className={`mr-2 ${isRetrying ? "animate-spin" : ""}`}
											/>
											{isRetrying ? "Retrying..." : "Try Again"}
										</Button>
										<div className="text-xs text-text-muted">
											or{" "}
											<a
												href={calendlyUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary hover:text-accent underline font-medium">
												open in new window
											</a>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Footer with alternative link */}
				<div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-shrink-0">
					<div className="bg-accent/10 rounded-lg p-3 sm:p-4 border border-accent/20">
						<p className="text-xs sm:text-sm text-text-secondary">
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

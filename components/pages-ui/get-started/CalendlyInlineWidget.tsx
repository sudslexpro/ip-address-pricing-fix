"use client";

import React, { useEffect, useRef } from "react";
import { useCalendly } from "@/hooks/useCalendly";
import { CALENDLY_CONFIG } from "@/lib/calendly-config";
import Icon from "@/components/icon/AppIcon";

interface CalendlyInlineWidgetProps {
	calendlyUrl?: string;
	height?: string;
	className?: string;
	prefill?: Record<string, string>;
}

const CalendlyInlineWidget: React.FC<CalendlyInlineWidgetProps> = ({
	calendlyUrl = CALENDLY_CONFIG.URL,
	height = "600px",
	className = "",
	prefill = {},
}) => {
	const widgetRef = useRef<HTMLDivElement>(null);
	const { isLoaded, initInlineWidget } = useCalendly();
	const widgetId = `calendly-inline-${Math.random().toString(36).substr(2, 9)}`;

	useEffect(() => {
		if (isLoaded && widgetRef.current) {
			initInlineWidget(widgetId, {
				url: calendlyUrl,
				prefill: {
					...CALENDLY_CONFIG.DEFAULT_PREFILL,
					...prefill,
				},
				utm: CALENDLY_CONFIG.UTM_PARAMS,
			});
		}
	}, [isLoaded, calendlyUrl, prefill, widgetId, initInlineWidget]);

	return (
		<div className={`w-full ${className}`}>
			<div
				ref={widgetRef}
				id={widgetId}
				className="w-full rounded-lg border border-border overflow-hidden bg-white"
				style={{
					height,
					minHeight: height,
					minWidth: "320px",
				}}>
				{/* Loading state */}
				{!isLoaded && (
					<div
						className="flex items-center justify-center bg-surface"
						style={{ height }}>
						<div className="text-center">
							<div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
							<Icon
								name="Calendar"
								size={32}
								className="text-primary mx-auto mb-2"
							/>
							<p className="text-text-secondary text-sm">
								Loading booking calendar...
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Fallback link */}
			<div className="mt-4 text-center">
				<p className="text-sm text-text-muted">
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
	);
};

export default CalendlyInlineWidget;

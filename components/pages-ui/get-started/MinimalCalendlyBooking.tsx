"use client";

import React from "react";
import CalendlyInlineWidget from "@/components/pages-ui/get-started/CalendlyInlineWidget";
import Icon from "@/components/icon/AppIcon";
import { CALENDLY_CONFIG } from "@/lib/calendly-config";

const MinimalCalendlyBooking: React.FC = () => {
	return (
		<section
			id="get-started"
			className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
			<div className="max-w-4xl mx-auto px-6 lg:px-8">
				{/* Simple Header */}
				<div className="text-center mb-8">
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
						Schedule Your{" "}
						<span className="text-primary">Free Consultation</span>
					</h2>
					<p className="text-lg text-text-secondary max-w-2xl mx-auto">
						Book a personalized demo with our team to see how Lex Protector can
						transform your legal practice.
					</p>
				</div>

				{/* Direct Calendly Embed */}
				<div className="bg-white rounded-2xl shadow-cta border border-border p-6">
					<CalendlyInlineWidget height="700px" className="min-h-[700px]" />
				</div>

				{/* Mobile Alternative */}
				<div className="mt-6 text-center">
					<p className="text-sm text-text-secondary mb-2">
						Having trouble with the calendar above?
					</p>
					<a
						href={CALENDLY_CONFIG.URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center px-4 py-2 text-primary hover:text-accent underline font-medium text-sm">
						<Icon name="ExternalLink" size={16} className="mr-1" />
						Open in new window
					</a>
				</div>

				{/* Trust Signals */}
				<div className="text-center mt-8">
					<div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
						<div className="flex items-center space-x-2">
							<Icon name="Clock" size={16} className="text-success" />
							<span>30 Minutes</span>
						</div>
						<div className="flex items-center space-x-2">
							<Icon name="Shield" size={16} className="text-success" />
							<span>No Commitment</span>
						</div>
						<div className="flex items-center space-x-2">
							<Icon name="Users" size={16} className="text-success" />
							<span>Expert Team</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MinimalCalendlyBooking;

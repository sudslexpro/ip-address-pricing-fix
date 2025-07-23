"use client";

import React from "react";
import CalendlyInlineWidget from "@/components/pages-ui/get-started/CalendlyInlineWidget";
import Icon from "@/components/icon/AppIcon";
import { CALENDLY_CONFIG } from "@/lib/calendly-config";

const SimpleCalendlyBooking: React.FC = () => {
	return (
		<section
			id="get-started"
			className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
			<div className="max-w-6xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="Calendar" size={16} />
						<span>Book Consultation</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Schedule Your{" "}
						<span className="text-primary">Free Consultation</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-2xl mx-auto">
						Meet with our legal technology experts to discover how Lex Protector
						can transform your trademark practice. Book your personalized demo
						below.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-start">
					{/* Left Column - Benefits */}
					<div>
						<div className="bg-white rounded-2xl shadow-cta border border-border p-8">
							<h3 className="text-2xl font-bold text-text-primary mb-6">
								What You'll Get
							</h3>

							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
										<Icon name="Eye" size={24} className="text-primary" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-text-primary mb-2">
											Live Platform Demo
										</h4>
										<p className="text-text-secondary">
											See real-time quote generation for your specific practice
											areas and jurisdictions with actual data.
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
										<Icon name="Settings" size={24} className="text-primary" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-text-primary mb-2">
											Custom Configuration
										</h4>
										<p className="text-text-secondary">
											Learn how to tailor Lex Protector to your firm's specific
											workflow, branding, and client requirements.
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
										<Icon
											name="TrendingUp"
											size={24}
											className="text-primary"
										/>
									</div>
									<div>
										<h4 className="text-lg font-semibold text-text-primary mb-2">
											ROI Analysis
										</h4>
										<p className="text-text-secondary">
											Understand the time savings and revenue impact Lex
											Protector can have on your practice with concrete metrics.
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
										<Icon name="Users" size={24} className="text-primary" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-text-primary mb-2">
											Implementation Plan
										</h4>
										<p className="text-text-secondary">
											Get a clear roadmap for onboarding your team and
											integrating with your existing systems.
										</p>
									</div>
								</div>
							</div>

							{/* Trust indicators */}
							<div className="mt-8 pt-6 border-t border-border">
								<div className="flex items-center justify-center space-x-8 text-sm text-text-muted">
									<div className="flex items-center space-x-2">
										<Icon name="Clock" size={16} className="text-success" />
										<span>30 Minutes</span>
									</div>
									<div className="flex items-center space-x-2">
										<Icon name="Shield" size={16} className="text-success" />
										<span>No Commitment</span>
									</div>
									<div className="flex items-center space-x-2">
										<Icon name="Star" size={16} className="text-success" />
										<span>Expert Team</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Calendly Widget */}
					<div>
						<div className="bg-white rounded-2xl shadow-cta border border-border p-6">
							<div className="mb-4">
								<h3 className="text-xl font-semibold text-text-primary mb-2">
									Choose Your Time
								</h3>
								<p className="text-sm text-text-secondary">
									Select a time that works best for you. All times are shown in
									your local timezone.
								</p>
							</div>

							<CalendlyInlineWidget height="650px" className="min-h-[650px]" />
						</div>
					</div>
				</div>

				{/* Bottom CTA for mobile */}
				<div className="mt-12 lg:hidden">
					<div className="bg-white rounded-xl border border-border p-6 text-center">
						<p className="text-text-secondary mb-4">
							Prefer to schedule on mobile?
						</p>
						<a
							href={CALENDLY_CONFIG.URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">
							<Icon name="Calendar" size={20} className="mr-2" />
							Open Calendly App
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SimpleCalendlyBooking;

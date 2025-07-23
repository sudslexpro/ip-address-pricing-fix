"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import CalendlyBookingModal from "@/components/scheduling/CalendlyBookingModal";
import { CALENDLY_CONFIG } from "@/lib/calendly-config";

const CalendlyBookingSection: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openBookingModal = () => {
		setIsModalOpen(true);
	};

	const closeBookingModal = () => {
		setIsModalOpen(false);
	};

	return (
		<section
			id="get-started"
			className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
			<div className="max-w-4xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="Calendar" size={16} />
						<span>Book Consultation</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Ready to Transform Your{" "}
						<span className="text-primary">Legal Practice?</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-2xl mx-auto">
						Schedule a personalized consultation with our legal technology
						experts and discover how Lex Protector can revolutionize your
						trademark practice.
					</p>
				</div>

				{/* Main CTA Card */}
				<div className="bg-white rounded-2xl shadow-cta border border-border overflow-hidden">
					<div className="p-8 lg:p-12 text-center">
						<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
							<Icon name="Calendar" size={40} className="text-primary" />
						</div>

						<h3 className="text-2xl font-bold text-text-primary mb-4">
							Schedule Your Free Consultation
						</h3>

						<p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
							Meet with our team for a personalized demo tailored to your firm's
							needs. See live quote generation, explore our global coverage, and
							discover how we can streamline your trademark processes.
						</p>

						{/* Benefits Grid */}
						<div className="grid md:grid-cols-3 gap-6 mb-8">
							<div className="bg-surface rounded-lg p-6">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
									<Icon name="Clock" size={24} className="text-primary" />
								</div>
								<h4 className="text-sm font-semibold text-text-primary mb-2">
									30-Minute Session
								</h4>
								<p className="text-sm text-text-secondary">
									Focused consultation tailored to your practice needs
								</p>
							</div>

							<div className="bg-surface rounded-lg p-6">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
									<Icon name="Users" size={24} className="text-primary" />
								</div>
								<h4 className="text-sm font-semibold text-text-primary mb-2">
									Expert Team
								</h4>
								<p className="text-sm text-text-secondary">
									Meet with our legal technology specialists
								</p>
							</div>

							<div className="bg-surface rounded-lg p-6">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
									<Icon name="Zap" size={24} className="text-primary" />
								</div>
								<h4 className="text-sm font-semibold text-text-primary mb-2">
									Live Demo
								</h4>
								<p className="text-sm text-text-secondary">
									See real quote generation for your practice areas
								</p>
							</div>
						</div>

						{/* Main CTA Button */}
						<Button
							onClick={openBookingModal}
							size="lg"
							className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-4 h-auto mb-6">
							<Icon name="Calendar" size={20} className="mr-2" />
							Book Your Free Consultation
						</Button>

						{/* Alternative booking option */}
						<div className="bg-accent/10 rounded-lg p-4">
							<p className="text-sm text-text-secondary mb-2">
								Prefer to schedule directly?{" "}
								<a
									href={CALENDLY_CONFIG.URL}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:text-accent underline font-medium">
									Open Calendly in a new window
								</a>
							</p>
						</div>
					</div>
				</div>

				{/* What to Expect Section */}
				<div className="mt-12">
					<div className="bg-white rounded-xl border border-border p-8">
						<h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
							What to Expect During Your Consultation
						</h3>

						<div className="space-y-4">
							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-sm font-semibold text-primary">1</span>
								</div>
								<div>
									<h4 className="font-semibold text-text-primary mb-1">
										Practice Assessment
									</h4>
									<p className="text-sm text-text-secondary">
										We'll discuss your current quote process, practice areas,
										and specific challenges
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-sm font-semibold text-primary">2</span>
								</div>
								<div>
									<h4 className="font-semibold text-text-primary mb-1">
										Live Platform Demo
									</h4>
									<p className="text-sm text-text-secondary">
										See real-time quote generation for your specific
										jurisdictions and practice areas
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-sm font-semibold text-primary">3</span>
								</div>
								<div>
									<h4 className="font-semibold text-text-primary mb-1">
										Custom Solution Design
									</h4>
									<p className="text-sm text-text-secondary">
										Learn how Lex Protector can be tailored to your firm's
										workflow and requirements
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
									<span className="text-sm font-semibold text-primary">4</span>
								</div>
								<div>
									<h4 className="font-semibold text-text-primary mb-1">
										Next Steps Planning
									</h4>
									<p className="text-sm text-text-secondary">
										Discuss implementation timeline, training, and your free
										trial setup
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Trust Signals */}
				<div className="text-center mt-8">
					<div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
						<div className="flex items-center space-x-2">
							<Icon name="Shield" size={16} className="text-success" />
							<span>SOC 2 Certified</span>
						</div>
						<div className="flex items-center space-x-2">
							<Icon name="Lock" size={16} className="text-success" />
							<span>Bank-Level Security</span>
						</div>
						<div className="flex items-center space-x-2">
							<Icon name="Clock" size={16} className="text-success" />
							<span>24-Hour Response</span>
						</div>
						<div className="flex items-center space-x-2">
							<Icon name="Users" size={16} className="text-success" />
							<span>500+ Partner Firms</span>
						</div>
					</div>
				</div>
			</div>

			{/* Calendly Booking Modal */}
			<CalendlyBookingModal
				isOpen={isModalOpen}
				onClose={closeBookingModal}
				calendlyUrl={CALENDLY_CONFIG.URL}
			/>
		</section>
	);
};

export default CalendlyBookingSection;

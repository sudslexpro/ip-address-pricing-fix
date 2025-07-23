"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/icon/AppIcon";

const GetStartedSection = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		firmName: "",
		firmSize: "",
		monthlyQuotes: "",
		practiceAreas: [] as string[],
		currentChallenges: [] as string[],
		preferredDemo: "live",
		timeZone: "",
		message: "",
	});
	const [currentStep, setCurrentStep] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const firmSizes = [
		{ value: "solo", label: "Solo Practitioner", description: "1 attorney" },
		{ value: "small", label: "Small Firm", description: "2-5 attorneys" },
		{ value: "medium", label: "Medium Firm", description: "6-15 attorneys" },
		{ value: "large", label: "Large Firm", description: "15+ attorneys" },
	];

	const practiceAreas = [
		"Trademark Registration",
		"Copyright Law",
		"Patent Applications",
		"IP Litigation",
		"Brand Protection",
		"International IP",
		"Trade Secrets",
		"Domain Disputes",
	];

	const challenges = [
		"Slow quote preparation",
		"International complexity",
		"Pricing inconsistency",
		"Client pressure for speed",
		"Limited country knowledge",
		"Manual calculation errors",
		"Competitive disadvantage",
		"Time management issues",
	];

	const timeZones = [
		"Eastern Time (ET)",
		"Central Time (CT)",
		"Mountain Time (MT)",
		"Pacific Time (PT)",
		"Other/International",
	];

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleArrayToggle = (
		field: "practiceAreas" | "currentChallenges",
		value: string
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: prev[field].includes(value)
				? prev[field].filter((item: string) => item !== value)
				: [...prev[field], value],
		}));
	};

	const validateStep = (step: number) => {
		switch (step) {
			case 1:
				return (
					formData.firstName &&
					formData.lastName &&
					formData.email &&
					formData.firmName
				);
			case 2:
				return (
					formData.firmSize &&
					formData.monthlyQuotes &&
					formData.practiceAreas.length > 0
				);
			case 3:
				return formData.currentChallenges.length > 0 && formData.timeZone;
			default:
				return true;
		}
	};

	const nextStep = () => {
		if (validateStep(currentStep) && currentStep < 3) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateStep(3)) return;

		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
		}, 2000);
	};

	if (isSubmitted) {
		return (
			<section
				id="get-started"
				className="pt-20 pb-20 bg-gradient-to-br from-success/10 to-primary/10">
				<div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
					<div className="bg-white rounded-2xl shadow-cta border border-border p-12">
						<div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
							<Icon name="CheckCircle" size={40} className="text-success" />
						</div>
						<h2 className="text-3xl font-bold text-text-primary mb-4">
							Welcome to Lex Protector!
						</h2>
						<p className="text-xl text-text-secondary mb-8">
							Thank you for your interest. We'll be in touch within 24 hours to
							schedule your personalized demo.
						</p>

						<div className="bg-surface rounded-lg p-6 mb-8">
							<h3 className="text-lg font-semibold text-text-primary mb-4">
								What happens next?
							</h3>
							<div className="space-y-3 text-left">
								<div className="flex items-center space-x-3">
									<div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
										1
									</div>
									<span className="text-sm text-text-secondary">
										Our team reviews your requirements
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
										2
									</div>
									<span className="text-sm text-text-secondary">
										We'll call to schedule your personalized demo
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
										3
									</div>
									<span className="text-sm text-text-secondary">
										Experience live quote generation for your practice
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-medium text-primary">
										4
									</div>
									<span className="text-sm text-text-secondary">
										Start your 14-day free trial
									</span>
								</div>
							</div>
						</div>

						<div className="bg-accent/10 rounded-lg p-4 mb-6">
							<p className="text-sm text-accent font-medium">
								<Icon name="Clock" size={16} className="inline mr-2" />
								Expected response time: Within 24 hours
							</p>
						</div>

						<Button
							variant="default"
							size="lg"
							onClick={() => window.location.reload()}
							className="bg-primary hover:bg-primary/90 text-white">
							Return to Homepage
						</Button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="get-started"
			className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
			<div className="max-w-4xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="Rocket" size={16} />
						<span>Get Started</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Ready to Transform Your{" "}
						<span className="text-primary">Quote Process?</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-2xl mx-auto">
						Schedule a personalized demo and see how Lex Protector can
						revolutionize your trademark practice.
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-cta border border-border overflow-hidden">
					{/* Progress Bar */}
					<div className="bg-surface px-8 py-4">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium text-text-primary">
								Step {currentStep} of 3
							</span>
							<span className="text-sm text-text-secondary">
								{currentStep === 1 && "Basic Information"}
								{currentStep === 2 && "Practice Details"}
								{currentStep === 3 && "Demo Preferences"}
							</span>
						</div>
						<div className="w-full bg-border rounded-full h-2">
							<div
								className="bg-primary h-2 rounded-full transition-all duration-300"
								style={{ width: `${(currentStep / 3) * 100}%` }}></div>
						</div>
					</div>

					<form onSubmit={handleSubmit} className="p-8">
						{/* Step 1: Basic Information */}
						{currentStep === 1 && (
							<div className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-text-primary mb-2">
											First Name *
										</label>
										<Input
											type="text"
											placeholder="John"
											value={formData.firstName}
											onChange={(e) =>
												handleInputChange("firstName", e.target.value)
											}
											required
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-text-primary mb-2">
											Last Name *
										</label>
										<Input
											type="text"
											placeholder="Smith"
											value={formData.lastName}
											onChange={(e) =>
												handleInputChange("lastName", e.target.value)
											}
											required
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-2">
										Email Address *
									</label>
									<Input
										type="email"
										placeholder="john.smith@lawfirm.com"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										required
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-2">
										Phone Number
									</label>
									<Input
										type="tel"
										placeholder="+1 (555) 123-4567"
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-2">
										Firm Name *
									</label>
									<Input
										type="text"
										placeholder="Smith & Associates IP Law"
										value={formData.firmName}
										onChange={(e) =>
											handleInputChange("firmName", e.target.value)
										}
										required
									/>
								</div>
							</div>
						)}

						{/* Step 2: Practice Details */}
						{currentStep === 2 && (
							<div className="space-y-6">
								<div>
									<label className="block text-sm font-medium text-text-primary mb-3">
										Firm Size *
									</label>
									<div className="grid md:grid-cols-2 gap-3">
										{firmSizes.map((size) => (
											<button
												key={size.value}
												type="button"
												onClick={() =>
													handleInputChange("firmSize", size.value)
												}
												className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
													formData.firmSize === size.value
														? "border-primary bg-primary/10 text-primary"
														: "border-border hover:border-primary/50 hover:bg-surface"
												}`}>
												<div className="text-left">
													<div className="font-medium">{size.label}</div>
													<div className="text-sm text-text-secondary">
														{size.description}
													</div>
												</div>
											</button>
										))}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-2">
										Monthly Quote Volume *
									</label>
									<Input
										type="number"
										placeholder="25"
										value={formData.monthlyQuotes}
										onChange={(e) =>
											handleInputChange("monthlyQuotes", e.target.value)
										}
										required
									/>
									<p className="text-xs text-text-muted mt-1">
										Approximate number of trademark quotes you prepare monthly
									</p>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-3">
										Practice Areas * (Select all that apply)
									</label>
									<div className="grid md:grid-cols-2 gap-2">
										{practiceAreas.map((area) => (
											<button
												key={area}
												type="button"
												onClick={() => handleArrayToggle("practiceAreas", area)}
												className={`flex items-center space-x-3 p-3 rounded-lg border text-left transition-all duration-200 ${
													formData.practiceAreas.includes(area)
														? "border-primary bg-primary/10 text-primary"
														: "border-border hover:border-primary/50 hover:bg-surface"
												}`}>
												<div
													className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
														formData.practiceAreas.includes(area)
															? "border-primary bg-primary"
															: "border-border"
													}`}>
													{formData.practiceAreas.includes(area) && (
														<Icon
															name="Check"
															size={12}
															className="text-white"
														/>
													)}
												</div>
												<span className="text-sm">{area}</span>
											</button>
										))}
									</div>
								</div>
							</div>
						)}

						{/* Step 3: Demo Preferences */}
						{currentStep === 3 && (
							<div className="space-y-6">
								<div>
									<label className="block text-sm font-medium text-text-primary mb-3">
										Current Challenges * (Select all that apply)
									</label>
									<div className="grid md:grid-cols-2 gap-2">
										{challenges.map((challenge) => (
											<button
												key={challenge}
												type="button"
												onClick={() =>
													handleArrayToggle("currentChallenges", challenge)
												}
												className={`flex items-center space-x-3 p-3 rounded-lg border text-left transition-all duration-200 ${
													formData.currentChallenges.includes(challenge)
														? "border-primary bg-primary/10 text-primary"
														: "border-border hover:border-primary/50 hover:bg-surface"
												}`}>
												<div
													className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
														formData.currentChallenges.includes(challenge)
															? "border-primary bg-primary"
															: "border-border"
													}`}>
													{formData.currentChallenges.includes(challenge) && (
														<Icon
															name="Check"
															size={12}
															className="text-white"
														/>
													)}
												</div>
												<span className="text-sm">{challenge}</span>
											</button>
										))}
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-3">
										Preferred Demo Type
									</label>
									<div className="grid md:grid-cols-2 gap-3">
										<button
											type="button"
											onClick={() => handleInputChange("preferredDemo", "live")}
											className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
												formData.preferredDemo === "live"
													? "border-primary bg-primary/10 text-primary"
													: "border-border hover:border-primary/50 hover:bg-surface"
											}`}>
											<Icon name="Video" size={20} />
											<div className="text-left">
												<div className="font-medium">Live Demo</div>
												<div className="text-sm text-text-secondary">
													30-minute personalized session
												</div>
											</div>
										</button>
										<button
											type="button"
											onClick={() =>
												handleInputChange("preferredDemo", "recorded")
											}
											className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 ${
												formData.preferredDemo === "recorded"
													? "border-primary bg-primary/10 text-primary"
													: "border-border hover:border-primary/50 hover:bg-surface"
											}`}>
											<Icon name="Play" size={20} />
											<div className="text-left">
												<div className="font-medium">Recorded Demo</div>
												<div className="text-sm text-text-secondary">
													Watch at your convenience
												</div>
											</div>
										</button>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-2">
										Time Zone *
									</label>
									<select
										value={formData.timeZone}
										onChange={(e) =>
											handleInputChange("timeZone", e.target.value)
										}
										className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
										required>
										<option value="">Select your time zone</option>
										{timeZones.map((tz) => (
											<option key={tz} value={tz}>
												{tz}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-text-primary mb-2">
										Additional Message
									</label>
									<textarea
										value={formData.message}
										onChange={(e) =>
											handleInputChange("message", e.target.value)
										}
										placeholder="Tell us about your specific needs or questions..."
										rows={4}
										className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
									/>
								</div>
							</div>
						)}

						{/* Navigation Buttons */}
						<div className="flex items-center justify-between pt-8 border-t border-border">
							<Button
								type="button"
								variant="outline"
								onClick={prevStep}
								disabled={currentStep === 1}>
								Previous
							</Button>

							{currentStep < 3 ? (
								<Button
									type="button"
									variant="default"
									onClick={nextStep}
									disabled={!validateStep(currentStep)}>
									Next Step
								</Button>
							) : (
								<Button
									type="submit"
									variant="default"
									disabled={!validateStep(3) || isSubmitting}
									className="bg-orange-500 hover:bg-orange-600 text-white">
									{isSubmitting ? "Submitting..." : "Request Demo"}
								</Button>
							)}
						</div>
					</form>
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
		</section>
	);
};

export default GetStartedSection;

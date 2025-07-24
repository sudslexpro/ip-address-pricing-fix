"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import Link from "next/link";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalDescription,
} from "@/components/ui/modal";
import { CalendlyScheduler } from "@/components/scheduling";

const PricingSection = () => {
	const [billingCycle, setBillingCycle] = useState("monthly");
	const [selectedPlan, setSelectedPlan] = useState("professional");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const plans = {
		starter: {
			name: "Starter",
			description: "Perfect for solo practitioners and small firms",
			monthlyPrice: 99,
			annualPrice: 990,
			quotesIncluded: 25,
			additionalQuoteCost: 15,
			features: [
				"Up to 25 quotes per month",
				"100+ country coverage",
				"Basic white-label branding",
				"Email support",
				"Standard quote templates",
				"Basic analytics dashboard",
				"Mobile-responsive quotes",
			],
			limitations: [
				"Limited customization options",
				"Standard support response time",
			],
			popular: false,
			cta: "Start Free Trial",
		},
		professional: {
			name: "Professional",
			description: "Ideal for growing boutique firms",
			monthlyPrice: 199,
			annualPrice: 1990,
			quotesIncluded: 75,
			additionalQuoteCost: 12,
			features: [
				"Up to 75 quotes per month",
				"100+ country coverage",
				"Full white-label customization",
				"Priority email & chat support",
				"Custom quote templates",
				"Advanced analytics & reporting",
				"Client portal access",
				"Commission rate customization",
				"Bulk quote generation",
				"Technical support",
			],
			limitations: [],
			popular: true,
			cta: "Start Free Trial",
		},
		enterprise: {
			name: "Enterprise",
			description: "For established firms with high volume",
			monthlyPrice: 399,
			annualPrice: 3990,
			quotesIncluded: 200,
			additionalQuoteCost: 10,
			features: [
				"Up to 200 quotes per month",
				"100+ country coverage",
				"Complete white-label solution",
				"Dedicated account manager",
				"Custom solutions",
				"Advanced analytics & reporting",
				"Multi-user team access",
				"Custom commission structures",
				"Bulk operations",
				"Premium technical support",
				"Custom training sessions",
				"SLA guarantee",
			],
			limitations: [],
			popular: false,
			cta: "Contact Sales",
		},
	};

	const addOns = [
		{
			name: "Additional Quotes",
			description: "Extra quotes beyond your plan limit",
			price: "From $10-15 per quote",
			icon: "Plus",
		},
		{
			name: "Custom Solutions",
			description: "Tailored features for your firm",
			price: "Custom pricing",
			icon: "Link",
		},
		{
			name: "Training & Onboarding",
			description: "Dedicated training for your team",
			price: "$200 per session",
			icon: "GraduationCap",
		},
		{
			name: "Priority Support",
			description: "24/7 phone and email support",
			price: "$99 per month",
			icon: "Headphones",
		},
	];

	const faqItems = [
		{
			question: "How does the quote limit work?",
			answer:
				"Each plan includes a specific number of quotes per month. If you exceed your limit, additional quotes are charged at the per-quote rate. Unused quotes don't roll over to the next month.",
		},
		{
			question: "Can I customize the commission rates?",
			answer:
				"Yes! Professional and Enterprise plans allow full commission rate customization. You can set different rates for different countries or services to maximize your profitability.",
		},
		{
			question: "Is there a setup fee?",
			answer:
				"No setup fees for any plan. You can start generating quotes immediately after signing up. Enterprise customers receive complimentary onboarding assistance.",
		},
		{
			question: "What happens if I need to cancel?",
			answer:
				"You can cancel anytime. Monthly plans cancel at the end of the current billing cycle. Annual plans are prorated for unused months. No cancellation fees.",
		},
	];

	const getPrice = (plan: typeof plans.starter) => {
		return billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
	};

	const getSavings = (plan: typeof plans.starter) => {
		const monthlyCost = plan.monthlyPrice * 12;
		const annualCost = plan.annualPrice;
		return Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);
	};

	const handlePlanSelect = (planKey: string) => {
		setSelectedPlan(planKey);

		if (planKey === "enterprise") {
			// Redirect to contact page for enterprise plan
			window.location.href = "/support";
		} else {
			// Handle trial signup - redirect to signup page
			window.location.href = "https://partner.lexprotector.com/signup";
		}
	};

	const handleScheduleDemo = () => {
		setIsModalOpen(true);
	};

	return (
		<section id="pricing" className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="DollarSign" size={16} />
						<span>Transparent Pricing</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Choose Your <span className="text-accent">Growth Plan</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
						Start with a 14-day free trial. No credit card required. Scale as
						your practice grows.
					</p>

					{/* Billing Toggle */}
					<div className="inline-flex items-center bg-surface rounded-lg p-1 border border-border">
						<button
							onClick={() => setBillingCycle("monthly")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
								billingCycle === "monthly"
									? "bg-white text-primary shadow-sm"
									: "text-text-secondary hover:text-primary"
							}`}>
							Monthly
						</button>
						<button
							onClick={() => setBillingCycle("annual")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
								billingCycle === "annual"
									? "bg-white text-primary shadow-sm"
									: "text-text-secondary hover:text-primary"
							}`}>
							Annual
							<span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-success/20 text-success">
								Save 20%
							</span>
						</button>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="grid lg:grid-cols-3 gap-8 mb-16">
					{Object.entries(plans).map(([key, plan]) => (
						<div
							key={key}
							className={`relative bg-white rounded-2xl border-2 transition-all duration-200 ${
								plan.popular
									? "border-accent shadow-cta scale-105"
									: selectedPlan === key
									? "border-primary shadow-cta"
									: "border-border hover:border-primary/50 hover:shadow-cta"
							}`}>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
										Most Popular
									</div>
								</div>
							)}

							<div className="p-8">
								{/* Plan Header */}
								<div className="text-center mb-8">
									<h3 className="text-xl font-bold text-text-primary mb-2">
										{plan.name}
									</h3>
									<p className="text-sm text-text-secondary mb-6">
										{plan.description}
									</p>

									<div className="mb-4">
										<span className="text-4xl font-bold text-text-primary">
											${getPrice(plan)}
										</span>
										<span className="text-text-secondary">
											/{billingCycle === "monthly" ? "month" : "year"}
										</span>
									</div>

									{billingCycle === "annual" && (
										<div className="text-sm text-success font-medium">
											Save {getSavings(plan)}% annually
										</div>
									)}

									<div className="text-sm text-text-secondary mt-2">
										{plan.quotesIncluded} quotes included
									</div>
								</div>

								{/* Features List */}
								<div className="space-y-3 mb-8">
									{plan.features.map((feature, index) => (
										<div key={index} className="flex items-start space-x-3">
											<Icon
												name="Check"
												size={16}
												className="text-success mt-0.5 flex-shrink-0"
											/>
											<span className="text-sm text-text-secondary">
												{feature}
											</span>
										</div>
									))}
								</div>

								{/* Limitations */}
								{plan.limitations.length > 0 && (
									<div className="space-y-2 mb-8 pb-6 border-b border-border">
										{plan.limitations.map((limitation, index) => (
											<div key={index} className="flex items-start space-x-3">
												<Icon
													name="X"
													size={16}
													className="text-text-muted mt-0.5 flex-shrink-0"
												/>
												<span className="text-sm text-text-muted">
													{limitation}
												</span>
											</div>
										))}
									</div>
								)}

								{/* Additional Quote Pricing */}
								<div className="bg-surface rounded-lg p-4 mb-6">
									<div className="text-sm text-text-secondary">
										Additional quotes:{" "}
										<span className="font-medium text-text-primary">
											${plan.additionalQuoteCost} each
										</span>
									</div>
								</div>

								{/* CTA Button */}
								{plan.cta === "Start Free Trial" ? (
									<Link href="https://partner.lexprotector.com/signup">
										<Button
											variant={plan.popular ? "default" : "outline"}
											size="lg"
											className={`w-full ${
												plan.popular
													? "bg-accent hover:bg-accent/90 text-white"
													: "hover:text-white"
											}`}>
											{plan.cta}
										</Button>
									</Link>
								) : (
									<Button
										variant={plan.popular ? "default" : "outline"}
										size="lg"
										onClick={() => handlePlanSelect(key)}
										className={`w-full ${
											plan.popular
												? "bg-accent hover:bg-accent/90 text-white"
												: "hover:text-white"
										}`}>
										{plan.cta}
									</Button>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Add-ons Section */}
				<div className="mb-16">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-text-primary mb-4">
							Add-ons & Services
						</h3>
						<p className="text-text-secondary">
							Enhance your plan with additional services
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{addOns.map((addon, index) => (
							<div
								key={index}
								className="bg-white rounded-xl p-6 border border-border hover:shadow-cta transition-all duration-200">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
									<Icon
										name={addon.icon as keyof typeof import("lucide-react")}
										size={24}
										className="text-primary"
									/>
								</div>
								<h4 className="font-semibold text-text-primary mb-2">
									{addon.name}
								</h4>
								<p className="text-sm text-text-secondary mb-3">
									{addon.description}
								</p>
								<div className="text-sm font-medium text-accent">
									{addon.price}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* FAQ Section */}
				<div className="bg-surface rounded-2xl p-8">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-text-primary mb-4">
							Pricing FAQ
						</h3>
						<p className="text-text-secondary">
							Common questions about our pricing
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{faqItems.map((faq, index) => (
							<div
								key={index}
								className="bg-white rounded-lg p-6 border border-border">
								<h4 className="font-semibold text-text-primary mb-3">
									{faq.question}
								</h4>
								<p className="text-sm text-text-secondary">{faq.answer}</p>
							</div>
						))}
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-16">
					<div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
						<h3 className="text-2xl font-bold text-text-primary mb-4">
							Ready to Transform Your Practice?
						</h3>
						<p className="text-text-secondary mb-6 max-w-2xl mx-auto">
							Join 500+ law firms already using Lex Protector to generate
							faster, more accurate quotes and increase their revenue.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="https://partner.lexprotector.com/signup">
								<Button
									variant="default"
									size="lg"
									className="bg-primary hover:bg-blue-900 text-white"
									onClick={() => handlePlanSelect("professional")}>
									<Icon name="Play" size={16} className="mr-2" />
									Start 14-Day Free Trial
								</Button>
							</Link>
							<Button
								variant="outline"
								size="lg"
								className={`hover:bg-primary hover:text-white`}
								onClick={handleScheduleDemo}>
								<Icon name="Calendar" size={16} className="mr-2" />
								Schedule Demo
							</Button>
						</div>
						<p className="text-xs text-text-muted mt-4">
							No credit card required • Cancel anytime • Full feature access
						</p>
					</div>
				</div>

				{/* Demo Modal */}
				<Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
					<ModalContent size="xl" className={`mt-8 max-w-[22rem] rounded-lg md:max-w-2xl`}>
						<ModalHeader className="sr-only">
							<ModalTitle>Schedule Demo</ModalTitle>
							<ModalDescription>Book a demo with our team</ModalDescription>
						</ModalHeader>
						<CalendlyScheduler
							calendlyUrl="https://calendly.com/lexprotectortech"
							eventType="30min"
							title="Schedule Your Demo"
							description="Book a personalized demo with our team to see how Lex Protector can transform your legal practice."
							buttonText="Schedule Demo"
							widgetHeight="700px"
						/>
					</ModalContent>
				</Modal>
			</div>
		</section>
	);
};

export default PricingSection;

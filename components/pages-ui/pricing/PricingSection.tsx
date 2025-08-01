"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import Link from "next/link";
import useIPLocation from "@/hooks/useIPLocation";
import { VersatileCalendlyScheduler } from "@/components/scheduling";
import { LocationBasedPricing } from "./LocationBasedPricing";

// using IP address to detect location, if it's India, show INR prices and if other countries, show USD prices

const PricingSection = () => {
	const [billingCycle, setBillingCycle] = useState("monthly");
	const [selectedPlan, setSelectedPlan] = useState("professional");
	const [showCalendlyScheduler, setShowCalendlyScheduler] = useState(false);
	const calendlyRef = useRef<HTMLDivElement>(null);
	const { shouldShowINR, location } = useIPLocation();

	// Debug log for pricing section
	useEffect(() => {
		console.log("PricingSection: Location state updated", {
			shouldShowINR,
			location,
			currentCycle: billingCycle,
		});
	}, [shouldShowINR, location, billingCycle]);

	const plans = {
		starter: {
			name: "Starter",
			description: "Perfect for solo practitioners and small firms",
			monthlyPrice: 99,
			monthlyPriceINR: 7999, // Manual INR price
			annualPrice: 990,
			annualPriceINR: 79990, // Manual INR price
			quotesIncluded: 25,
			additionalQuoteCost: 15,
			additionalQuoteCostINR: 1299, // Manual INR price
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
			monthlyPriceINR: 14999,
			annualPrice: 1990,
			annualPriceINR: 149990, // Manual INR price
			quotesIncluded: 75,
			additionalQuoteCost: 20,
			additionalQuoteCostINR: 1599,
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
			monthlyPriceINR: 29999,
			annualPrice: 3990,
			annualPriceINR: 299990, // Manual INR price
			quotesIncluded: 200,
			additionalQuoteCost: 35,
			additionalQuoteCostINR: 2999,
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

	interface AddOn {
		name: string;
		description: string;
		price: string;
		priceAmount: number;
		priceAmountINR: number;
		priceSuffix?: string;
		pricePrefix?: string;
		icon: keyof typeof import("lucide-react");
		hasSmartPricing: boolean;
	}

	const addOns: AddOn[] = [
		{
			name: "Additional Quotes",
			description: "Extra quotes beyond your plan limit",
			price: "From $10-15 per quote",
			priceAmount: 12, // Use middle price for conversion
			priceAmountINR: 999, // Manual INR price
			priceSuffix: " per quote",
			icon: "Plus",
			hasSmartPricing: true,
		},
		{
			name: "Custom Solutions",
			description: "Tailored features for your firm",
			price: "Starting at $500",
			priceAmount: 500, // Use middle price for conversion
			priceAmountINR: 39999, // Manual INR price
			pricePrefix: "Starting at ",
			icon: "Link",
			hasSmartPricing: true,
		},
		{
			name: "Training & Onboarding",
			description: "Dedicated training for your team",
			price: "$200 per session",
			priceAmount: 200,
			priceAmountINR: 15999,
			priceSuffix: " per session",
			icon: "GraduationCap",
			hasSmartPricing: true,
		},
		{
			name: "Priority Support",
			description: "24/7 phone and email support",
			price: "$99 per month",
			priceAmount: 99,
			priceAmountINR: 7999,
			priceSuffix: " per month",
			icon: "Headphones",
			hasSmartPricing: true,
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
		return {
			usd: billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice,
			inr:
				billingCycle === "monthly" ? plan.monthlyPriceINR : plan.annualPriceINR,
		};
	};

	const getSavings = (plan: typeof plans.starter) => {
		// Calculate USD savings
		const monthlyUSDCost = plan.monthlyPrice * 12;
		const annualUSDCost = plan.annualPrice;
		const usdSavings = Math.round(
			((monthlyUSDCost - annualUSDCost) / monthlyUSDCost) * 100
		);

		// Calculate INR savings
		const monthlyINRCost = plan.monthlyPriceINR * 12;
		const annualINRCost = plan.annualPriceINR;
		const inrSavings = Math.round(
			((monthlyINRCost - annualINRCost) / monthlyINRCost) * 100
		);

		return {
			// usd: usdSavings,
			// inr: inrSavings,
			usd: 20, // Fixed 20% savings for annual plans
			inr: 20, // Fixed 20% savings for annual plans
		};
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
		setShowCalendlyScheduler(true);
		// Small delay to ensure the component is rendered before scrolling
		setTimeout(() => {
			if (calendlyRef.current) {
				calendlyRef.current.scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "nearest",
				});
			}
		}, 100);
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
									? "bg-white dark:bg-primary/70 text-primary dark:text-white shadow-sm"
									: "text-text-secondary hover:text-primary"
							}`}>
							Monthly
						</button>
						<button
							onClick={() => setBillingCycle("annual")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
								billingCycle === "annual"
									? "bg-white dark:bg-primary/70 text-primary dark:text-white shadow-sm"
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
							className={`relative bg-white dark:bg-white/10 rounded-2xl border-2 transition-all duration-200 ${
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
											<LocationBasedPricing
												priceUSD={getPrice(plan).usd}
												priceINR={getPrice(plan).inr}
											/>
										</span>
										<span className="text-text-secondary">
											/{billingCycle === "monthly" ? "month" : "year"}
										</span>
									</div>

									{billingCycle === "annual" && (
										<div className="text-sm text-success font-medium">
											{shouldShowINR
												? `Save ${getSavings(plan).inr}% annually`
												: `Save ${getSavings(plan).usd}% annually`}
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
											<LocationBasedPricing
												priceUSD={plan.additionalQuoteCost}
												priceINR={plan.additionalQuoteCostINR}
											/>{" "}
											each
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
						{addOns.map((addon: AddOn, index: number) => (
							<div
								key={index}
								className="bg-white dark:bg-white/10 rounded-xl p-6 border border-border hover:shadow-cta transition-all duration-200">
								<div className="w-12 h-12 bg-primary/10 dark:bg-primary/30 border border-border rounded-lg flex items-center justify-center mb-4">
									<Icon
										name={addon.icon}
										size={24}
										className="text-primary dark:text-white"
									/>
								</div>
								<h4 className="font-semibold text-text-primary mb-2">
									{addon.name}
								</h4>
								<p className="text-sm text-text-secondary mb-3">
									{addon.description}
								</p>
								<div className="text-sm font-medium text-accent">
									{addon.hasSmartPricing && addon.priceAmount ? (
										<>
											{addon.pricePrefix ? addon.pricePrefix : ""}
											<LocationBasedPricing
												priceUSD={addon.priceAmount}
												priceINR={addon.priceAmountINR}
											/>
											{addon.priceSuffix ? addon.priceSuffix : ""}
										</>
									) : (
										addon.price
									)}
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
								className="bg-white dark:bg-white/10 rounded-lg p-6 border border-border">
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
							Join 100+ law firms already using Lex Protector to generate
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

				{/* Calendly Scheduler Section */}
				{showCalendlyScheduler && (
					<div ref={calendlyRef} className="mt-16 fade-in">
						<div className="mb-8 text-center">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
								Schedule Your Demo
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Book a personalized demo to see how Lex Protector can transform
								your practice
							</p>
						</div>
						<VersatileCalendlyScheduler
							calendlyUrl="https://calendly.com/lexprotector-int"
							eventType="30min"
							mode="inline"
							autoLoadScript={true}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default PricingSection;

"use client";

import React from "react";
import SmartPrice from "@/components/ui/smart-price";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/icon/AppIcon";

/**
 * Example of integrating SmartPrice into an existing pricing section
 * This shows how to replace static prices with smart conversion
 */
export const SmartPricingSection = () => {
	const plans = [
		{
			id: "starter",
			name: "Starter",
			description: "Perfect for solo practitioners",
			monthlyPrice: 99,
			annualPrice: 990,
			quotesIncluded: 25,
			popular: false,
			features: [
				"Up to 25 quotes per month",
				"100+ country coverage",
				"Basic white-label branding",
				"Email support",
				"Standard templates",
			],
		},
		{
			id: "professional",
			name: "Professional",
			description: "Ideal for growing firms",
			monthlyPrice: 199,
			annualPrice: 1990,
			quotesIncluded: 75,
			popular: true,
			features: [
				"Up to 75 quotes per month",
				"Full white-label customization",
				"Priority support",
				"Custom templates",
				"Advanced analytics",
			],
		},
		{
			id: "enterprise",
			name: "Enterprise",
			description: "For established firms",
			monthlyPrice: 399,
			annualPrice: 3990,
			quotesIncluded: 200,
			popular: false,
			features: [
				"Up to 200 quotes per month",
				"Complete solution",
				"Dedicated support",
				"Custom solutions",
				"Multi-user access",
			],
		},
	];

	const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">(
		"monthly"
	);

	return (
		<section className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="DollarSign" size={16} />
						<span>Smart Pricing</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
						Transparent Pricing with{" "}
						<span className="text-primary">Smart Currency Conversion</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
						Prices automatically convert to your local currency. All plans
						include automatic IP-based location detection and real-time exchange
						rates.
					</p>

					{/* Billing Toggle */}
					<div className="inline-flex items-center bg-muted rounded-lg p-1">
						<button
							onClick={() => setBillingCycle("monthly")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								billingCycle === "monthly"
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}>
							Monthly
						</button>
						<button
							onClick={() => setBillingCycle("annual")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								billingCycle === "annual"
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}>
							Annual
							<span className="ml-1 text-xs text-green-600 font-semibold">
								Save 17%
							</span>
						</button>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="grid lg:grid-cols-3 gap-8 mb-16">
					{plans.map((plan) => (
						<Card
							key={plan.id}
							className={`relative ${
								plan.popular
									? "border-primary shadow-lg scale-105"
									: "border-border hover:border-primary/50"
							} transition-all duration-200`}>
							{plan.popular && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
										Most Popular
									</span>
								</div>
							)}

							<CardHeader className="text-center pb-6">
								<CardTitle className="text-xl font-semibold">
									{plan.name}
								</CardTitle>
								<p className="text-muted-foreground text-sm">
									{plan.description}
								</p>

								{/* Smart Price Display */}
								<div className="py-6">
									<div className="flex items-baseline justify-center gap-1">
										<SmartPrice
											amount={
												billingCycle === "monthly"
													? plan.monthlyPrice
													: plan.annualPrice
											}
											variant="large"
											showCurrencySelector={plan.popular} // Only show selector on popular plan
											showRoundingControls={plan.popular} // Only show controls on popular plan
											className="text-3xl font-bold"
										/>
										<span className="text-muted-foreground text-sm">
											/{billingCycle === "monthly" ? "month" : "year"}
										</span>
									</div>
									{billingCycle === "annual" && (
										<p className="text-sm text-green-600 mt-2">
											<SmartPrice
												amount={plan.monthlyPrice}
												variant="compact"
												showCurrencySelector={false}
												showLocationIndicator={false}
												prefix="Save "
												suffix="/month"
											/>
										</p>
									)}
								</div>

								<div className="text-center">
									<p className="text-sm text-muted-foreground">
										{plan.quotesIncluded} quotes included
									</p>
									<p className="text-xs text-muted-foreground">
										Additional quotes:{" "}
										<SmartPrice
											amount={
												plan.id === "starter"
													? 15
													: plan.id === "professional"
													? 12
													: 10
											}
											variant="compact"
											showCurrencySelector={false}
											showLocationIndicator={false}
											suffix=" each"
										/>
									</p>
								</div>
							</CardHeader>

							<CardContent className="space-y-6">
								{/* Features */}
								<div className="space-y-3">
									{plan.features.map((feature, index) => (
										<div key={index} className="flex items-start gap-3">
											<Icon
												name="Check"
												size={16}
												className="text-green-500 mt-0.5 flex-shrink-0"
											/>
											<span className="text-sm text-muted-foreground">
												{feature}
											</span>
										</div>
									))}
								</div>

								{/* CTA Button */}
								<Button
									className={`w-full ${
										plan.popular
											? "bg-primary hover:bg-primary/90"
											: "bg-secondary hover:bg-secondary/90"
									}`}
									size="lg">
									Get Started
									<Icon name="ArrowRight" size={16} className="ml-2" />
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Additional Services */}
				<div className="text-center">
					<h3 className="text-xl font-semibold mb-6">Additional Services</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<div className="text-center">
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
								<Icon name="Users" size={24} className="text-primary" />
							</div>
							<h4 className="font-medium mb-1">Training Sessions</h4>
							<SmartPrice
								amount={200}
								prefix="Starting at "
								suffix="/session"
								variant="inline"
								showCurrencySelector={false}
								className="text-primary font-medium"
							/>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
								<Icon name="Cog" size={24} className="text-primary" />
							</div>
							<h4 className="font-medium mb-1">Custom Integration</h4>
							<SmartPrice
								amount={500}
								prefix="Starting at "
								variant="inline"
								showCurrencySelector={false}
								className="text-primary font-medium"
							/>
						</div>
						<div className="text-center">
							<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
								<Icon name="Headphones" size={24} className="text-primary" />
							</div>
							<h4 className="font-medium mb-1">Priority Support</h4>
							<SmartPrice
								amount={99}
								prefix="Starting at "
								suffix="/month"
								variant="inline"
								showCurrencySelector={false}
								className="text-primary font-medium"
							/>
						</div>
					</div>
				</div>

				{/* Note about currency conversion */}
				<div className="mt-12 text-center">
					<div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
						<Icon name="Globe" size={16} />
						<span>
							Prices shown in your local currency. Billing in USD. Exchange
							rates updated daily.
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SmartPricingSection;

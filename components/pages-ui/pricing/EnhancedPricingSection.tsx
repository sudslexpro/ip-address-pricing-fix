"use client";

import React, { useState } from "react";
import EnhancedSmartPrice from "@/components/ui/enhanced-smart-price";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icon/AppIcon";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

/**
 * Enhanced Pricing Section with Browser Geolocation API
 *
 * Features:
 * - Browser Geolocation API for high-precision location detection
 * - GPS-level accuracy for currency detection
 * - IP-based fallback for maximum compatibility
 * - User permission management
 * - Real-time currency conversion
 * - Location accuracy indicators
 */
export const EnhancedPricingSection = () => {
	const [enableGeolocation, setEnableGeolocation] = useState(true);
	const [showPermissionPrompts, setShowPermissionPrompts] = useState(true);
	const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
		"monthly"
	);

	const plans = [
		{
			id: "starter",
			name: "Starter",
			description: "Perfect for solo practitioners",
			monthlyPrice: 99,
			annualPrice: 990,
			quotesIncluded: 25,
			additionalQuoteCost: 15,
			popular: false,
			features: [
				"Up to 25 quotes per month",
				"100+ country coverage",
				"Basic white-label branding",
				"Email support",
				"Standard templates",
				"IP-based location detection",
			],
			badge: "IP Detection",
			badgeColor: "secondary" as const,
		},
		{
			id: "professional",
			name: "Professional",
			description: "Ideal for growing firms",
			monthlyPrice: 199,
			annualPrice: 1990,
			quotesIncluded: 75,
			additionalQuoteCost: 12,
			popular: true,
			features: [
				"Up to 75 quotes per month",
				"Full white-label customization",
				"Priority support",
				"Custom templates",
				"Advanced analytics",
				"High-precision GPS detection",
				"VPN-proof location detection",
			],
			badge: "GPS + IP",
			badgeColor: "default" as const,
		},
		{
			id: "enterprise",
			name: "Enterprise",
			description: "For established firms",
			monthlyPrice: 399,
			annualPrice: 3990,
			quotesIncluded: 200,
			additionalQuoteCost: 10,
			popular: false,
			features: [
				"Up to 200 quotes per month",
				"Complete solution",
				"Dedicated support",
				"Custom solutions",
				"Multi-user access",
				"Premium GPS accuracy",
				"Real-time location updates",
			],
			badge: "GPS Only",
			badgeColor: "destructive" as const,
		},
	];

	return (
		<section className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="MapPin" size={16} />
						<span>Enhanced Geolocation</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
						Precision Pricing with{" "}
						<span className="text-primary">Browser Geolocation API</span>
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
						Experience the most accurate currency detection using GPS-level
						precision. Automatically switches between browser geolocation and IP
						detection for optimal accuracy.
					</p>

					{/* Controls */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
						<div className="flex items-center space-x-2">
							<Switch
								id="geolocation-toggle"
								checked={enableGeolocation}
								onCheckedChange={setEnableGeolocation}
							/>
							<Label htmlFor="geolocation-toggle" className="text-sm">
								Enable Browser Geolocation
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Switch
								id="permission-toggle"
								checked={showPermissionPrompts}
								onCheckedChange={setShowPermissionPrompts}
							/>
							<Label htmlFor="permission-toggle" className="text-sm">
								Show Permission Prompts
							</Label>
						</div>
					</div>

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
									<span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
										Most Popular
									</span>
								</div>
							)}

							<CardHeader className="text-center pb-6">
								<div className="flex items-center justify-center gap-2 mb-2">
									<CardTitle className="text-xl">{plan.name}</CardTitle>
									<Badge variant={plan.badgeColor} className="text-xs">
										{plan.badge}
									</Badge>
								</div>
								<p className="text-muted-foreground text-sm mb-6">
									{plan.description}
								</p>

								{/* Enhanced Smart Price Display */}
								<div className="py-6">
									<div className="flex items-baseline justify-center gap-1">
										<EnhancedSmartPrice
											amount={
												billingCycle === "monthly"
													? plan.monthlyPrice
													: plan.annualPrice
											}
											variant="large"
											preferBrowserGeolocation={
												enableGeolocation && plan.id !== "starter"
											}
											fallbackToIP={plan.id !== "enterprise"}
											showPermissionPrompt={
												showPermissionPrompts && plan.id !== "starter"
											}
											showLocationIndicator={true}
											showCurrencySelector={plan.popular}
											showRoundingControls={plan.popular}
											className="text-3xl font-bold"
										/>
										<span className="text-muted-foreground text-sm">
											/{billingCycle === "monthly" ? "month" : "year"}
										</span>
									</div>
									{billingCycle === "annual" && (
										<p className="text-sm text-green-600 mt-2">
											<EnhancedSmartPrice
												amount={plan.monthlyPrice}
												variant="compact"
												preferBrowserGeolocation={
													enableGeolocation && plan.id !== "starter"
												}
												fallbackToIP={plan.id !== "enterprise"}
												showPermissionPrompt={false}
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
										<EnhancedSmartPrice
											amount={plan.additionalQuoteCost}
											variant="compact"
											preferBrowserGeolocation={
												enableGeolocation && plan.id !== "starter"
											}
											fallbackToIP={plan.id !== "enterprise"}
											showPermissionPrompt={false}
											showCurrencySelector={false}
											showLocationIndicator={false}
											suffix=" each"
										/>
									</p>
								</div>
							</CardHeader>

							<CardContent className="space-y-4">
								{/* Features List */}
								<ul className="space-y-3">
									{plan.features.map((feature, index) => (
										<li key={index} className="flex items-start gap-3">
											<Icon
												name="Check"
												size={16}
												className="text-green-600 mt-0.5 flex-shrink-0"
											/>
											<span className="text-sm text-muted-foreground">
												{feature}
											</span>
										</li>
									))}
								</ul>

								{/* CTA Button */}
								<Button
									className={`w-full mt-6 ${
										plan.popular
											? "bg-primary text-primary-foreground hover:bg-primary/90"
											: ""
									}`}
									variant={plan.popular ? "default" : "outline"}>
									{plan.id === "enterprise"
										? "Contact Sales"
										: "Start Free Trial"}
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Location Detection Features */}
				<div className="mb-16">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-foreground mb-4">
							Location Detection Methods
						</h3>
						<p className="text-muted-foreground">
							Different plans use different detection methods for optimal
							accuracy
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						<Card className="text-center">
							<CardHeader>
								<Icon
									name="Wifi"
									size={32}
									className="mx-auto text-muted-foreground mb-2"
								/>
								<CardTitle className="text-lg">IP Detection</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Fast, anonymous detection using IP address. Works immediately
									without permissions.
								</p>
								<ul className="text-xs space-y-1 text-left">
									<li>✓ No permissions required</li>
									<li>✓ Instant detection</li>
									<li>✓ Privacy-friendly</li>
									<li>🟡 Medium accuracy</li>
									<li>🟡 Affected by VPN</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="text-center border-primary">
							<CardHeader>
								<Icon
									name="MapPin"
									size={32}
									className="mx-auto text-primary mb-2"
								/>
								<CardTitle className="text-lg">GPS + IP Hybrid</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									High-precision GPS detection with IP fallback for best of both
									worlds.
								</p>
								<ul className="text-xs space-y-1 text-left">
									<li>✓ GPS-level accuracy</li>
									<li>✓ VPN-proof detection</li>
									<li>✓ Smart fallback</li>
									<li>✓ User controlled</li>
									<li>🟡 Permission required</li>
								</ul>
							</CardContent>
						</Card>

						<Card className="text-center">
							<CardHeader>
								<Icon
									name="Navigation"
									size={32}
									className="mx-auto text-green-600 mb-2"
								/>
								<CardTitle className="text-lg">GPS Only</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground mb-4">
									Maximum precision using only browser geolocation for
									enterprise needs.
								</p>
								<ul className="text-xs space-y-1 text-left">
									<li>✓ Highest accuracy</li>
									<li>✓ Real location always</li>
									<li>✓ Enterprise grade</li>
									<li>✓ No compromises</li>
									<li>🟡 Requires permission</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Enhanced Features Note */}
				<div className="text-center">
					<div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-6 py-3 rounded-lg">
						<Icon name="Zap" size={16} />
						<span>
							Enhanced pricing automatically detects your precise location using
							GPS technology for the most accurate currency conversion possible.
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EnhancedPricingSection;

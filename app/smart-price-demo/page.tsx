import React from "react";
import SmartPrice from "@/components/ui/smart-price";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function SmartPriceDemoPage() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto py-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-foreground mb-4">
							SmartPrice Component Demo
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							A versatile price component with automatic IP-based currency
							detection, real-time conversion, and manual rounding controls.
						</p>
					</div>

					<div className="grid gap-6">
						{/* Basic Usage */}
						<Card>
							<CardHeader>
								<CardTitle>Basic Usage</CardTitle>
								<CardDescription>
									Simple price display with automatic currency conversion
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-4">
									<span>Basic Package:</span>
									<SmartPrice amount={299} />
								</div>
								<div className="flex items-center gap-4">
									<span>Professional Package:</span>
									<SmartPrice
										amount={599}
										prefix="Starting at "
										suffix="/month"
									/>
								</div>
								<div className="flex items-center gap-4">
									<span>Enterprise Package:</span>
									<SmartPrice amount={999} prefix="From " suffix=" annually" />
								</div>
							</CardContent>
						</Card>

						{/* Different Variants */}
						<Card>
							<CardHeader>
								<CardTitle>Display Variants</CardTitle>
								<CardDescription>
									Different visual styles for various use cases
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Compact */}
								<div>
									<h4 className="font-medium mb-2">Compact Variant</h4>
									<p className="text-sm text-muted-foreground mb-2">
										Perfect for inline text or tight spaces
									</p>
									<div className="space-y-2">
										<p>
											Our starter plan is just{" "}
											<SmartPrice
												amount={199}
												variant="compact"
												showCurrencySelector={false}
											/>{" "}
											per month.
										</p>
										<p>
											Premium features start at{" "}
											<SmartPrice
												amount={399}
												variant="compact"
												showCurrencySelector={false}
											/>{" "}
											monthly.
										</p>
									</div>
								</div>

								{/* Inline */}
								<div>
									<h4 className="font-medium mb-2">Inline Variant (Default)</h4>
									<p className="text-sm text-muted-foreground mb-2">
										Standard display with controls
									</p>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span>Monthly Subscription</span>
											<SmartPrice amount={299} showRoundingControls={true} />
										</div>
										<div className="flex items-center justify-between">
											<span>Annual Subscription</span>
											<SmartPrice amount={2990} showRoundingControls={true} />
										</div>
									</div>
								</div>

								{/* Block */}
								<div>
									<h4 className="font-medium mb-2">Block Variant</h4>
									<p className="text-sm text-muted-foreground mb-2">
										Full-width layout with controls on the side
									</p>
									<SmartPrice
										amount={599}
										variant="block"
										prefix="Premium Plan: "
										suffix="/month"
										showRoundingControls={true}
									/>
								</div>

								{/* Large */}
								<div>
									<h4 className="font-medium mb-2">Large Variant</h4>
									<p className="text-sm text-muted-foreground mb-2">
										Prominent display for hero sections or key prices
									</p>
									<SmartPrice
										amount={999}
										variant="large"
										prefix="Enterprise: "
										suffix="/month"
										showRoundingControls={true}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Pricing Tables Example */}
						<Card>
							<CardHeader>
								<CardTitle>Pricing Table Example</CardTitle>
								<CardDescription>
									Real-world usage in pricing tables
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									{/* Basic Plan */}
									<div className="border rounded-lg p-6 text-center space-y-4">
										<h3 className="text-lg font-semibold">Basic</h3>
										<div className="space-y-1">
											<SmartPrice
												amount={299}
												variant="large"
												showCurrencySelector={false}
												showRoundingControls={false}
											/>
											<p className="text-sm text-muted-foreground">per month</p>
										</div>
										<ul className="text-sm space-y-2 text-left">
											<li>✓ Up to 25 quotes/month</li>
											<li>✓ Basic white-label</li>
											<li>✓ Email support</li>
											<li>✓ Standard templates</li>
										</ul>
									</div>

									{/* Professional Plan */}
									<div className="border-2 border-primary rounded-lg p-6 text-center space-y-4 relative">
										<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
											<span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
												Most Popular
											</span>
										</div>
										<h3 className="text-lg font-semibold">Professional</h3>
										<div className="space-y-1">
											<SmartPrice
												amount={599}
												variant="large"
												showCurrencySelector={false}
												showRoundingControls={false}
											/>
											<p className="text-sm text-muted-foreground">per month</p>
										</div>
										<ul className="text-sm space-y-2 text-left">
											<li>✓ Up to 75 quotes/month</li>
											<li>✓ Full white-label customization</li>
											<li>✓ Priority support</li>
											<li>✓ Custom templates</li>
											<li>✓ Analytics & reporting</li>
										</ul>
									</div>

									{/* Enterprise Plan */}
									<div className="border rounded-lg p-6 text-center space-y-4">
										<h3 className="text-lg font-semibold">Enterprise</h3>
										<div className="space-y-1">
											<SmartPrice
												amount={999}
												variant="large"
												showCurrencySelector={false}
												showRoundingControls={false}
											/>
											<p className="text-sm text-muted-foreground">per month</p>
										</div>
										<ul className="text-sm space-y-2 text-left">
											<li>✓ Up to 200 quotes/month</li>
											<li>✓ Complete solution</li>
											<li>✓ Dedicated support</li>
											<li>✓ Custom solutions</li>
											<li>✓ Advanced analytics</li>
											<li>✓ Multi-user access</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Advanced Features */}
						<Card>
							<CardHeader>
								<CardTitle>Advanced Features</CardTitle>
								<CardDescription>
									Manual rounding controls and location detection
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h4 className="font-medium mb-2">
										With Manual Rounding Controls
									</h4>
									<SmartPrice
										amount={1249.99}
										prefix="Advanced Package: "
										suffix="/year"
										showRoundingControls={true}
										variant="block"
									/>
								</div>

								<div>
									<h4 className="font-medium mb-2">All Controls Enabled</h4>
									<SmartPrice
										amount={2499.5}
										prefix="Enterprise Suite: "
										suffix="/year"
										showCurrencySelector={true}
										showRoundingControls={true}
										showLocationIndicator={true}
										variant="block"
									/>
								</div>

								<div>
									<h4 className="font-medium mb-2">
										Minimal Display (No Controls)
									</h4>
									<div className="space-y-2">
										<p>
											Basic service fee:{" "}
											<SmartPrice
												amount={99}
												showCurrencySelector={false}
												showLocationIndicator={false}
											/>
										</p>
										<p>
											Setup fee:{" "}
											<SmartPrice
												amount={199}
												showCurrencySelector={false}
												showLocationIndicator={false}
											/>
										</p>
										<p>
											Monthly maintenance:{" "}
											<SmartPrice
												amount={49}
												showCurrencySelector={false}
												showLocationIndicator={false}
											/>
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Integration Notes */}
						<Card>
							<CardHeader>
								<CardTitle>How It Works</CardTitle>
								<CardDescription>
									Automatic currency detection and conversion process
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-medium mb-2">🌍 IP-Based Detection</h4>
										<p className="text-sm text-muted-foreground">
											Automatically detects visitor's location using their IP
											address and suggests the appropriate local currency.
										</p>
									</div>
									<div>
										<h4 className="font-medium mb-2">
											💱 Real-Time Conversion
										</h4>
										<p className="text-sm text-muted-foreground">
											Fetches current exchange rates and converts USD prices to
											the visitor's local currency in real-time.
										</p>
									</div>
									<div>
										<h4 className="font-medium mb-2">🎛️ Manual Override</h4>
										<p className="text-sm text-muted-foreground">
											Users can manually select their preferred currency and
											customize rounding options for cleaner prices.
										</p>
									</div>
									<div>
										<h4 className="font-medium mb-2">⚡ Lightweight</h4>
										<p className="text-sm text-muted-foreground">
											Single component with minimal dependencies. Uses existing
											hooks and APIs in your application.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

import React from "react";
import EnhancedSmartPrice from "@/components/ui/enhanced-smart-price";
import SmartPrice from "@/components/ui/smart-price";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GeolocationPricingDemoPage() {
	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto py-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-foreground mb-4">
							Geolocation Pricing Demo
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Compare IP-based vs Browser Geolocation for currency detection.
							Browser geolocation provides higher accuracy but requires user
							permission.
						</p>
					</div>

					<div className="grid gap-6">
						{/* Comparison */}
						<Card>
							<CardHeader>
								<CardTitle>IP vs Browser Geolocation Comparison</CardTitle>
								<CardDescription>
									See the difference between detection methods
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* IP-based Detection */}
									<div className="space-y-4 p-4 border rounded-lg">
										<div className="flex items-center justify-between">
											<h3 className="font-medium">IP-based Detection</h3>
											<Badge variant="secondary">No Permission Required</Badge>
										</div>
										<p className="text-sm text-muted-foreground">
											Automatically detects location from IP address. Works
											immediately but less accurate.
										</p>
										<div className="space-y-3">
											<div className="flex justify-between items-center">
												<span>Basic Package:</span>
												<SmartPrice
													amount={299}
													showLocationIndicator={true}
													showRoundingControls={false}
												/>
											</div>
											<div className="flex justify-between items-center">
												<span>Pro Package:</span>
												<SmartPrice
													amount={599}
													showLocationIndicator={true}
													showRoundingControls={false}
												/>
											</div>
										</div>
									</div>

									{/* Browser Geolocation */}
									<div className="space-y-4 p-4 border-2 border-primary rounded-lg">
										<div className="flex items-center justify-between">
											<h3 className="font-medium">Browser Geolocation</h3>
											<Badge>High Accuracy</Badge>
										</div>
										<p className="text-sm text-muted-foreground">
											Uses GPS/network data for precise location. Requires user
											permission but very accurate.
										</p>
										<div className="space-y-3">
											<div className="flex justify-between items-center">
												<span>Basic Package:</span>
												<EnhancedSmartPrice
													amount={299}
													preferBrowserGeolocation={true}
													showPermissionPrompt={true}
													showLocationIndicator={true}
													showRoundingControls={false}
												/>
											</div>
											<div className="flex justify-between items-center">
												<span>Pro Package:</span>
												<EnhancedSmartPrice
													amount={599}
													preferBrowserGeolocation={true}
													showPermissionPrompt={true}
													showLocationIndicator={true}
													showRoundingControls={false}
												/>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Enhanced Features */}
						<Card>
							<CardHeader>
								<CardTitle>Enhanced Geolocation Features</CardTitle>
								<CardDescription>
									Browser geolocation with fallback options and permission
									management
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Prefer Browser with IP Fallback */}
								<div>
									<h4 className="font-medium mb-3">
										Browser Geolocation with IP Fallback
									</h4>
									<p className="text-sm text-muted-foreground mb-4">
										Attempts browser geolocation first, falls back to IP if
										denied or unavailable.
									</p>
									<EnhancedSmartPrice
										amount={999}
										variant="large"
										preferBrowserGeolocation={true}
										fallbackToIP={true}
										showPermissionPrompt={true}
										showRoundingControls={true}
										prefix="Enterprise: "
										suffix="/month"
									/>
								</div>

								{/* Browser Only (No Fallback) */}
								<div>
									<h4 className="font-medium mb-3">Browser Geolocation Only</h4>
									<p className="text-sm text-muted-foreground mb-4">
										Only uses browser geolocation, shows error if permission
										denied.
									</p>
									<EnhancedSmartPrice
										amount={1499}
										variant="block"
										preferBrowserGeolocation={true}
										fallbackToIP={false}
										showPermissionPrompt={true}
										showRoundingControls={true}
										prefix="Premium Enterprise: "
										suffix="/month"
									/>
								</div>
							</CardContent>
						</Card>

						{/* Pricing Table with Mixed Methods */}
						<Card>
							<CardHeader>
								<CardTitle>Mixed Detection Methods</CardTitle>
								<CardDescription>
									Different detection methods for different price points
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									{/* Basic - IP Only */}
									<div className="border rounded-lg p-6 text-center space-y-4">
										<div className="flex items-center justify-center gap-2 mb-2">
											<h3 className="text-lg font-semibold">Basic</h3>
											<Badge variant="outline" className="text-xs">
												IP
											</Badge>
										</div>
										<div className="space-y-1">
											<SmartPrice
												amount={299}
												variant="large"
												showCurrencySelector={false}
												showLocationIndicator={true}
											/>
											<p className="text-sm text-muted-foreground">per month</p>
										</div>
										<ul className="text-sm space-y-2 text-left">
											<li>✓ Up to 25 quotes/month</li>
											<li>✓ Basic white-label</li>
											<li>✓ Email support</li>
											<li>✓ IP-based currency detection</li>
										</ul>
									</div>

									{/* Professional - Browser with Fallback */}
									<div className="border-2 border-primary rounded-lg p-6 text-center space-y-4 relative">
										<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
											<span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
												Most Popular
											</span>
										</div>
										<div className="flex items-center justify-center gap-2 mb-2">
											<h3 className="text-lg font-semibold">Professional</h3>
											<Badge className="text-xs">GPS + IP</Badge>
										</div>
										<div className="space-y-1">
											<EnhancedSmartPrice
												amount={599}
												variant="large"
												preferBrowserGeolocation={true}
												fallbackToIP={true}
												showPermissionPrompt={true}
												showCurrencySelector={false}
												showLocationIndicator={true}
											/>
											<p className="text-sm text-muted-foreground">per month</p>
										</div>
										<ul className="text-sm space-y-2 text-left">
											<li>✓ Up to 75 quotes/month</li>
											<li>✓ Full white-label</li>
											<li>✓ Priority support</li>
											<li>✓ Precise GPS currency detection</li>
											<li>✓ IP fallback included</li>
										</ul>
									</div>

									{/* Enterprise - Browser Only */}
									<div className="border rounded-lg p-6 text-center space-y-4">
										<div className="flex items-center justify-center gap-2 mb-2">
											<h3 className="text-lg font-semibold">Enterprise</h3>
											<Badge variant="destructive" className="text-xs">
												GPS Only
											</Badge>
										</div>
										<div className="space-y-1">
											<EnhancedSmartPrice
												amount={999}
												variant="large"
												preferBrowserGeolocation={true}
												fallbackToIP={false}
												showPermissionPrompt={true}
												showCurrencySelector={false}
												showLocationIndicator={true}
											/>
											<p className="text-sm text-muted-foreground">per month</p>
										</div>
										<ul className="text-sm space-y-2 text-left">
											<li>✓ Up to 200 quotes/month</li>
											<li>✓ Complete solution</li>
											<li>✓ Dedicated support</li>
											<li>✓ High-precision GPS detection</li>
											<li>✓ No compromises on accuracy</li>
										</ul>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Feature Comparison */}
						<Card>
							<CardHeader>
								<CardTitle>Detection Method Comparison</CardTitle>
								<CardDescription>
									Understanding the differences between detection methods
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="overflow-x-auto">
									<table className="w-full text-sm">
										<thead>
											<tr className="border-b">
												<th className="text-left p-2">Feature</th>
												<th className="text-center p-2">IP Detection</th>
												<th className="text-center p-2">Browser Geolocation</th>
											</tr>
										</thead>
										<tbody className="space-y-2">
											<tr className="border-b">
												<td className="p-2 font-medium">Permission Required</td>
												<td className="p-2 text-center">❌ No</td>
												<td className="p-2 text-center">✅ Yes</td>
											</tr>
											<tr className="border-b">
												<td className="p-2 font-medium">Accuracy</td>
												<td className="p-2 text-center">🟡 Medium</td>
												<td className="p-2 text-center">🟢 High</td>
											</tr>
											<tr className="border-b">
												<td className="p-2 font-medium">Speed</td>
												<td className="p-2 text-center">🟢 Fast</td>
												<td className="p-2 text-center">🟡 Slower</td>
											</tr>
											<tr className="border-b">
												<td className="p-2 font-medium">Works with VPN</td>
												<td className="p-2 text-center">🟡 VPN Location</td>
												<td className="p-2 text-center">🟢 Real Location</td>
											</tr>
											<tr className="border-b">
												<td className="p-2 font-medium">Privacy</td>
												<td className="p-2 text-center">🟢 Anonymous</td>
												<td className="p-2 text-center">🟡 User Control</td>
											</tr>
											<tr className="border-b">
												<td className="p-2 font-medium">Battery Impact</td>
												<td className="p-2 text-center">🟢 None</td>
												<td className="p-2 text-center">🟡 Minimal</td>
											</tr>
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>

						{/* Implementation Guide */}
						<Card>
							<CardHeader>
								<CardTitle>Implementation Options</CardTitle>
								<CardDescription>
									Choose the right approach for your use case
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="p-4 border rounded-lg">
										<h4 className="font-medium mb-2 text-green-600">
											🚀 Quick Setup (Recommended)
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											IP detection with browser fallback for best user
											experience.
										</p>
										<code className="text-xs bg-muted p-2 rounded block">
											{`<EnhancedSmartPrice 
  amount={299}
  preferBrowserGeolocation={false}
  fallbackToIP={true}
/>`}
										</code>
									</div>

									<div className="p-4 border rounded-lg">
										<h4 className="font-medium mb-2 text-blue-600">
											🎯 High Accuracy
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											Browser geolocation first, IP fallback for maximum
											accuracy.
										</p>
										<code className="text-xs bg-muted p-2 rounded block">
											{`<EnhancedSmartPrice 
  amount={299}
  preferBrowserGeolocation={true}
  fallbackToIP={true}
  showPermissionPrompt={true}
/>`}
										</code>
									</div>

									<div className="p-4 border rounded-lg">
										<h4 className="font-medium mb-2 text-purple-600">
											🔒 Privacy First
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											Only uses browser geolocation with explicit user consent.
										</p>
										<code className="text-xs bg-muted p-2 rounded block">
											{`<EnhancedSmartPrice 
  amount={299}
  preferBrowserGeolocation={true}
  fallbackToIP={false}
  showPermissionPrompt={true}
/>`}
										</code>
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

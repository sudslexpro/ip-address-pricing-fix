import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CookiePolicyPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Header Section */}
			<div className="bg-primary text-white py-16">
				<div className="max-w-4xl mx-auto px-6 lg:px-8">
					<h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
					<p className="text-xl text-primary-foreground/80">
						Learn how we use cookies and similar technologies to enhance your
						experience on our platform.
					</p>
					<p className="text-sm text-primary-foreground/60 mt-4">
						Last updated:{" "}
						{new Date().toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
				<div className="space-y-8">
					{/* What Are Cookies */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">1. What Are Cookies?</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								Cookies are small text files that are placed on your device when
								you visit our website. They help us provide you with a better
								experience by remembering your preferences, analyzing how you
								use our service, and improving our platform's functionality.
							</p>
							<p className="text-muted-foreground">
								Similar technologies include web beacons, pixels, and local
								storage, which serve similar purposes to cookies. When we refer
								to "cookies" in this policy, we include these similar
								technologies.
							</p>
						</CardContent>
					</Card>

					{/* Types of Cookies */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								2. Types of Cookies We Use
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Essential Cookies */}
							<div className="border rounded-lg p-4">
								<div className="flex items-center gap-2 mb-3">
									<h3 className="text-lg font-semibold">Essential Cookies</h3>
									<Badge variant="destructive">Required</Badge>
								</div>
								<p className="text-muted-foreground mb-3">
									These cookies are necessary for the website to function and
									cannot be switched off. They enable core functionality such as
									security, network management, and accessibility.
								</p>
								<div className="text-sm text-muted-foreground">
									<p>
										<strong>Examples:</strong>
									</p>
									<ul className="list-disc list-inside mt-1 space-y-1">
										<li>Authentication and session management</li>
										<li>Security and fraud prevention</li>
										<li>Load balancing and performance optimization</li>
										<li>User preference settings</li>
									</ul>
								</div>
							</div>

							{/* Functional Cookies */}
							<div className="border rounded-lg p-4">
								<div className="flex items-center gap-2 mb-3">
									<h3 className="text-lg font-semibold">Functional Cookies</h3>
									<Badge variant="secondary">Optional</Badge>
								</div>
								<p className="text-muted-foreground mb-3">
									These cookies enable enhanced functionality and
									personalization, such as remembering your preferences and
									providing personalized content.
								</p>
								<div className="text-sm text-muted-foreground">
									<p>
										<strong>Examples:</strong>
									</p>
									<ul className="list-disc list-inside mt-1 space-y-1">
										<li>Language and region preferences</li>
										<li>Dashboard customization settings</li>
										<li>Recently viewed quotes and searches</li>
										<li>Theme and display preferences</li>
									</ul>
								</div>
							</div>

							{/* Analytics Cookies */}
							<div className="border rounded-lg p-4">
								<div className="flex items-center gap-2 mb-3">
									<h3 className="text-lg font-semibold">Analytics Cookies</h3>
									<Badge variant="secondary">Optional</Badge>
								</div>
								<p className="text-muted-foreground mb-3">
									These cookies help us understand how visitors interact with
									our website by collecting and reporting information
									anonymously.
								</p>
								<div className="text-sm text-muted-foreground">
									<p>
										<strong>Examples:</strong>
									</p>
									<ul className="list-disc list-inside mt-1 space-y-1">
										<li>Google Analytics for usage statistics</li>
										<li>Performance monitoring and error tracking</li>
										<li>Feature usage and user journey analysis</li>
										<li>A/B testing and optimization</li>
									</ul>
								</div>
							</div>

							{/* Marketing Cookies */}
							<div className="border rounded-lg p-4">
								<div className="flex items-center gap-2 mb-3">
									<h3 className="text-lg font-semibold">Marketing Cookies</h3>
									<Badge variant="secondary">Optional</Badge>
								</div>
								<p className="text-muted-foreground mb-3">
									These cookies track your visit to our website and other
									websites to provide relevant advertising and measure the
									effectiveness of our marketing campaigns.
								</p>
								<div className="text-sm text-muted-foreground">
									<p>
										<strong>Examples:</strong>
									</p>
									<ul className="list-disc list-inside mt-1 space-y-1">
										<li>Conversion tracking for advertising campaigns</li>
										<li>Retargeting and remarketing</li>
										<li>Social media integration and sharing</li>
										<li>Email marketing effectiveness tracking</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Third-Party Cookies */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								3. Third-Party Cookies and Services
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground mb-4">
								We work with trusted third-party service providers who may place
								cookies on your device. These include:
							</p>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Google Services</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Google Analytics</li>
										<li>• Google Ads</li>
										<li>• Google Maps</li>
										<li>• reCAPTCHA</li>
									</ul>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Payment Processors</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Stripe</li>
										<li>• PayPal</li>
										<li>• Other secure payment gateways</li>
									</ul>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Analytics & Monitoring</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Performance monitoring tools</li>
										<li>• Error tracking services</li>
										<li>• User feedback platforms</li>
									</ul>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Communication</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Customer support chat</li>
										<li>• Email marketing platforms</li>
										<li>• Video conferencing tools</li>
									</ul>
								</div>
							</div>

							<p className="text-muted-foreground text-sm">
								Each third-party service has its own privacy policy and cookie
								practices. We recommend reviewing their policies to understand
								how they use cookies and your data.
							</p>
						</CardContent>
					</Card>

					{/* How We Use Cookies */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">4. How We Use Cookies</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								We use cookies for various purposes to enhance your experience:
							</p>
							<div className="grid gap-4 md:grid-cols-2">
								<div>
									<h4 className="font-semibold mb-2">
										Authentication & Security
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Keep you logged in securely</li>
										<li>• Prevent unauthorized access</li>
										<li>• Detect and prevent fraud</li>
									</ul>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Personalization</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Remember your preferences</li>
										<li>• Customize your dashboard</li>
										<li>• Provide relevant content</li>
									</ul>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Performance</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Optimize loading times</li>
										<li>• Monitor system performance</li>
										<li>• Improve user experience</li>
									</ul>
								</div>

								<div>
									<h4 className="font-semibold mb-2">Analytics</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Understand usage patterns</li>
										<li>• Measure feature effectiveness</li>
										<li>• Guide product improvements</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Cookie Retention */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								5. Cookie Retention Periods
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Session Cookies</h4>
									<p className="text-sm text-muted-foreground">
										Temporary cookies that are deleted when you close your
										browser. Used for essential website functionality and
										security.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Persistent Cookies</h4>
									<p className="text-sm text-muted-foreground">
										Remain on your device for a set period or until you delete
										them. Retention periods vary from 30 days to 2 years
										depending on the purpose.
									</p>
								</div>
							</div>

							<div className="mt-4">
								<h4 className="font-semibold mb-2">
									Typical Retention Periods:
								</h4>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Authentication cookies: Session or 30 days</li>
									<li>• Preference cookies: 1 year</li>
									<li>• Analytics cookies: 2 years</li>
									<li>• Marketing cookies: 30 days to 1 year</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					{/* Managing Cookies */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								6. Managing Your Cookie Preferences
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Cookie Consent Settings
								</h3>
								<p className="text-muted-foreground mb-3">
									When you first visit our website, you'll see a cookie banner
									where you can choose which types of cookies to accept. You can
									update your preferences at any time by clicking the "Cookie
									Settings" link in our footer.
								</p>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">Browser Settings</h3>
								<p className="text-muted-foreground mb-3">
									You can also control cookies through your browser settings:
								</p>
								<ul className="text-sm text-muted-foreground space-y-2">
									<li>
										• <strong>Chrome:</strong> Settings {">"}Privacy and
										security {">"} Cookies and other site data
									</li>
									<li>
										• <strong>Firefox:</strong> Options {">"} Privacy & Security{" "}
										{">"} Cookies and Site Data
									</li>
									<li>
										• <strong>Safari:</strong> Preferences {">"} Privacy {">"}{" "}
										Manage Website Data
									</li>
									<li>
										• <strong>Edge:</strong> Settings {">"} Cookies and site
										permissions {">"} Cookies and site data
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">Opt-Out Links</h3>
								<p className="text-muted-foreground mb-3">
									You can opt out of specific tracking services:
								</p>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>
										• Google Analytics:{" "}
										<a
											href="https://tools.google.com/dlpage/gaoptout"
											className="text-primary hover:underline">
											Google Analytics Opt-out
										</a>
									</li>
									<li>
										• Google Ads:{" "}
										<a
											href="https://adssettings.google.com/"
											className="text-primary hover:underline">
											Google Ad Settings
										</a>
									</li>
									<li>
										• Network Advertising Initiative:{" "}
										<a
											href="https://www.networkadvertising.org/choices/"
											className="text-primary hover:underline">
											NAI Opt-out
										</a>
									</li>
								</ul>
							</div>

							<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
								<p className="text-sm text-amber-800">
									<strong>Note:</strong> Disabling certain cookies may affect
									the functionality of our website. Essential cookies cannot be
									disabled as they are necessary for the website to work
									properly.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Updates to Policy */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								7. Updates to This Cookie Policy
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We may update this Cookie Policy from time to time to reflect
								changes in our practices, technology, legal requirements, or
								other factors. We will notify you of any material changes by
								posting the updated policy on our website and updating the "Last
								updated" date at the top of this policy.
							</p>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">8. Contact Us</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								If you have any questions about our use of cookies or this
								Cookie Policy, please contact us:
							</p>
							<div className="space-y-2 text-muted-foreground">
								<p>
									<strong>Email:</strong> privacy@lexprotector.com
								</p>
								<p>
									<strong>Address:</strong> [Company Address]
								</p>
								<p>
									<strong>Phone:</strong> [Company Phone Number]
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default CookiePolicyPage;

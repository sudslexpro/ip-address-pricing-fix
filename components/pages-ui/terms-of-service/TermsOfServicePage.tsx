import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TermsOfServicePage: React.FC = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Header Section */}
			<div className="bg-primary text-white py-16">
				<div className="max-w-4xl mx-auto px-6 lg:px-8">
					<h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
					<p className="text-xl text-primary-foreground/80">
						Please read these terms carefully before using our trademark
						quotation platform.
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
					{/* Acceptance of Terms */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">1. Acceptance of Terms</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								By accessing and using Lex Quotes ("the Platform", "our
								Service"), you accept and agree to be bound by the terms and
								provision of this agreement. If you do not agree to abide by the
								above, please do not use this service. These Terms of Service
								apply to all users of the platform, including law firms,
								attorneys, and other legal professionals.
							</p>
						</CardContent>
					</Card>

					{/* Description of Service */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								2. Description of Service
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground">
								Lex Quotes is a white-label trademark quotation platform that
								provides:
							</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-2">
								<li>Automated trademark research and quotation generation</li>
								<li>Coverage across 100+ countries and jurisdictions</li>
								<li>Professional PDF quote generation with custom branding</li>
								<li>API integration capabilities for existing systems</li>
								<li>Real-time pricing calculations and fee estimates</li>
								<li>Client management and tracking tools</li>
							</ul>
							<p className="text-muted-foreground">
								The service is designed for legal professionals and firms to
								streamline their trademark quotation process.
							</p>
						</CardContent>
					</Card>

					{/* User Accounts and Registration */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								3. User Accounts and Registration
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">Account Creation</h3>
								<p className="text-muted-foreground">
									You must create an account to access our services. You are
									responsible for maintaining the confidentiality of your
									account credentials and for all activities under your account.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Eligibility</h3>
								<p className="text-muted-foreground">
									Our services are intended for legal professionals, law firms,
									and organizations engaged in intellectual property practice.
									Users must be at least 18 years old and legally authorized to
									enter into this agreement.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Account Security</h3>
								<p className="text-muted-foreground">
									You must immediately notify us of any unauthorized use of your
									account or any other breach of security.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Acceptable Use */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								4. Acceptable Use Policy
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground mb-4">
								You agree to use our service only for lawful purposes and in
								accordance with these terms. You agree NOT to:
							</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-2">
								<li>
									Use the service for any unlawful purpose or in violation of
									any local, state, national, or international law
								</li>
								<li>
									Attempt to gain unauthorized access to any portion of the
									service or any other systems or networks
								</li>
								<li>
									Use the service to transmit any material that is defamatory,
									offensive, or otherwise objectionable
								</li>
								<li>
									Interfere with or disrupt the service or servers or networks
									connected to the service
								</li>
								<li>
									Reproduce, duplicate, copy, sell, resell, or exploit any
									portion of the service without express written permission
								</li>
								<li>
									Use automated systems or software to extract data from the
									service for commercial purposes
								</li>
								<li>
									Impersonate any person or entity or falsely state or
									misrepresent your affiliation with any person or entity
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Subscription and Payment */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								5. Subscription and Payment Terms
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Subscription Plans
								</h3>
								<p className="text-muted-foreground">
									We offer various subscription plans with different features
									and usage limits. Plan details, pricing, and features are
									available on our pricing page.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Payment Processing
								</h3>
								<p className="text-muted-foreground">
									Payments are processed securely through third-party payment
									processors. You authorize us to charge your selected payment
									method for recurring subscription fees.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Refund Policy</h3>
								<p className="text-muted-foreground">
									Refunds are handled on a case-by-case basis. Please contact
									our support team for refund requests. Refunds, if approved,
									will be processed to the original payment method.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Changes to Pricing
								</h3>
								<p className="text-muted-foreground">
									We reserve the right to modify our pricing structure with 30
									days' notice to existing subscribers.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Intellectual Property */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								6. Intellectual Property Rights
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">Our Content</h3>
								<p className="text-muted-foreground">
									The service and its original content, features, and
									functionality are and will remain the exclusive property of
									Lex Quotes and its licensors. The service is protected by
									copyright, trademark, and other laws.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Your Content</h3>
								<p className="text-muted-foreground">
									You retain ownership of any intellectual property rights that
									you hold in content that you submit to or through the service.
									By submitting content, you grant us a limited license to use,
									modify, and distribute such content solely for the purpose of
									providing our services.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									White-Label Rights
								</h3>
								<p className="text-muted-foreground">
									Subject to your subscription plan, you may customize and brand
									certain aspects of the service for your clients. This
									customization is limited to visual branding elements and does
									not extend to the underlying technology or functionality.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Data and Privacy */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								7. Data Handling and Privacy
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								Your privacy is important to us. Our collection and use of
								personal information is governed by our Privacy Policy, which is
								incorporated into these terms by reference.
							</p>
							<div>
								<h3 className="text-lg font-semibold mb-2">Client Data</h3>
								<p className="text-muted-foreground">
									You are responsible for ensuring that any client data you
									input into our system is done so with appropriate consent and
									in compliance with applicable privacy laws, including GDPR,
									CCPA, and other relevant data protection regulations.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Service Availability */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								8. Service Availability and Maintenance
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								We strive to maintain high service availability but cannot
								guarantee uninterrupted access. The service may be:
							</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-2">
								<li>
									Temporarily unavailable for maintenance, updates, or
									improvements
								</li>
								<li>
									Subject to interruptions due to circumstances beyond our
									control
								</li>
								<li>
									Modified or discontinued with reasonable notice to users
								</li>
							</ul>
							<p className="text-muted-foreground mt-4">
								We will provide advance notice of planned maintenance whenever
								possible.
							</p>
						</CardContent>
					</Card>

					{/* Limitation of Liability */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								9. Limitation of Liability
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								To the fullest extent permitted by applicable law, Lex Quotes
								shall not be liable for any indirect, incidental, special,
								consequential, or punitive damages, including without
								limitation, loss of profits, data, use, goodwill, or other
								intangible losses.
							</p>
							<p className="text-muted-foreground">
								Our total liability to you for any claims arising from or
								related to this agreement shall not exceed the amount you have
								paid us in the twelve (12) months preceding the claim.
							</p>
						</CardContent>
					</Card>

					{/* Professional Disclaimer */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								10. Professional and Legal Disclaimer
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								<strong>Important:</strong> Our service provides pricing
								estimates and administrative tools for trademark applications
								but does not constitute legal advice. The quotes and information
								generated are estimates based on available data and should not
								be considered as definitive legal guidance.
							</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-2">
								<li>
									All legal work must be reviewed by qualified legal
									professionals
								</li>
								<li>
									Trademark regulations and fees may change without notice
								</li>
								<li>
									Users are responsible for verifying accuracy of all
									information
								</li>
								<li>
									We do not guarantee successful trademark registration outcomes
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Termination */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">11. Termination</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								Either party may terminate this agreement at any time. We may
								terminate or suspend your account immediately, without prior
								notice or liability, for any reason, including breach of these
								terms.
							</p>
							<p className="text-muted-foreground">
								Upon termination, your right to use the service will cease
								immediately. All provisions that should survive termination
								shall survive, including ownership provisions, warranty
								disclaimers, and limitations of liability.
							</p>
						</CardContent>
					</Card>

					{/* Governing Law */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								12. Governing Law and Jurisdiction
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								These terms shall be governed by and construed in accordance
								with the laws of [Jurisdiction], without regard to its conflict
								of law provisions. Any disputes arising from these terms shall
								be resolved in the courts of [Jurisdiction].
							</p>
						</CardContent>
					</Card>

					{/* Changes to Terms */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">13. Changes to Terms</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We reserve the right to modify these terms at any time. We will
								notify users of any material changes via email or through our
								platform. Continued use of the service after such modifications
								constitutes acceptance of the updated terms.
							</p>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								14. Contact Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								If you have any questions about these Terms of Service, please
								contact us:
							</p>
							<div className="space-y-2 text-muted-foreground">
								<p>
									<strong>Email:</strong> legal@lexprotector.com
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

export default TermsOfServicePage;

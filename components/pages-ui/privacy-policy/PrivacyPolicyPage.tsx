import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicyPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Header Section */}
			<div className="bg-primary text-white py-16">
				<div className="max-w-4xl mx-auto px-6 lg:px-8">
					<h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
					<p className="text-xl text-primary-foreground/80">
						Your privacy is important to us. This policy explains how we
						collect, use, and protect your information.
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
					{/* Information We Collect */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								1. Information We Collect
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Personal Information
								</h3>
								<p className="text-muted-foreground">
									We collect information you provide directly to us, such as
									when you create an account, use our services, or contact us
									for support. This may include:
								</p>
								<ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
									<li>Name and contact information</li>
									<li>Professional credentials and firm information</li>
									<li>Payment and billing information</li>
									<li>Communications with our support team</li>
								</ul>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Usage Information
								</h3>
								<p className="text-muted-foreground">
									We automatically collect information about how you use our
									platform, including:
								</p>
								<ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
									<li>Log data and IP addresses</li>
									<li>Device and browser information</li>
									<li>Usage patterns and preferences</li>
									<li>Performance and analytics data</li>
								</ul>
							</div>
						</CardContent>
					</Card>

					{/* How We Use Information */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								2. How We Use Your Information
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								We use the information we collect to:
							</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-2">
								<li>Provide and maintain our trademark quotation services</li>
								<li>Process transactions and send related information</li>
								<li>Send administrative information and updates</li>
								<li>Respond to your requests and provide customer support</li>
								<li>Monitor and analyze usage and trends</li>
								<li>Improve our services and develop new features</li>
								<li>Ensure security and prevent fraud</li>
								<li>Comply with legal obligations</li>
							</ul>
						</CardContent>
					</Card>

					{/* Information Sharing */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								3. Information Sharing and Disclosure
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground">
								We do not sell, trade, or otherwise transfer your personal
								information to third parties except as described below:
							</p>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Service Providers
								</h3>
								<p className="text-muted-foreground">
									We may share information with trusted service providers who
									assist us in operating our platform, conducting business, or
									serving users.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Legal Requirements
								</h3>
								<p className="text-muted-foreground">
									We may disclose information when required by law or to protect
									our rights, property, or safety.
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Business Transfers
								</h3>
								<p className="text-muted-foreground">
									In the event of a merger, acquisition, or sale of assets, user
									information may be transferred.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Data Security */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">4. Data Security</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								We implement appropriate technical and organizational security
								measures to protect your personal information:
							</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-2">
								<li>Encryption of data in transit and at rest</li>
								<li>Regular security assessments and updates</li>
								<li>Access controls and authentication measures</li>
								<li>Employee training on data protection</li>
								<li>Incident response procedures</li>
							</ul>
						</CardContent>
					</Card>

					{/* Your Rights */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								5. Your Rights and Choices
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								You have certain rights regarding your personal information:
							</p>
							<ul className="list-disc list-inside text-muted-foreground space-y-2">
								<li>Access and review your personal information</li>
								<li>Correct inaccurate or incomplete information</li>
								<li>
									Delete your personal information (subject to legal
									requirements)
								</li>
								<li>Restrict or object to certain processing activities</li>
								<li>Data portability rights where applicable</li>
								<li>Withdraw consent where processing is based on consent</li>
							</ul>
							<p className="text-muted-foreground mt-4">
								To exercise these rights, please contact us using the
								information provided below.
							</p>
						</CardContent>
					</Card>

					{/* Data Retention */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">6. Data Retention</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We retain personal information for as long as necessary to
								fulfill the purposes outlined in this policy, unless a longer
								retention period is required or permitted by law. When
								determining retention periods, we consider factors such as the
								nature of the information, potential risk of harm, and legal
								requirements.
							</p>
						</CardContent>
					</Card>

					{/* International Transfers */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								7. International Data Transfers
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Your information may be transferred to and processed in
								countries other than your own. We ensure appropriate safeguards
								are in place to protect your information in accordance with
								applicable data protection laws, including through the use of
								standard contractual clauses or other approved transfer
								mechanisms.
							</p>
						</CardContent>
					</Card>

					{/* Children's Privacy */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">8. Children's Privacy</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Our services are not intended for individuals under the age of
								18. We do not knowingly collect personal information from
								children under 18. If we become aware that we have collected
								personal information from a child under 18, we will take steps
								to delete such information.
							</p>
						</CardContent>
					</Card>

					{/* Updates to Policy */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								9. Updates to This Policy
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We may update this privacy policy from time to time. We will
								notify you of any material changes by posting the new policy on
								this page and updating the "Last updated" date. We encourage you
								to review this policy periodically for any changes.
							</p>
						</CardContent>
					</Card>

					{/* Contact Information */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">10. Contact Us</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								If you have any questions about this privacy policy or our
								privacy practices, please contact us:
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

export default PrivacyPolicyPage;

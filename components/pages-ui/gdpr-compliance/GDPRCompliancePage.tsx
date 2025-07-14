import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Users, FileText } from "lucide-react";

const GDPRCompliancePage: React.FC = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Header Section */}
			<div className="bg-primary text-white py-16">
				<div className="max-w-4xl mx-auto px-6 lg:px-8">
					<div className="flex items-center gap-3 mb-4">
						<Shield className="w-8 h-8" />
						<h1 className="text-4xl font-bold">GDPR Compliance</h1>
					</div>
					<p className="text-xl text-primary-foreground/80">
						Our commitment to protecting your personal data in accordance with
						the General Data Protection Regulation.
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
					{/* Overview */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<CheckCircle className="w-6 h-6 text-green-500" />
								<CardTitle className="text-2xl">
									GDPR Compliance Overview
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								The General Data Protection Regulation (GDPR) is a comprehensive
								privacy law that came into effect on May 25, 2018. It applies to
								organizations that process personal data of individuals in the
								European Union (EU).
							</p>
							<p className="text-muted-foreground">
								Lex Quotes is committed to full GDPR compliance and has
								implemented comprehensive measures to protect your personal data
								and ensure your privacy rights are respected and upheld.
							</p>
						</CardContent>
					</Card>

					{/* Your Rights Under GDPR */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Users className="w-6 h-6 text-blue-500" />
								<CardTitle className="text-2xl">
									Your Rights Under GDPR
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-6">
							<p className="text-muted-foreground mb-4">
								Under GDPR, you have the following rights regarding your
								personal data:
							</p>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<Badge variant="outline">Article 15</Badge>
										Right of Access
									</h4>
									<p className="text-sm text-muted-foreground">
										You have the right to obtain confirmation that your data is
										being processed and access to your personal data.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<Badge variant="outline">Article 16</Badge>
										Right to Rectification
									</h4>
									<p className="text-sm text-muted-foreground">
										You have the right to correct inaccurate personal data and
										complete incomplete data.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<Badge variant="outline">Article 17</Badge>
										Right to Erasure
									</h4>
									<p className="text-sm text-muted-foreground">
										Also known as the "right to be forgotten," you can request
										deletion of your personal data.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<Badge variant="outline">Article 18</Badge>
										Right to Restriction
									</h4>
									<p className="text-sm text-muted-foreground">
										You have the right to restrict the processing of your
										personal data in certain circumstances.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<Badge variant="outline">Article 20</Badge>
										Right to Portability
									</h4>
									<p className="text-sm text-muted-foreground">
										You have the right to receive your data in a structured,
										machine-readable format.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2 flex items-center gap-2">
										<Badge variant="outline">Article 21</Badge>
										Right to Object
									</h4>
									<p className="text-sm text-muted-foreground">
										You have the right to object to processing of your personal
										data for specific purposes.
									</p>
								</div>
							</div>

							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
								<p className="text-sm text-blue-800">
									<strong>How to Exercise Your Rights:</strong> To exercise any
									of these rights, please contact our Data Protection Officer
									using the contact information provided at the bottom of this
									page.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Legal Basis for Processing */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Legal Basis for Processing
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground mb-4">
								We process your personal data based on the following legal
								grounds under GDPR Article 6:
							</p>

							<div className="space-y-4">
								<div className="border-l-4 border-blue-500 pl-4">
									<h4 className="font-semibold mb-1">
										Contract Performance (Art. 6(1)(b))
									</h4>
									<p className="text-sm text-muted-foreground">
										Processing necessary to provide our trademark quotation
										services and fulfill our contractual obligations.
									</p>
								</div>

								<div className="border-l-4 border-green-500 pl-4">
									<h4 className="font-semibold mb-1">
										Legitimate Interests (Art. 6(1)(f))
									</h4>
									<p className="text-sm text-muted-foreground">
										Processing for business operations, security, fraud
										prevention, and service improvements, balanced against your
										privacy rights.
									</p>
								</div>

								<div className="border-l-4 border-purple-500 pl-4">
									<h4 className="font-semibold mb-1">Consent (Art. 6(1)(a))</h4>
									<p className="text-sm text-muted-foreground">
										When you explicitly consent to specific processing
										activities, such as marketing communications.
									</p>
								</div>

								<div className="border-l-4 border-orange-500 pl-4">
									<h4 className="font-semibold mb-1">
										Legal Obligation (Art. 6(1)(c))
									</h4>
									<p className="text-sm text-muted-foreground">
										Processing required to comply with legal obligations, such
										as tax and accounting requirements.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Data Categories and Retention */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Data Categories and Retention
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="grid gap-4 md:grid-cols-1">
								<div className="border rounded-lg overflow-hidden">
									<div className="bg-gray-50 px-4 py-2 border-b">
										<h4 className="font-semibold">Account and Profile Data</h4>
									</div>
									<div className="p-4">
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Data:</strong> Name, email, professional
											credentials, firm information, preferences
										</p>
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Purpose:</strong> Account management, service
											provision, personalization
										</p>
										<p className="text-sm text-muted-foreground">
											<strong>Retention:</strong> Duration of account plus 7
											years for legal compliance
										</p>
									</div>
								</div>

								<div className="border rounded-lg overflow-hidden">
									<div className="bg-gray-50 px-4 py-2 border-b">
										<h4 className="font-semibold">
											Transaction and Billing Data
										</h4>
									</div>
									<div className="p-4">
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Data:</strong> Payment information, invoices,
											transaction records
										</p>
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Purpose:</strong> Payment processing, financial
											reporting, tax compliance
										</p>
										<p className="text-sm text-muted-foreground">
											<strong>Retention:</strong> 7 years after final
											transaction for tax and legal compliance
										</p>
									</div>
								</div>

								<div className="border rounded-lg overflow-hidden">
									<div className="bg-gray-50 px-4 py-2 border-b">
										<h4 className="font-semibold">Usage and Analytics Data</h4>
									</div>
									<div className="p-4">
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Data:</strong> Platform usage, interaction
											patterns, performance metrics
										</p>
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Purpose:</strong> Service improvement, analytics,
											security monitoring
										</p>
										<p className="text-sm text-muted-foreground">
											<strong>Retention:</strong> 2 years for analytics,
											indefinitely for aggregated/anonymized data
										</p>
									</div>
								</div>

								<div className="border rounded-lg overflow-hidden">
									<div className="bg-gray-50 px-4 py-2 border-b">
										<h4 className="font-semibold">Communication Data</h4>
									</div>
									<div className="p-4">
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Data:</strong> Support tickets, email
											communications, feedback
										</p>
										<p className="text-sm text-muted-foreground mb-2">
											<strong>Purpose:</strong> Customer support, service
											improvement, relationship management
										</p>
										<p className="text-sm text-muted-foreground">
											<strong>Retention:</strong> 3 years after resolution for
											support quality and training
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* International Transfers */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								International Data Transfers
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground mb-4">
								Some of our service providers and partners are located outside
								the European Economic Area (EEA). When we transfer your data
								internationally, we ensure appropriate safeguards are in place:
							</p>

							<div className="grid gap-4 md:grid-cols-2">
								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Adequacy Decisions</h4>
									<p className="text-sm text-muted-foreground">
										Transfers to countries with EU adequacy decisions that
										provide equivalent data protection.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">
										Standard Contractual Clauses
									</h4>
									<p className="text-sm text-muted-foreground">
										EU-approved contractual terms that provide appropriate
										safeguards for data transfers.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">Certification Programs</h4>
									<p className="text-sm text-muted-foreground">
										Partners certified under approved certification mechanisms
										that ensure data protection.
									</p>
								</div>

								<div className="border rounded-lg p-4">
									<h4 className="font-semibold mb-2">
										Binding Corporate Rules
									</h4>
									<p className="text-sm text-muted-foreground">
										Internal policies approved by supervisory authorities for
										multinational organizations.
									</p>
								</div>
							</div>

							<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
								<p className="text-sm text-amber-800">
									<strong>Note:</strong> We continuously monitor international
									data transfer regulations and update our practices to ensure
									ongoing compliance with evolving requirements.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Data Security Measures */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Shield className="w-6 h-6 text-green-500" />
								<CardTitle className="text-2xl">
									Data Security Measures
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground mb-4">
								We implement technical and organizational measures to ensure
								appropriate security of personal data:
							</p>

							<div className="grid gap-4 md:grid-cols-2">
								<div>
									<h4 className="font-semibold mb-2">Technical Measures</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• End-to-end encryption for data in transit</li>
										<li>• AES-256 encryption for data at rest</li>
										<li>• Multi-factor authentication</li>
										<li>
											• Regular security assessments and penetration testing
										</li>
										<li>• Automated threat detection and monitoring</li>
										<li>• Secure development practices</li>
									</ul>
								</div>

								<div>
									<h4 className="font-semibold mb-2">
										Organizational Measures
									</h4>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>• Data protection impact assessments</li>
										<li>• Employee privacy training and awareness</li>
										<li>• Access controls and principle of least privilege</li>
										<li>• Incident response procedures</li>
										<li>• Vendor security assessments</li>
										<li>• Regular policy reviews and updates</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Data Breach Notification */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Data Breach Notification
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								In the unlikely event of a personal data breach, we are
								committed to:
							</p>
							<ul className="text-muted-foreground space-y-2">
								<li>
									• Notify the relevant supervisory authority within 72 hours
									when required by law
								</li>
								<li>
									• Inform affected individuals without undue delay if there is
									a high risk to their rights and freedoms
								</li>
								<li>
									• Provide clear information about the nature of the breach and
									steps being taken
								</li>
								<li>
									• Implement immediate containment and remediation measures
								</li>
								<li>
									• Conduct a thorough investigation and implement preventive
									measures
								</li>
							</ul>
						</CardContent>
					</Card>

					{/* Children's Data */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Children's Personal Data
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								Our services are designed for legal professionals and are not
								intended for children under 16 years of age. We do not knowingly
								collect personal data from children under 16. If we become aware
								that we have collected personal data from a child under 16
								without parental consent, we will take steps to delete such
								information. If you believe we have collected data from a child
								under 16, please contact our Data Protection Officer
								immediately.
							</p>
						</CardContent>
					</Card>

					{/* Contact and Complaints */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<FileText className="w-6 h-6 text-blue-500" />
								<CardTitle className="text-2xl">
									Contact and Complaints
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">
									Data Protection Officer
								</h3>
								<div className="text-muted-foreground space-y-1">
									<p>
										<strong>Email:</strong> dpo@lexprotector.com
									</p>
									<p>
										<strong>Address:</strong> [Data Protection Officer Address]
									</p>
									<p>
										<strong>Phone:</strong> [DPO Phone Number]
									</p>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-2">
									Supervisory Authority
								</h3>
								<p className="text-muted-foreground mb-2">
									You have the right to lodge a complaint with a supervisory
									authority if you believe we have processed your personal data
									in violation of GDPR. You can contact:
								</p>
								<ul className="text-muted-foreground space-y-1">
									<li>• Your local data protection authority in the EU</li>
									<li>
										• The data protection authority in the country where you
										reside
									</li>
									<li>
										• The data protection authority where the alleged
										infringement occurred
									</li>
								</ul>
							</div>

							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
								<p className="text-sm text-blue-800">
									<strong>Response Time:</strong> We will respond to your
									requests within 30 days (or sooner when possible). In complex
									cases, we may extend this period by up to 60 days and will
									inform you of any delay.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Updates and Reviews */}
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Regular Reviews and Updates
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								We regularly review our GDPR compliance measures and update our
								practices as needed to ensure ongoing compliance with data
								protection requirements. This page will be updated to reflect
								any changes in our GDPR compliance approach. We encourage you to
								review this page periodically for the most current information
								about our data protection practices.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default GDPRCompliancePage;

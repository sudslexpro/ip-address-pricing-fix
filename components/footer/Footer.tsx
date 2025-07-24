import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/icon/AppIcon";

const Footer: React.FC = () => {
	return (
		<main>
			{/* Footer */}
			<footer className="bg-[#1a202c] bg-text-primary text-white py-16">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
						{/* Company Info */}
						<div className="lg:col-span-2">
							<div className="flex items-center space-x-3 mb-6">
								<div className="flex items-center justify-center">
									<Image
										src="/assets/images/LP_Logo.png"
										alt="Lex Quotes Logo"
										className="w-12 h-12 object-contain"
										width={100}
										height={100}
									/>
								</div>
								<div>
									<div className="text-xl font-bold">Lex Protector</div>
									<div className="text-sm text-gray-400">Partner Portal</div>
								</div>
							</div>
							<p className="text-gray-300 mb-6 max-w-md">
								The only white-label trademark quote platform that transforms
								2-hour manual research into 2-minute professional quotes across
								100+ countries.
							</p>
							{/* Social Media Icons */}
							<div className="flex space-x-4">
								{/* Instagram */}
								<Link
									href="https://www.instagram.com/lex_protector/"
									title="lex_protector"
									className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
									<Icon name="Instagram" size={25} color="#E4405F" />
								</Link>
								{/* LinkedIn */}
								<Link
									href="https://www.linkedin.com/company/lex-protector-international-law-office/posts/?feedView=all"
									className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
									<Icon name="Linkedin" size={25} />
								</Link>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Platform</h3>
							<ul className="space-y-2 text-gray-300">
								<li>
									<Link
										href={"/#solution-demo"}
										className={`hover:text-accent transition-colors`}>
										Live Demo
									</Link>
								</li>
								<li>
									<Link
										href="/#pricing"
										className="hover:text-accent transition-colors">
										Pricing
									</Link>
								</li>
								<li>
									<Link
										href="/#coverage"
										className="hover:text-accent transition-colors">
										Coverage
									</Link>
								</li>
								<li>
									<Link
										href="/#commission-calculator"
										className="hover:text-accent transition-colors">
										Commission Calculator
									</Link>
								</li>
								<li>
									<Link
										href="/#success-stories"
										className="hover:text-accent transition-colors">
										Success Stories
									</Link>
								</li>
							</ul>
						</div>

						{/* Support */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Support</h3>
							<ul className="space-y-2 text-gray-300">
								<li>
									<Link
										href="/help-center"
										className="hover:text-accent transition-colors">
										Help Center
									</Link>
								</li>
								<li>
									<Link
										href="/support"
										className="hover:text-accent transition-colors">
										Contact Support
									</Link>
								</li>
								<li>
									<Link
										href="/training"
										className="hover:text-accent transition-colors">
										Training Resources
									</Link>
								</li>
								<li>
									<Link
										href="/system-status"
										className="hover:text-accent transition-colors">
										System Status
									</Link>
								</li>
								<li>
									<Link
										href="/legal-resources"
										className="hover:text-accent transition-colors">
										Legal Resources
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="border-t border-gray-700 pt-8">
						<div className="flex flex-col md:flex-row items-center justify-between">
							<div className="text-gray-400 text-sm mb-4 md:mb-0">
								© {new Date().getFullYear()} Lex Protector LLP | All rights
								reserved.
							</div>
							<div className="flex space-x-6 text-sm text-gray-400">
								<Link
									href="/privacy-policy"
									className="hover:text-accent transition-colors">
									Privacy Policy
								</Link>
								<Link
									href="/terms-of-service"
									className="hover:text-accent transition-colors">
									Terms of Service
								</Link>
								<Link
									href="/cookie-policy"
									className="hover:text-accent transition-colors">
									Cookie Policy
								</Link>
								<Link
									href="/gdpr-compliance"
									className="hover:text-accent transition-colors">
									GDPR Compliance
								</Link>
								<Link
									href="/admin"
									className="hover:text-accent transition-colors">
									Admin Portal
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
};

export default Footer;

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
										src="/assets/images/LP_Logo_Only-1751558392904.jpeg"
										alt="Lex Quotes Logo"
										className="w-12 h-12 object-contain"
										width={100}
										height={100}
									/>
								</div>
								<div>
									<div className="text-xl font-bold">Lex Quotes</div>
									<div className="text-sm text-gray-400">
										Professional Platform
									</div>
								</div>
							</div>
							<p className="text-gray-300 mb-6 max-w-md">
								The only white-label trademark quote platform that transforms
								2-hour manual research into 2-minute professional quotes across
								100+ countries.
							</p>
							<div className="flex space-x-4">
								<a
									href="#"
									className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
									<svg
										width="20"
										height="20"
										fill="currentColor"
										viewBox="0 0 24 24">
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
									</svg>
								</a>
								<a
									href="#"
									className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
									<svg
										width="20"
										height="20"
										fill="currentColor"
										viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								</a>
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
										href="/pricing"
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
									<Link href="/api-docs" className="hover:text-accent transition-colors">
										API Documentation
									</Link>
								</li>
								<li>
									<a href="#" className="hover:text-accent transition-colors">
										Integrations
									</a>
								</li>
							</ul>
						</div>

						{/* Support */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Support</h3>
							<ul className="space-y-2 text-gray-300">
								<li>
									<a href="#" className="hover:text-accent transition-colors">
										Help Center
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-accent transition-colors">
										Contact Support
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-accent transition-colors">
										Training Resources
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-accent transition-colors">
										System Status
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-accent transition-colors">
										Legal Resources
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="border-t border-gray-700 pt-8">
						<div className="flex flex-col md:flex-row items-center justify-between">
							<div className="text-gray-400 text-sm mb-4 md:mb-0">
								© {new Date().getFullYear()} Lex Quotes. All rights reserved.
							</div>
							<div className="flex space-x-6 text-sm text-gray-400">
								<a href="#" className="hover:text-accent transition-colors">
									Privacy Policy
								</a>
								<a href="#" className="hover:text-accent transition-colors">
									Terms of Service
								</a>
								<a href="#" className="hover:text-accent transition-colors">
									Cookie Policy
								</a>
								<a href="#" className="hover:text-accent transition-colors">
									GDPR Compliance
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
};

export default Footer;

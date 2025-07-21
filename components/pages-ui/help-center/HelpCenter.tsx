"use client";
import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Search,
	MessageCircle,
	Mail,
	Phone,
	Clock,
	Shield,
	CreditCard,
	FileText,
	Users,
	Settings,
	HelpCircle,
	ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
	id: string;
	question: string;
	answer: string;
	category: string;
	tags: string[];
}

const faqData: FAQItem[] = [
	{
		id: "what-is-lex-protector",
		question: "What is Lex Protector Portal?",
		answer:
			"Lex Protector Portal is a comprehensive legal technology platform designed to streamline quotation generation, document management, and client communication for law firms. Our platform helps legal professionals create professional proposals, manage cases, and generate PDF documents with ease.",
		category: "general",
		tags: ["platform", "overview", "features"],
	},
	{
		id: "pricing-structure",
		question: "How does the pricing structure work?",
		answer:
			"We offer flexible pricing tiers based on your firm's size and needs. Our commission-based model allows you to pay only for successful cases, with transparent fee structures and no hidden costs. You can view detailed pricing on our pricing page and use our commission calculator to estimate costs.",
		category: "pricing",
		tags: ["pricing", "commission", "fees"],
	},
	{
		id: "pdf-generation",
		question: "How do I generate professional PDF documents?",
		answer:
			"Our PDF generation feature allows you to create professional letterheads, quotes, and legal documents. Simply fill out the required information, customize the template, and download your PDF. All documents include your firm's branding and meet professional standards.",
		category: "features",
		tags: ["pdf", "documents", "letterhead"],
	},
	{
		id: "api-integration",
		question: "Can I integrate Lex Protector with my existing systems?",
		answer:
			"Yes! Our platform supports integration with various legal technology platforms. You can connect Lex Protector with your case management software, CRM, and other legal tech tools through our integration partners. Contact our support team for specific integration requirements and assistance.",
		category: "integration",
		tags: ["integration", "systems", "support"],
	},
	{
		id: "data-security",
		question: "How secure is my client data?",
		answer:
			"We take data security seriously. All data is encrypted in transit and at rest using industry-standard encryption. We comply with legal industry standards and regulations, including GDPR and attorney-client privilege requirements. Regular security audits ensure your data remains protected.",
		category: "security",
		tags: ["security", "privacy", "encryption"],
	},
	{
		id: "getting-started",
		question: "How do I get started with Lex Protector?",
		answer:
			"Getting started is easy! Sign up for a free account, complete the onboarding process, and start creating your first quotation. Our step-by-step guide will walk you through setting up your firm profile, customizing templates, and generating your first documents.",
		category: "general",
		tags: ["onboarding", "setup", "account"],
	},
	{
		id: "support-hours",
		question: "What are your support hours?",
		answer:
			"Our support team is available Monday through Friday, 9 AM to 6 PM EST. For urgent issues, we offer 24/7 emergency support for premium subscribers. You can reach us via live chat, email, or phone.",
		category: "support",
		tags: ["support", "hours", "contact"],
	},
	{
		id: "case-management",
		question: "Does Lex Protector include case management features?",
		answer:
			"While our primary focus is quotation generation and document creation, we do provide basic case tracking and client management features. For comprehensive case management, we integrate seamlessly with popular legal case management platforms.",
		category: "features",
		tags: ["cases", "management", "tracking"],
	},
	{
		id: "billing-payment",
		question: "How does billing and payment work?",
		answer:
			"Billing is processed monthly based on your subscription tier and commission usage. We accept all major credit cards and bank transfers. You can view your billing history and download invoices from your account dashboard.",
		category: "pricing",
		tags: ["billing", "payment", "invoices"],
	},
	{
		id: "data-export",
		question: "Can I export my data from Lex Protector?",
		answer:
			"Yes, you can export your data at any time. We provide data export in multiple formats including CSV, PDF, and JSON. This ensures you maintain access to your information and can migrate to other systems if needed.",
		category: "features",
		tags: ["export", "data", "migration"],
	},
];

const categories = [
	{ id: "all", label: "All Questions", icon: HelpCircle },
	{ id: "general", label: "General", icon: Users },
	{ id: "features", label: "Features", icon: Settings },
	{ id: "pricing", label: "Pricing", icon: CreditCard },
	{ id: "security", label: "Security", icon: Shield },
	{ id: "integration", label: "Integration", icon: FileText },
	{ id: "support", label: "Support", icon: MessageCircle },
];

const HelpCenter: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const filteredFAQs = faqData.filter((faq) => {
		const matchesSearch =
			faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase())
			);

		const matchesCategory =
			selectedCategory === "all" || faq.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Hero Section */}
			<section className="relative py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
						<HelpCircle className="w-8 h-8 text-primary" />
					</div>
					<h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
						Help Center
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Find answers to common questions about Lex Protector Portal. Can't
						find what you're looking for? Contact our support team.
					</p>

					{/* Search Bar */}
					<div className="relative max-w-md mx-auto">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<Input
							type="text"
							placeholder="Search for answers..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 py-3 text-lg border-0 bg-white shadow-lg"
						/>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<Tabs
						value={selectedCategory}
						onValueChange={setSelectedCategory}
						className="w-full">
						{/* Category Tabs */}
						<div className="mb-8 overflow-x-auto">
							<TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 gap-2 h-auto p-1 bg-white shadow-sm">
								{categories.map((category) => {
									const Icon = category.icon;
									return (
										<TabsTrigger
											key={category.id}
											value={category.id}
											className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-primary data-[state=active]:text-white">
											<Icon className="w-5 h-5" />
											<span className="text-sm font-medium">
												{category.label}
											</span>
										</TabsTrigger>
									);
								})}
							</TabsList>
						</div>

						{/* FAQ Content */}
						<div className="grid lg:grid-cols-4 gap-8">
							{/* FAQ List */}
							<div className="lg:col-span-3">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center justify-between">
											<span>Frequently Asked Questions</span>
											<Badge variant="secondary">
												{filteredFAQs.length} questions
											</Badge>
										</CardTitle>
									</CardHeader>
									<CardContent>
										{filteredFAQs.length > 0 ? (
											<Accordion type="single" collapsible className="w-full">
												{filteredFAQs.map((faq) => (
													<AccordionItem
														key={faq.id}
														value={faq.id}
														className="border-b">
														<AccordionTrigger className="text-left hover:no-underline py-4">
															<div className="flex items-start gap-3">
																<HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
																<span className="font-medium">
																	{faq.question}
																</span>
															</div>
														</AccordionTrigger>
														<AccordionContent className="pb-4">
															<div className="pl-8">
																<p className="text-gray-600 mb-4">
																	{faq.answer}
																</p>
																<div className="flex flex-wrap gap-2">
																	{faq.tags.map((tag) => (
																		<Badge
																			key={tag}
																			variant="outline"
																			className="text-xs">
																			{tag}
																		</Badge>
																	))}
																</div>
															</div>
														</AccordionContent>
													</AccordionItem>
												))}
											</Accordion>
										) : (
											<div className="text-center py-12">
												<Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
												<h3 className="text-lg font-medium text-gray-900 mb-2">
													No questions found
												</h3>
												<p className="text-gray-500">
													Try adjusting your search terms or browse different
													categories.
												</p>
											</div>
										)}
									</CardContent>
								</Card>
							</div>

							{/* Contact Options Sidebar */}
							<div className="lg:col-span-1 space-y-6">
								{/* Quick Contact */}
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Need More Help?</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4">
										<Button
											variant="outline"
											className="w-full justify-start"
											asChild>
											<a href="mailto:support@lexprotector.com">
												<Mail className="w-4 h-4 mr-2" />
												Email Support
											</a>
										</Button>
										<Button
											variant="outline"
											className="w-full justify-start"
											asChild>
											<a href="tel:+1-800-LEX-HELP">
												<Phone className="w-4 h-4 mr-2" />
												Call Support
											</a>
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<MessageCircle className="w-4 h-4 mr-2" />
											Live Chat
										</Button>
									</CardContent>
								</Card>

								{/* Support Hours */}
								<Card>
									<CardHeader>
										<CardTitle className="text-lg flex items-center gap-2">
											<Clock className="w-5 h-5" />
											Support Hours
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3">
										<div className="flex justify-between">
											<span className="text-sm text-gray-600">
												Monday - Friday
											</span>
											<span className="text-sm font-medium">
												9 AM - 6 PM EST
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-sm text-gray-600">
												Emergency Support
											</span>
											<span className="text-sm font-medium">24/7</span>
										</div>
										<div className="text-xs text-gray-500 pt-2 border-t">
											Emergency support available for premium subscribers
										</div>
									</CardContent>
								</Card>

								{/* Quick Links */}
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Quick Links</CardTitle>
									</CardHeader>
									<CardContent className="space-y-2">
										<Button
											variant="ghost"
											className="w-full justify-between p-2 h-auto"
											asChild>
											<a href="/get-started">
												<span className="text-sm">Getting Started Guide</span>
												<ChevronRight className="w-4 h-4" />
											</a>
										</Button>
										<Button
											variant="ghost"
											className="w-full justify-between p-2 h-auto"
											asChild>
											<a href="/integration">
												<span className="text-sm">Integration Guide</span>
												<ChevronRight className="w-4 h-4" />
											</a>
										</Button>
										<Button
											variant="ghost"
											className="w-full justify-between p-2 h-auto"
											asChild>
											<a href="/pricing">
												<span className="text-sm">Pricing Information</span>
												<ChevronRight className="w-4 h-4" />
											</a>
										</Button>
										<Button
											variant="ghost"
											className="w-full justify-between p-2 h-auto"
											asChild>
											<a href="/integration">
												<span className="text-sm">Integration Guide</span>
												<ChevronRight className="w-4 h-4" />
											</a>
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
					</Tabs>
				</div>
			</section>
		</main>
	);
};

export default HelpCenter;

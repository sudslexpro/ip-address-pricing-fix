"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Mail,
	Phone,
	MessageCircle,
	Clock,
	Users,
	FileText,
	HelpCircle,
	Send,
	CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email address"),
	company: z.string().optional(),
	subject: z.string().min(5, "Subject must be at least 5 characters"),
	priority: z.enum(["low", "medium", "high", "urgent"]),
	category: z.enum([
		"technical",
		"billing",
		"general",
		"feature-request",
		"bug-report",
	]),
	message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Support: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			company: "",
			subject: "",
			priority: "medium",
			category: "general",
			message: "",
		},
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		console.log("Support ticket submitted:", data);
		setIsSubmitted(true);
		setIsSubmitting(false);
		form.reset();

		// Reset success state after 5 seconds
		setTimeout(() => setIsSubmitted(false), 5000);
	};

	const supportChannels = [
		{
			icon: Mail,
			title: "Email Support",
			description: "Get help via email within 24 hours",
			contact: "support@lexprotector.com",
			availability: "24/7",
			responseTime: "< 24 hours",
		},
		{
			icon: MessageCircle,
			title: "Live Chat",
			description: "Chat with our support team in real-time",
			contact: "Available in-app",
			availability: "Mon-Fri 9AM-6PM EST",
			responseTime: "< 5 minutes",
		},
		{
			icon: Phone,
			title: "Phone Support",
			description: "Speak directly with our experts",
			contact: "+1 (555) 123-4567",
			availability: "Mon-Fri 9AM-6PM EST",
			responseTime: "Immediate",
		},
	];

	const faqItems = [
		{
			question: "How do I get started with Lex Protector?",
			answer:
				"Getting started is easy! Simply sign up for an account, complete your profile setup, and you can begin generating legal quotations immediately. Our onboarding guide will walk you through the process step by step.",
		},
		{
			question: "What pricing plans are available?",
			answer:
				"We offer flexible pricing plans to suit different needs: Starter ($29/month), Professional ($79/month), and Enterprise (custom pricing). Each plan includes different quotation limits and features.",
		},
		{
			question: "How does the PDF generation work?",
			answer:
				"Our PDF generation creates professional legal documents with your firm's letterhead. You can customize templates, add your branding, and generate quotes in seconds with all necessary legal formatting.",
		},
		{
			question: "Is my data secure?",
			answer:
				"Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and regular security audits. Your client data and legal documents are protected with the highest security standards.",
		},
		{
			question: "Can I customize my quotes and branding?",
			answer:
				"Yes! We offer extensive customization options for your quotes and branding. You can upload your letterhead, customize quote templates, and tailor the appearance to match your firm's identity. Contact us for assistance with custom branding setup.",
		},
		{
			question: "What if I need to cancel my subscription?",
			answer:
				"You can cancel your subscription at any time from your account settings. Your account will remain active until the end of your current billing period, and you can export your data before cancellation.",
		},
	];

	const priorityColors = {
		low: "bg-success/10 text-success dark:bg-success/20 dark:text-success",
		medium:
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
		high: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
		urgent:
			"bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
	};

	return (
		<div className="container mx-auto px-4 py-12 max-w-7xl">
			{/* Header Section */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
					How can we help you?
				</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Get the support you need to make the most of Lex Protector. Our team
					is here to help you succeed.
				</p>
			</div>

			<Tabs defaultValue="contact" className="w-full">
				<TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
					<TabsTrigger value="contact">Contact Us</TabsTrigger>
					<TabsTrigger value="channels">Support Channels</TabsTrigger>
					<TabsTrigger value="faq">FAQ</TabsTrigger>
				</TabsList>

				{/* Contact Form Tab */}
				<TabsContent value="contact" className="space-y-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Contact Form */}
						<div className="lg:col-span-2">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<FileText className="h-5 w-5" />
										Submit a Support Ticket
									</CardTitle>
									<CardDescription>
										Fill out the form below and we'll get back to you as soon as
										possible.
									</CardDescription>
								</CardHeader>
								<CardContent>
									{isSubmitted ? (
										<div className="text-center py-8">
											<CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
											<h3 className="text-lg font-semibold text-foreground mb-2">
												Support Ticket Submitted!
											</h3>
											<p className="text-muted-foreground mb-4">
												We've received your request and will respond within 24
												hours.
											</p>
											<Badge variant="outline" className="text-sm">
												Ticket #SP-
												{Math.random().toString(36).substr(2, 9).toUpperCase()}
											</Badge>
										</div>
									) : (
										<Form {...form}>
											<form
												onSubmit={form.handleSubmit(onSubmit)}
												className="space-y-6">
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={form.control}
														name="name"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Full Name *</FormLabel>
																<FormControl>
																	<Input placeholder="John Doe" {...field} />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="email"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Email Address *</FormLabel>
																<FormControl>
																	<Input
																		placeholder="john@lawfirm.com"
																		type="email"
																		{...field}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>

												<FormField
													control={form.control}
													name="company"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Company/Law Firm</FormLabel>
															<FormControl>
																<Input
																	placeholder="Doe & Associates Law Firm"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<FormField
														control={form.control}
														name="category"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Category *</FormLabel>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={field.value}>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue placeholder="Select a category" />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectItem value="technical">
																			Technical Support
																		</SelectItem>
																		<SelectItem value="billing">
																			Billing & Payments
																		</SelectItem>
																		<SelectItem value="general">
																			General Question
																		</SelectItem>
																		<SelectItem value="feature-request">
																			Feature Request
																		</SelectItem>
																		<SelectItem value="bug-report">
																			Bug Report
																		</SelectItem>
																	</SelectContent>
																</Select>
																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={form.control}
														name="priority"
														render={({ field }) => (
															<FormItem>
																<FormLabel>Priority *</FormLabel>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={field.value}>
																	<FormControl>
																		<SelectTrigger>
																			<SelectValue placeholder="Select priority" />
																		</SelectTrigger>
																	</FormControl>
																	<SelectContent>
																		<SelectItem value="low">Low</SelectItem>
																		<SelectItem value="medium">
																			Medium
																		</SelectItem>
																		<SelectItem value="high">High</SelectItem>
																		<SelectItem value="urgent">
																			Urgent
																		</SelectItem>
																	</SelectContent>
																</Select>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>

												<FormField
													control={form.control}
													name="subject"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Subject *</FormLabel>
															<FormControl>
																<Input
																	placeholder="Brief description of your issue"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<FormField
													control={form.control}
													name="message"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Message *</FormLabel>
															<FormControl>
																<Textarea
																	placeholder="Please provide detailed information about your question or issue..."
																	className="min-h-[120px]"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<Button
													type="submit"
													className="w-full"
													disabled={isSubmitting}>
													{isSubmitting ? (
														<>
															<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
															Submitting...
														</>
													) : (
														<>
															<Send className="h-4 w-4 mr-2" />
															Submit Support Ticket
														</>
													)}
												</Button>
											</form>
										</Form>
									)}
								</CardContent>
							</Card>
						</div>

						{/* Support Info Sidebar */}
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Clock className="h-5 w-5" />
										Response Times
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">
											Urgent
										</span>
										<Badge className={priorityColors.urgent}>
											{"< 4 hours"}
										</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">High</span>
										<Badge className={priorityColors.high}>
											{"< 12 hours"}
										</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">
											Medium
										</span>
										<Badge className={priorityColors.medium}>
											{"< 24 hours"}
										</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-muted-foreground">Low</span>
										<Badge className={priorityColors.low}>{"< 48 hours"}</Badge>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Users className="h-5 w-5" />
										Need Enterprise Support?
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground mb-4">
										Enterprise customers get priority support with dedicated
										account managers.
									</p>
									<Button variant="outline" className="w-full">
										Contact Sales
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>

				{/* Support Channels Tab */}
				<TabsContent value="channels" className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{supportChannels.map((channel, index) => (
							<Card key={index} className="text-center">
								<CardHeader>
									<div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
										<channel.icon className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>{channel.title}</CardTitle>
									<CardDescription>{channel.description}</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="text-sm">
										<span className="font-medium">Contact:</span>{" "}
										<span className="text-primary">{channel.contact}</span>
									</div>
									<div className="text-sm">
										<span className="font-medium">Hours:</span>{" "}
										<span className="text-muted-foreground">
											{channel.availability}
										</span>
									</div>
									<div className="text-sm">
										<span className="font-medium">Response Time:</span>{" "}
										<Badge variant="secondary">{channel.responseTime}</Badge>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				{/* FAQ Tab */}
				<TabsContent value="faq" className="space-y-8">
					<div className="max-w-4xl mx-auto">
						<div className="text-center mb-8">
							<h2 className="text-2xl font-bold mb-4">
								Frequently Asked Questions
							</h2>
							<p className="text-muted-foreground">
								Quick answers to common questions about Lex Protector
							</p>
						</div>

						<Accordion type="single" collapsible className="w-full">
							{faqItems.map((item, index) => (
								<AccordionItem key={index} value={`item-${index}`}>
									<AccordionTrigger className="text-left">
										<span className="flex items-center gap-2">
											<HelpCircle className="h-4 w-4 text-primary flex-shrink-0" />
											{item.question}
										</span>
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>

						<div className="text-center mt-8">
							<p className="text-muted-foreground mb-4">
								Can't find what you're looking for?
							</p>
							<Button
								onClick={() => {
									const contactTab = document.querySelector(
										'[value="contact"]'
									) as HTMLElement;
									contactTab?.click();
								}}>
								Contact Support
							</Button>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Support;

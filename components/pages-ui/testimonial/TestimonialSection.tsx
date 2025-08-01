"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/icon/AppIcon";
import Image from "next/image";

const TestimonialsSection = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	const testimonials = [
		{
			id: 1,
			name: "PRADEESH PL",
			title: "Founder & CEO",
			firm: "Trumarx",
			location: "Bangalore, India",
			avatar: "/assets/testimonials/Trumarx_Logo.png",
			quote: `As a law firm managing international trademark matters, we’ve found the Partner Portal to be an invaluable resource. It enables us to obtain accurate quotations across multiple jurisdictions quickly and ensures a smooth process through to registration. The team is highly responsive and professional, making the entire experience efficient and reliable. We’re pleased to collaborate and look forward to continuing this trusted partnership.`,
			metrics: {
				timeSaved: "85%",
				revenueIncrease: "240%",
				clientSatisfaction: "98%",
			},
			beforeAfter: {
				before: "2-3 hours per quote",
				after: "2 minutes per quote",
			},
		},
		{
			id: 2,
			name: "Shantanu Guchhait",
			title: "Founder",
			firm: "Lex Motion",
			location: "Kolkata, West Bengal, India",
			avatar: "/assets/testimonials/LexMotion_Logo.png",
			quote: `Our experience working through the Partner Portal has been seamless and efficient. The platform simplifies the process of obtaining trademark quotes across various jurisdictions, saving us time and effort. The support team is knowledgeable and prompt, which has greatly enhanced our ability to manage international filings smoothly. It’s a practical and reliable solution for law firms handling cross-border trademark work.`,
			metrics: {
				timeSaved: "90%",
				revenueIncrease: "180%",
				clientSatisfaction: "96%",
			},
			beforeAfter: {
				before: "Manual research errors",
				after: "95% accuracy rate",
			},
		},
		{
			id: 3,
			name: "Abhishek Sharma",
			title: "Chartered Accountant",
			firm: "CA",
			location: "",
			avatar: "/assets/testimonials/CA_Logo.jpg",
			quote: `As a CA firm supporting clients with IP-related documentation and compliance, Lex Protector's Partner Portal has been a valuable tool for us. It offers quick access to multi-country trademark quotations, including countries like the USA, UK, Australia, and Canada, and it takes only 2-3 minutes to generate a quote. The platform streamlines our coordination with legal teams, is user-friendly, and the professional support ensures smooth handling of trademark filings, helping us deliver comprehensive service to our clients.`,
			metrics: {
				timeSaved: "80%",
				revenueIncrease: "320%",
				clientSatisfaction: "99%",
			},
			beforeAfter: {
				before: "20 quotes per month",
				after: "65 quotes per month",
			},
		},
		{
			id: 4,
			name: "Wendy Au",
			title: "",
			firm: "",
			location: "",
			avatar: "/assets/images/user.png",
			quote: `The Partner Portal made it easy to request trademark quotes across multiple countries. The team provided excellent support throughout the process, guiding me efficiently from quote to successful filing. Their prompt assistance and clear communication were truly commendable.`,
			metrics: {
				timeSaved: "75%",
				revenueIncrease: "200%",
				clientSatisfaction: "97%",
			},
			beforeAfter: {
				before: "15 countries coverage",
				after: "100+ countries coverage",
			},
		},
	];

	const successMetrics = [
		{
			icon: "Users",
			value: "100+",
			label: "Partner Firms",
			description: "Boutique to mid-size practices",
		},
		{
			icon: "FileText",
			value: "800+",
			label: "Quotes Generated",
			description: "Professional quotes delivered",
		},
		{
			icon: "TrendingUp",
			value: "240%",
			label: "Avg Revenue Increase",
			description: "For partner firms",
		},
		{
			icon: "Clock",
			value: "85%",
			label: "Time Reduction",
			description: "In quote preparation",
		},
	];

	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		}, 8000);

		return () => clearInterval(interval);
	}, [isAutoPlaying, testimonials.length]);

	const handleTestimonialChange = (index: number) => {
		setCurrentTestimonial(index);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const nextTestimonial = () => {
		setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
		setIsAutoPlaying(false);
	};

	const prevTestimonial = () => {
		setCurrentTestimonial(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length
		);
		setIsAutoPlaying(false);
	};

	const currentTest = testimonials[currentTestimonial];

	return (
		<section id="success-stories" className="pb-20 bg-surface">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="MessageSquare" size={16} />
						<span>Success Stories</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Trusted by <span className="text-success">100+ Law Firms</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						See how boutique law firms are transforming their practices and
						increasing revenue with our white-label platform.
					</p>
				</div>

				{/* Success Metrics */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
					{successMetrics.map((metric, index) => (
						<div
							key={index}
							className="bg-white dark:bg-white/10 rounded-xl p-6 border border-border text-center hover:shadow-cta transition-all duration-200">
							<div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
								<Icon
									name={metric.icon as keyof typeof import("lucide-react")}
									size={24}
									className="text-success"
								/>
							</div>
							<div className="text-3xl font-bold text-text-primary mb-2">
								{metric.value}
							</div>
							<div className="text-sm font-medium text-text-primary mb-1">
								{metric.label}
							</div>
							<div className="text-xs text-text-secondary">
								{metric.description}
							</div>
						</div>
					))}
				</div>

				{/* Main Testimonial */}
				<div className="bg-white dark:bg-white/10 rounded-2xl shadow-cta border border-border overflow-hidden">
					<div className="grid lg:grid-cols-2">
						{/* Testimonial Content */}
						<div className="p-8 lg:p-12">
							<div className="flex items-center space-x-4 mb-6">
								<div className="relative">
									<Image
										src={currentTest.avatar}
										alt={currentTest.name}
										width={400}
										height={400}
										className="w-38 h-30 object-contain bg-white dark:bg-white/90 rounded-lg shadow-md p-1"
									/>
									{/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
										<Icon name="Check" size={12} className="text-white" />
									</div> */}
								</div>
								<div>
									<h3 className="text-lg font-semibold text-text-primary">
										{currentTest.name}
									</h3>
									<p className="text-sm text-text-secondary">
										{currentTest.title}
									</p>
									<p className="text-sm text-primary dark:text-blue-600 font-medium">
										{currentTest.firm}
									</p>
									<p className="text-xs text-text-muted">
										{currentTest.location}
									</p>
								</div>
							</div>

							<blockquote className="text-lg text-text-primary leading-relaxed mb-8">
								"{currentTest.quote}"
							</blockquote>

							{/* Before/After */}
							<div className="bg-surface rounded-lg p-4 mb-6">
								<div className="grid grid-cols-2 gap-4">
									<div className="text-center">
										<div className="text-xs text-text-secondary mb-1">
											BEFORE
										</div>
										<div className="text-sm font-medium text-error">
											{currentTest.beforeAfter.before}
										</div>
									</div>
									<div className="text-center">
										<div className="text-xs text-text-secondary mb-1">
											AFTER
										</div>
										<div className="text-sm font-medium text-success">
											{currentTest.beforeAfter.after}
										</div>
									</div>
								</div>
							</div>

							{/* Navigation */}
							<div className="flex items-center justify-between">
								<div className="flex space-x-2">
									{testimonials.map((_, index) => (
										<button
											key={index}
											onClick={() => handleTestimonialChange(index)}
											className={`w-2 h-2 rounded-full transition-all duration-200 ${
												index === currentTestimonial
													? "bg-primary dark:bg-blue-600 w-6"
													: "bg-border hover:bg-primary/50"
											}`}
										/>
									))}
								</div>
								<div className="flex space-x-2">
									<button
										onClick={prevTestimonial}
										className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
										<Icon name="ChevronLeft" size={16} />
									</button>
									<button
										onClick={nextTestimonial}
										className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
										<Icon name="ChevronRight" size={16} />
									</button>
								</div>
							</div>
						</div>

						{/* Metrics Panel */}
						<div className="bg-gradient-to-br from-primary/5 to-success/5 p-8 lg:p-12 flex flex-col justify-center">
							<h4 className="text-xl font-semibold text-text-primary mb-8 text-center">
								Results Achieved
							</h4>

							<div className="space-y-6">
								<div className="text-center">
									<div className="text-4xl font-bold text-primary dark:text-blue-600 mb-2">
										{currentTest.metrics.timeSaved}
									</div>
									<div className="text-sm text-text-secondary">Time Saved</div>
									<div className="w-full bg-surface dark:bg-primary rounded-full h-2 mt-2">
										<div
											className="bg-primary dark:bg-blue-600 h-2 rounded-full transition-all duration-1000"
											style={{ width: currentTest.metrics.timeSaved }}></div>
									</div>
								</div>

								<div className="text-center">
									<div className="text-4xl font-bold text-success mb-2">
										{currentTest.metrics.revenueIncrease}
									</div>
									<div className="text-sm text-text-secondary">
										Revenue Increase
									</div>
									<div className="w-full bg-surface rounded-full h-2 mt-2">
										<div
											className="bg-success h-2 rounded-full transition-all duration-1000"
											style={{
												width: `${Math.min(
													parseInt(currentTest.metrics.revenueIncrease),
													100
												)}%`,
											}}></div>
									</div>
								</div>

								<div className="text-center">
									<div className="text-4xl font-bold text-accent mb-2">
										{currentTest.metrics.clientSatisfaction}
									</div>
									<div className="text-sm text-text-secondary">
										Client Satisfaction
									</div>
									<div className="w-full bg-surface rounded-full h-2 mt-2">
										<div
											className="bg-accent h-2 rounded-full transition-all duration-1000"
											style={{
												width: currentTest.metrics.clientSatisfaction,
											}}></div>
									</div>
								</div>
							</div>

							<div className="mt-8 p-4 bg-white/50 dark:bg-white/10 rounded-lg text-center">
								<div className="text-xs text-text-secondary mb-1">
									VERIFIED PARTNER
								</div>
								<div className="flex items-center justify-center space-x-1">
									<Icon name="Shield" size={16} className="text-success" />
									<span className="text-sm font-medium text-success">
										Authenticated Results
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Partner Logos */}
				<div className="mt-16 text-center">
					<p className="text-sm text-text-secondary mb-8">
						Trusted by leading IP Lawyers & Boutique law firms
					</p>
					<div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
						{[
							"Trumarx",
							"Lex Motion",
							"CA Abhishek Sharma",
							"Wendy Au",
							"C&H IP LAW LIMITED",
							"WIPS Law Associates Pvt Ltd",
						].map((firm, index) => (
							<div key={index} className="text-sm font-medium text-text-muted">
								{firm}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;

"use client";
import React, { useState, useEffect } from "react";
import Icon from "@/components/icon/AppIcon";

const ProblemSection = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const traditionalProcess = [
		{
			step: 1,
			title: "Manual Research",
			description:
				"Spend 30-45 minutes researching each country's trademark requirements",
			time: "45 min",
			icon: "Search" as const,
			frustration: "High",
		},
		{
			step: 2,
			title: "Fee Calculation",
			description:
				"Manually calculate government fees, attorney fees, and markup",
			time: "20 min",
			icon: "Calculator" as const,
			frustration: "Medium",
		},
		{
			step: 3,
			title: "Document Preparation",
			description:
				"Create professional quote documents and client presentations",
			time: "30 min",
			icon: "FileText" as const,
			frustration: "High",
		},
		{
			step: 4,
			title: "Client Communication",
			description: "Email back and forth with revisions and clarifications",
			time: "25 min",
			icon: "Mail" as const,
			frustration: "High",
		},
	];

	const automatedProcess = [
		{
			step: 1,
			title: "Input Details",
			description: "Enter trademark details in our intuitive form",
			time: "30 sec",
			icon: "Edit" as const,
			benefit: "Instant",
		},
		{
			step: 2,
			title: "Auto-Generate",
			description: "AI-powered system calculates fees across all countries",
			time: "60 sec",
			icon: "Zap" as const,
			benefit: "Accurate",
		},
		{
			step: 3,
			title: "Customize & Brand",
			description: "Apply your firm's branding and commission rates",
			time: "30 sec",
			icon: "Palette" as const,
			benefit: "Professional",
		},
	];

	const painPoints = [
		{
			title: "Inconsistent Pricing",
			description:
				"Manual calculations lead to pricing errors and lost credibility with clients",
			icon: "AlertTriangle" as const,
			impact: "Revenue Loss",
		},
		{
			title: "Client Pressure",
			description:
				"Clients expect instant quotes in today's fast-paced business environment",
			icon: "Clock" as const,
			impact: "Lost Deals",
		},
		{
			title: "International Complexity",
			description:
				"Keeping up with changing fees and requirements across 100+ countries",
			icon: "Globe" as const,
			impact: "Expertise Gap",
		},
		{
			title: "Time Drain",
			description:
				"2+ hours per quote means fewer clients and lower profitability",
			icon: "Timer" as const,
			impact: "Opportunity Cost",
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setIsAnimating(true);
			setTimeout(() => {
				setActiveStep((prev) => (prev + 1) % traditionalProcess.length);
				setIsAnimating(false);
			}, 300);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="py-20 bg-background">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="AlertCircle" size={16} />
						<span>The Current Problem</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Traditional Quote Preparation is{" "}
						<span className="text-destructive">Killing Your Productivity</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						Boutique law firms waste 2+ hours per quote, lose clients to faster
						competitors, and struggle with international trademark complexity.
					</p>
				</div>

				{/* Before/After Comparison */}
				<div className="grid lg:grid-cols-2 gap-12 mb-20">
					{/* Traditional Process */}
					<div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8">
						<div className="flex items-center space-x-3 mb-8">
							<div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center">
								<Icon name="X" size={24} className="text-destructive" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-text-primary">
									Traditional Method
								</h3>
								<p className="text-sm text-text-secondary">
									Manual, time-consuming, error-prone
								</p>
							</div>
						</div>

						<div className="space-y-4">
							{traditionalProcess.map((process, index) => (
								<div
									key={index}
									className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
										activeStep === index && !isAnimating
											? "bg-destructive/10 border border-destructive/30"
											: "bg-white/50"
									}`}>
									<div className="flex-shrink-0 w-10 h-10 bg-destructive/20 rounded-lg flex items-center justify-center">
										<Icon
											name={process.icon}
											size={20}
											className="text-destructive"
										/>
									</div>
									<div className="flex-1">
										<div className="flex items-center justify-between mb-1">
											<h4 className="font-semibold text-text-primary">
												{process.title}
											</h4>
											<span className="text-sm font-medium text-destructive">
												{process.time}
											</span>
										</div>
										<p className="text-sm text-text-secondary">
											{process.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 p-4 bg-destructive/10 rounded-lg">
							<div className="flex items-center justify-between">
								<span className="font-semibold text-text-primary">
									Total Time:
								</span>
								<span className="text-2xl font-bold text-destructive">2+ Hours</span>
							</div>
						</div>
					</div>

					{/* Automated Process */}
					<div className="bg-success/5 border border-success/20 rounded-2xl p-8">
						<div className="flex items-center space-x-3 mb-8">
							<div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
								<Icon name="Check" size={24} className="text-success" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-text-primary">
									Lex Protector Method
								</h3>
								<p className="text-sm text-text-secondary">
									Automated, fast, accurate
								</p>
							</div>
						</div>

						<div className="space-y-4">
							{automatedProcess.map((process, index) => (
								<div
									key={index}
									className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg">
									<div className="flex-shrink-0 w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
										<Icon
											name={process.icon}
											size={20}
											className="text-success"
										/>
									</div>
									<div className="flex-1">
										<div className="flex items-center justify-between mb-1">
											<h4 className="font-semibold text-text-primary">
												{process.title}
											</h4>
											<span className="text-sm font-medium text-success">
												{process.time}
											</span>
										</div>
										<p className="text-sm text-text-secondary">
											{process.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 p-4 bg-success/10 rounded-lg">
							<div className="flex items-center justify-between">
								<span className="font-semibold text-text-primary">
									Total Time:
								</span>
								<span className="text-2xl font-bold text-success">
									2 Minutes
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Pain Points Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{painPoints.map((pain, index) => (
						<div
							key={index}
							className="bg-white border border-border rounded-xl p-6 hover:shadow-cta transition-all duration-200 group">
							<div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
								<Icon name={pain.icon} size={24} className="text-destructive" />
							</div>
							<h3 className="text-lg font-semibold text-text-primary mb-2">
								{pain.title}
							</h3>
							<p className="text-sm text-text-secondary mb-3">
								{pain.description}
							</p>
							<div className="inline-flex items-center space-x-1 text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded-full">
								<Icon name="TrendingDown" size={12} />
								<span>{pain.impact}</span>
							</div>
						</div>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-16">
					<p className="text-lg text-secondary mb-6">
						Ready to transform your quote process from hours to minutes?
					</p>
					<div className="inline-flex items-center space-x-2 text-accent font-medium">
						<Icon name="ArrowDown" size={20} />
						<span>See how our solution works</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProblemSection;

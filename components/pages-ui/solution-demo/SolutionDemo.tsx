"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/icon/AppIcon";

interface FormData {
	trademarkName: string;
	applicantName: string;
	countries: string[];
	classes: number[];
}

interface Quote {
	country: string;
	flag: string;
	governmentFee: number;
	attorneyFee: number;
	total: number;
	classes: number;
	timeline: string;
}

const SolutionDemo = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [isGenerating, setIsGenerating] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		trademarkName: "",
		applicantName: "",
		countries: [],
		classes: [],
	});
	const [generatedQuotes, setGeneratedQuotes] = useState<Quote[]>([]);

	const demoSteps = [
		{
			title: "Enter Trademark Details",
			description: "Input basic information about the trademark application",
			icon: "Edit" as const,
		},
		{
			title: "Select Countries & Classes",
			description: "Choose target countries and trademark classes",
			icon: "Globe" as const,
		},
		{
			title: "Generate Professional Quote",
			description: "Watch as we create accurate quotes in real-time",
			icon: "Zap" as const,
		},
	];

	const sampleCountries = [
		{ code: "US", name: "United States", flag: "🇺🇸", price: 325 },
		{ code: "UK", name: "United Kingdom", flag: "🇬🇧", price: 280 },
		{ code: "DE", name: "Germany", flag: "🇩🇪", price: 290 },
		{ code: "JP", name: "Japan", flag: "🇯🇵", price: 420 },
		{ code: "AU", name: "Australia", flag: "🇦🇺", price: 380 },
		{ code: "CA", name: "Canada", flag: "🇨🇦", price: 310 },
	];

	const trademarkClasses = [
		{
			id: 9,
			name: "Computer Software",
			description: "Software, apps, digital products",
		},
		{
			id: 25,
			name: "Clothing & Apparel",
			description: "Clothing, footwear, headwear",
		},
		{
			id: 35,
			name: "Business Services",
			description: "Advertising, business management",
		},
		{
			id: 42,
			name: "Technology Services",
			description: "IT services, software development",
		},
	];

	useEffect(() => {
		if (currentStep === 2 && formData.countries.length > 0) {
			generateSampleQuotes();
		}
	}, [currentStep, formData.countries]);

	const generateSampleQuotes = () => {
		setIsGenerating(true);

		setTimeout(() => {
			const quotes = formData.countries.map((countryCode) => {
				const country = sampleCountries.find((c) => c.code === countryCode);
				if (!country) {
					throw new Error(`Country not found: ${countryCode}`);
				}

				const basePrice = country.price;
				const classMultiplier = formData.classes.length || 1;
				const governmentFee = basePrice * classMultiplier;
				const attorneyFee = Math.round(governmentFee * 0.6);
				const total = governmentFee + attorneyFee;

				return {
					country: country.name,
					flag: country.flag,
					governmentFee,
					attorneyFee,
					total,
					classes: formData.classes.length || 1,
					timeline: `${Math.floor(Math.random() * 6) + 8}-${
						Math.floor(Math.random() * 6) + 12
					} months`,
				};
			});

			setGeneratedQuotes(quotes);
			setIsGenerating(false);
		}, 2000);
	};

	const handleInputChange = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleCountryToggle = (countryCode: string) => {
		setFormData((prev) => ({
			...prev,
			countries: prev.countries.includes(countryCode)
				? prev.countries.filter((c) => c !== countryCode)
				: [...prev.countries, countryCode],
		}));
	};

	const handleClassToggle = (classId: number) => {
		setFormData((prev) => ({
			...prev,
			classes: prev.classes.includes(classId)
				? prev.classes.filter((c) => c !== classId)
				: [...prev.classes, classId],
		}));
	};

	const nextStep = () => {
		if (currentStep < demoSteps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const resetDemo = () => {
		setCurrentStep(0);
		setFormData({
			trademarkName: "",
			applicantName: "",
			countries: [],
			classes: [],
		});
		setGeneratedQuotes([]);
		setIsGenerating(false);
	};

	return (
		<section id="solution-demo" className="pb-24 bg-surface">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="Play" size={16} />
						<span>Live Demo</span>
					</div>
					{/* Video Player UI */}
					<div className="hidden lg:block relative max-w-4xl mx-auto mb-8">
						<div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-border/20">
							{/* Video Player Header */}
							<div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<div className="flex space-x-2">
										<div className="w-3 h-3 bg-red-500 rounded-full"></div>
										<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
										<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									</div>
									<span className="text-white text-sm font-medium">
										Live Demo
									</span>
								</div>
								<div className="text-gray-400 text-xs">2:04 / 3:45</div>
							</div>

							{/* Video Content Area */}
							<div className="relative aspect-video bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
								{/* Gradient overlay */}
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>

								{/* Play button and content */}
								<div className="relative z-10 text-center">
									<button className="group mb-6 transform hover:scale-105 transition-all duration-300">
										<div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:bg-white transition-colors">
											<Icon
												name="Play"
												size={32}
												className="text-primary ml-1"
											/>
										</div>
									</button>
									<div className="text-white">
										<h3 className="text-2xl font-bold mb-2">
											See Quote Generation in Action
										</h3>
										<p className="text-white/80 text-lg">
											Watch how we transform hours of work into minutes
										</p>
									</div>
								</div>

								{/* Video timeline simulation */}
								<div className="absolute bottom-4 left-4 right-4">
									<div className="flex items-center space-x-3">
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Play" size={16} />
										</button>
										<div className="flex-1 bg-white/20 rounded-full h-1">
											<div
												className="bg-primary h-full rounded-full"
												style={{ width: "54%" }}></div>
										</div>
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Volume2" size={16} />
										</button>
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Settings" size={16} />
										</button>
										<button className="text-white/60 hover:text-white transition-colors">
											<Icon name="Maximize" size={16} />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Interactive Demo:{" "}
						<span className="text-primary">Try It Yourself</span>
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						Experience how our platform transforms complex trademark research
						into professional quotes in under 2 minutes.
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-start">
					{/* Demo Interface */}
					<div className="bg-white rounded-2xl shadow-cta border border-border p-8">
						{/* Progress Steps */}
						<div className="flex items-center justify-between mb-8">
							{demoSteps.map((step, index) => (
								<div key={index} className="flex items-center">
									<div
										className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
											index <= currentStep
												? "bg-primary text-white"
												: "bg-surface text-text-muted"
										}`}>
										{index < currentStep ? (
											<Icon name="Check" size={16} />
										) : (
											index + 1
										)}
									</div>
									{index < demoSteps.length - 1 && (
										<div
											className={`w-16 h-0.5 mx-2 transition-all duration-200 ${
												index < currentStep ? "bg-primary" : "bg-border"
											}`}
										/>
									)}
								</div>
							))}
						</div>

						{/* Step Content */}
						<div className="mb-8">
							<h3 className="text-xl font-semibold text-text-primary mb-2">
								{demoSteps[currentStep].title}
							</h3>
							<p className="text-text-secondary mb-6">
								{demoSteps[currentStep].description}
							</p>

							{/* Step 1: Basic Information */}
							{currentStep === 0 && (
								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-text-primary mb-2">
											Trademark Name
										</label>
										<Input
											type="text"
											placeholder="e.g., TechFlow Solutions"
											value={formData.trademarkName}
											onChange={(e) =>
												handleInputChange("trademarkName", e.target.value)
											}
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-text-primary mb-2">
											Applicant Name
										</label>
										<Input
											type="text"
											placeholder="e.g., TechFlow Inc."
											value={formData.applicantName}
											onChange={(e) =>
												handleInputChange("applicantName", e.target.value)
											}
										/>
									</div>
								</div>
							)}

							{/* Step 2: Countries and Classes */}
							{currentStep === 1 && (
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-text-primary mb-3">
											Select Countries
										</label>
										<div className="grid grid-cols-2 gap-3">
											{sampleCountries.map((country) => (
												<button
													key={country.code}
													onClick={() => handleCountryToggle(country.code)}
													className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
														formData.countries.includes(country.code)
															? "border-primary bg-primary/10 text-primary"
															: "border-border hover:border-primary/50 hover:bg-surface"
													}`}>
													<span className="text-lg">{country.flag}</span>
													<div className="text-left">
														<div className="font-medium text-sm">
															{country.name}
														</div>
														<div className="text-xs text-text-secondary">
															${country.price}
														</div>
													</div>
												</button>
											))}
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-text-primary mb-3">
											Select Classes
										</label>
										<div className="space-y-2">
											{trademarkClasses.map((cls) => (
												<button
													key={cls.id}
													onClick={() => handleClassToggle(cls.id)}
													className={`w-full flex items-center space-x-3 p-3 rounded-lg border text-left transition-all duration-200 ${
														formData.classes.includes(cls.id)
															? "border-primary bg-primary/10 text-primary"
															: "border-border hover:border-primary/50 hover:bg-surface"
													}`}>
													<div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-sm font-medium">
														{cls.id}
													</div>
													<div>
														<div className="font-medium">{cls.name}</div>
														<div className="text-xs text-text-secondary">
															{cls.description}
														</div>
													</div>
												</button>
											))}
										</div>
									</div>
								</div>
							)}

							{/* Step 3: Generated Quotes */}
							{currentStep === 2 && (
								<div>
									{isGenerating ? (
										<div className="text-center py-8">
											<div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
												<Icon
													name="Loader"
													size={32}
													className="text-primary animate-spin"
												/>
											</div>
											<p className="text-text-secondary">
												Generating professional quotes...
											</p>
										</div>
									) : generatedQuotes.length > 0 ? (
										<div className="space-y-4">
											{generatedQuotes.map((quote, index) => (
												<div
													key={index}
													className="bg-surface rounded-lg p-4 border border-border">
													<div className="flex items-center justify-between mb-3">
														<div className="flex items-center space-x-2">
															<span className="text-lg">{quote.flag}</span>
															<span className="font-medium text-text-primary">
																{quote.country}
															</span>
														</div>
														<div className="text-right">
															<div className="text-lg font-bold text-primary">
																${quote.total}
															</div>
															<div className="text-xs text-text-secondary">
																{quote.timeline}
															</div>
														</div>
													</div>
													<div className="grid grid-cols-2 gap-4 text-sm">
														<div>
															<span className="text-text-secondary">
																Government Fee:
															</span>
															<span className="font-medium ml-2">
																${quote.governmentFee}
															</span>
														</div>
														<div>
															<span className="text-text-secondary">
																Attorney Fee:
															</span>
															<span className="font-medium ml-2">
																${quote.attorneyFee}
															</span>
														</div>
													</div>
												</div>
											))}
										</div>
									) : null}
								</div>
							)}
						</div>

						{/* Navigation Buttons */}
						<div className="flex items-center justify-between">
							<Button
								variant="outline"
								onClick={prevStep}
								disabled={currentStep === 0}
								className="flex items-center gap-2">
								<Icon name="ChevronLeft" size={16} />
								Previous
							</Button>

							{currentStep < demoSteps.length - 1 ? (
								<Button
									variant="default"
									onClick={nextStep}
									disabled={
										(currentStep === 0 &&
											(!formData.trademarkName || !formData.applicantName)) ||
										(currentStep === 1 && formData.countries.length === 0)
									}
									className="flex items-center gap-2">
									Next
									<Icon name="ChevronRight" size={16} />
								</Button>
							) : (
								<Button
									variant="default"
									onClick={resetDemo}
									className="flex items-center gap-2">
									<Icon name="RotateCcw" size={16} />
									Try Again
								</Button>
							)}
						</div>
					</div>

					{/* Benefits Sidebar */}
					<div className="space-y-6">
						<div className="bg-white rounded-xl p-6 border border-border">
							<div className="flex items-center space-x-3 mb-4">
								<div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
									<Icon name="Clock" size={20} className="text-success" />
								</div>
								<div>
									<h3 className="font-semibold text-text-primary">
										Time Savings
									</h3>
									<p className="text-sm text-text-secondary">
										From 2+ hours to 2 minutes
									</p>
								</div>
							</div>
							<p className="text-sm text-text-secondary">
								Eliminate manual research and calculations. Our automated system
								handles complex fee structures across all countries.
							</p>
						</div>

						<div className="bg-white rounded-xl p-6 border border-border">
							<div className="flex items-center space-x-3 mb-4">
								<div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
									<Icon name="Target" size={20} className="text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-text-primary">
										95% Accuracy
									</h3>
									<p className="text-sm text-text-secondary">
										Real-time fee updates
									</p>
								</div>
							</div>
							<p className="text-sm text-text-secondary">
								Our database is updated daily with the latest government fees
								and requirements from official trademark offices.
							</p>
						</div>

						<div className="bg-white rounded-xl p-6 border border-border">
							<div className="flex items-center space-x-3 mb-4">
								<div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
									<Icon name="Palette" size={20} className="text-accent" />
								</div>
								<div>
									<h3 className="font-semibold text-text-primary">
										White-Label Ready
									</h3>
									<p className="text-sm text-text-secondary">
										Your brand, your rates
									</p>
								</div>
							</div>
							<p className="text-sm text-text-secondary">
								Customize quotes with your firm's branding, commission rates,
								and professional styling.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SolutionDemo;

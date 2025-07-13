"use client";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";

interface Country {
	id: string;
	name: string;
	price: number;
	flag: string;
	timeline: string;
}

interface Service {
	id: string;
	name: string;
	description: string;
	basePrice: number;
}

interface QuoteCountry {
	country: string;
	flag: string;
	governmentFee: number;
	attorneyFee: number;
	commission: number;
	total: number;
	timeline: string;
	services: string[];
}

interface GeneratedQuote {
	countries: QuoteCountry[];
	services: Service[];
	grandTotal: number;
	generatedAt: string;
}

const InteractiveCoverageMap = () => {
	const svgRef = useRef<SVGSVGElement>(null);
	const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
	const [showQuoteModal, setShowQuoteModal] = useState(false);
	const [generatedQuote, setGeneratedQuote] = useState<GeneratedQuote | null>(
		null
	);
	const [isGenerating, setIsGenerating] = useState(false);

	const countryData = [
		{
			id: "US",
			name: "United States",
			price: 325,
			flag: "🇺🇸",
			timeline: "8-12 months",
		},
		{
			id: "UK",
			name: "United Kingdom",
			price: 280,
			flag: "🇬🇧",
			timeline: "4-6 months",
		},
		{
			id: "DE",
			name: "Germany",
			price: 290,
			flag: "🇩🇪",
			timeline: "6-8 months",
		},
		{
			id: "JP",
			name: "Japan",
			price: 420,
			flag: "🇯🇵",
			timeline: "10-14 months",
		},
		{
			id: "AU",
			name: "Australia",
			price: 380,
			flag: "🇦🇺",
			timeline: "8-10 months",
		},
		{
			id: "CA",
			name: "Canada",
			price: 310,
			flag: "🇨🇦",
			timeline: "6-8 months",
		},
		{
			id: "FR",
			name: "France",
			price: 295,
			flag: "🇫🇷",
			timeline: "6-8 months",
		},
		{
			id: "IN",
			name: "India",
			price: 180,
			flag: "🇮🇳",
			timeline: "12-18 months",
		},
		{
			id: "BR",
			name: "Brazil",
			price: 250,
			flag: "🇧🇷",
			timeline: "8-12 months",
		},
		{
			id: "CN",
			name: "China",
			price: 350,
			flag: "🇨🇳",
			timeline: "9-12 months",
		},
		{
			id: "KR",
			name: "South Korea",
			price: 320,
			flag: "🇰🇷",
			timeline: "8-10 months",
		},
		{
			id: "MX",
			name: "Mexico",
			price: 220,
			flag: "🇲🇽",
			timeline: "6-9 months",
		},
		{ id: "IT", name: "Italy", price: 285, flag: "🇮🇹", timeline: "6-8 months" },
		{ id: "ES", name: "Spain", price: 275, flag: "🇪🇸", timeline: "6-8 months" },
		{
			id: "NL",
			name: "Netherlands",
			price: 300,
			flag: "🇳🇱",
			timeline: "4-6 months",
		},
		{
			id: "CH",
			name: "Switzerland",
			price: 450,
			flag: "🇨🇭",
			timeline: "8-10 months",
		},
		{
			id: "SE",
			name: "Sweden",
			price: 320,
			flag: "🇸🇪",
			timeline: "6-8 months",
		},
		{
			id: "NO",
			name: "Norway",
			price: 340,
			flag: "🇳🇴",
			timeline: "6-8 months",
		},
		{
			id: "DK",
			name: "Denmark",
			price: 330,
			flag: "🇩🇰",
			timeline: "4-6 months",
		},
		{
			id: "FI",
			name: "Finland",
			price: 315,
			flag: "🇫🇮",
			timeline: "6-8 months",
		},
	];

	const services = [
		{
			id: "search",
			name: "Trademark Search",
			description: "Comprehensive database search",
			basePrice: 150,
		},
		{
			id: "application",
			name: "Trademark Application",
			description: "Full application filing",
			basePrice: 200,
		},
		{
			id: "monitoring",
			name: "Trademark Monitoring",
			description: "Ongoing protection monitoring",
			basePrice: 100,
		},
		{
			id: "renewal",
			name: "Trademark Renewal",
			description: "Registration renewal service",
			basePrice: 125,
		},
		{
			id: "opposition",
			name: "Opposition Handling",
			description: "Defend against oppositions",
			basePrice: 500,
		},
		{
			id: "licensing",
			name: "Licensing Support",
			description: "License agreement assistance",
			basePrice: 300,
		},
	];

	useEffect(() => {
		if (!svgRef.current) return;

		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		const width = 800;
		const height = 400;
		const margin = { top: 20, right: 20, bottom: 20, left: 20 };

		svg.attr("width", width).attr("height", height);

		// Create a simple world map representation
		const projection = d3
			.geoNaturalEarth1()
			.scale(120)
			.translate([width / 2, height / 2]);

		const path = d3.geoPath().projection(projection);

		// Draw ocean background
		svg
			.append("rect")
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "#f0f9ff");

		// Draw simplified continents
		const continents = [
			{
				name: "North America",
				path: "M150,120 L300,120 L300,200 L150,200 Z",
				fill: "#e2e8f0",
			},
			{
				name: "South America",
				path: "M200,250 L280,250 L280,350 L200,350 Z",
				fill: "#e2e8f0",
			},
			{
				name: "Europe",
				path: "M380,100 L480,100 L480,160 L380,160 Z",
				fill: "#e2e8f0",
			},
			{
				name: "Africa",
				path: "M380,180 L480,180 L480,300 L380,300 Z",
				fill: "#e2e8f0",
			},
			{
				name: "Asia",
				path: "M500,80 L700,80 L700,220 L500,220 Z",
				fill: "#e2e8f0",
			},
			{
				name: "Australia",
				path: "M650,280 L720,280 L720,320 L650,320 Z",
				fill: "#e2e8f0",
			},
		];

		continents.forEach((continent) => {
			svg
				.append("path")
				.attr("d", continent.path)
				.attr("fill", continent.fill)
				.attr("stroke", "#cbd5e1")
				.attr("stroke-width", 1);
		});

		// Add country markers
		const countryPositions: Record<string, [number, number]> = {
			US: [220, 160],
			CA: [200, 120],
			MX: [180, 200],
			UK: [420, 120],
			DE: [450, 130],
			FR: [430, 140],
			IT: [460, 150],
			ES: [410, 160],
			NL: [440, 120],
			CH: [450, 140],
			SE: [470, 100],
			NO: [460, 90],
			DK: [460, 110],
			FI: [480, 100],
			BR: [240, 300],
			CN: [620, 140],
			JP: [670, 140],
			IN: [580, 160],
			KR: [640, 130],
			AU: [685, 300],
		};

		countryData.forEach((country) => {
			const pos = countryPositions[country.id];
			if (!pos) return;

			const isSelected = selectedCountries.includes(country.id);
			const isHovered = hoveredCountry?.id === country.id;

			svg
				.append("circle")
				.attr("cx", pos[0])
				.attr("cy", pos[1])
				.attr("r", isSelected ? 8 : 6)
				.attr("fill", isSelected ? "#f59e0b" : "#3b82f6")
				.attr("stroke", "#ffffff")
				.attr("stroke-width", 2)
				.attr("opacity", isHovered ? 1 : 0.8)
				.style("cursor", "pointer")
				.on("mouseover", () => setHoveredCountry(country))
				.on("mouseout", () => setHoveredCountry(null))
				.on("click", () => toggleCountrySelection(country.id));

			// Add country labels
			svg
				.append("text")
				.attr("x", pos[0])
				.attr("y", pos[1] - 12)
				.attr("text-anchor", "middle")
				.attr("font-size", "10px")
				.attr("font-weight", "bold")
				.attr("fill", "#374151")
				.text(country.id);
		});
	}, [selectedCountries, hoveredCountry]);

	const toggleCountrySelection = (countryId: string) => {
		setSelectedCountries((prev) =>
			prev.includes(countryId)
				? prev.filter((id) => id !== countryId)
				: [...prev, countryId]
		);
	};

	const toggleServiceSelection = (serviceId: string) => {
		setSelectedServices((prev) =>
			prev.includes(serviceId)
				? prev.filter((id) => id !== serviceId)
				: [...prev, serviceId]
		);
	};

	const generateMultiCountryQuote = async () => {
		if (selectedCountries.length === 0 || selectedServices.length === 0) return;

		setIsGenerating(true);
		setShowQuoteModal(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const selectedCountryData = countryData.filter((country) =>
			selectedCountries.includes(country.id)
		);

		const selectedServiceData = services.filter((service) =>
			selectedServices.includes(service.id)
		);

		const quoteDetails = selectedCountryData.map((country) => {
			const serviceTotal = selectedServiceData.reduce(
				(sum, service) => sum + service.basePrice,
				0
			);
			const governmentFee = country.price;
			const attorneyFee = serviceTotal;
			const commission = Math.round((governmentFee + attorneyFee) * 0.15); // 15% commission
			const total = governmentFee + attorneyFee + commission;

			return {
				country: country.name,
				flag: country.flag,
				governmentFee,
				attorneyFee,
				commission,
				total,
				timeline: country.timeline,
				services: selectedServiceData.map((s) => s.name),
			};
		});

		const grandTotal = quoteDetails.reduce(
			(sum, quote) => sum + quote.total,
			0
		);

		setGeneratedQuote({
			countries: quoteDetails,
			services: selectedServiceData,
			grandTotal,
			generatedAt: new Date().toISOString(),
		});

		setIsGenerating(false);
	};

	const downloadQuotePDF = () => {
		// In a real implementation, this would generate and download a PDF
		alert(
			"PDF download functionality would be implemented here with detailed quote information and country flowcharts."
		);
	};

	return (
		<section id="coverage" className="pb-20 bg-background">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
						<Icon name="Globe" size={16} />
						<span>Global Coverage</span>
					</div>
					<h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
						Interactive Coverage Map
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						Select countries and services, then generate multi-country quotes
						instantly with detailed schedules and commission calculations.
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Country Selection */}
					<div className="bg-white rounded-2xl shadow-cta border border-border p-6">
						<h3 className="text-lg font-semibold text-text-primary mb-4">
							Step 1: Select Countries
						</h3>
						<div className="space-y-3 max-h-180 overflow-y-auto">
							{countryData.map((country) => (
								<button
									key={country.id}
									onClick={() => toggleCountrySelection(country.id)}
									className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
										selectedCountries.includes(country.id)
											? "border-primary bg-primary/10 text-primary"
											: "border-border hover:border-primary/50"
									}`}>
									<div className="flex items-center space-x-3">
										<span className="text-lg">{country.flag}</span>
										<span className="font-medium">{country.name}</span>
									</div>
									<span className="text-sm text-text-secondary">
										${country.price}
									</span>
								</button>
							))}
						</div>
					</div>

					{/* Interactive Map */}
					<div className="bg-white rounded-2xl shadow-cta border border-border p-6">
						<h3 className="text-lg font-semibold text-text-primary mb-4">
							World Coverage Map
						</h3>
						<div className="relative">
							<svg
								ref={svgRef}
								className="w-full h-auto border border-border rounded-lg"
							/>
							{hoveredCountry && (
								<div className="absolute top-4 left-4 bg-text-primary text-white px-3 py-2 rounded-lg text-sm">
									<div className="font-semibold">{hoveredCountry.name}</div>
									<div className="text-accent">${hoveredCountry.price}</div>
									<div className="text-xs opacity-80">
										{hoveredCountry.timeline}
									</div>
								</div>
							)}
						</div>
						<div className="mt-4 text-center">
							<div className="text-sm text-text-secondary">
								Selected: {selectedCountries.length} countries
							</div>
						</div>
					</div>

					{/* Service Selection */}
					<div className="bg-white rounded-2xl shadow-cta border border-border p-6">
						<h3 className="text-lg font-semibold text-text-primary mb-4">
							Step 2: Select Services
						</h3>
						<div className="space-y-3">
							{services.map((service) => (
								<button
									key={service.id}
									onClick={() => toggleServiceSelection(service.id)}
									className={`w-full text-left p-3 rounded-lg border transition-all ${
										selectedServices.includes(service.id)
											? "border-primary bg-primary/10 text-primary"
											: "border-border hover:border-primary/50"
									}`}>
									<div className="font-medium">{service.name}</div>
									<div className="text-sm text-text-secondary">
										{service.description}
									</div>
									<div className="text-sm font-medium mt-1">
										${service.basePrice}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>

				{/* Generate Quote Button */}
				<div className="flex justify-center mt-8">
					<Button
						variant="default"
						size="lg"
						onClick={generateMultiCountryQuote}
						disabled={
							selectedCountries.length === 0 || selectedServices.length === 0
						}
						className="px-8 py-4 flex items-center gap-2">
						<Icon name="Calculator" size={16} />
						Generate Multi-Country Quote
					</Button>
				</div>

				{/* Quote Modal */}
				{showQuoteModal && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
							<div className="p-6 border-b border-border">
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-semibold text-text-primary">
										Multi-Country Quote
									</h3>
									<button
										onClick={() => setShowQuoteModal(false)}
										className="p-2 hover:bg-surface rounded-lg">
										<Icon name="X" size={20} />
									</button>
								</div>
							</div>

							<div className="p-6">
								{isGenerating ? (
									<div className="text-center py-8">
										<Icon
											name="Loader"
											size={48}
											className="text-primary animate-spin mx-auto mb-4"
										/>
										<p className="text-text-secondary">
											Generating professional quote...
										</p>
									</div>
								) : generatedQuote ? (
									<div className="space-y-6">
										<div className="grid gap-4">
											{generatedQuote.countries.map((country, index) => (
												<div
													key={index}
													className="bg-surface rounded-lg p-4 border border-border">
													<div className="flex items-center justify-between mb-3">
														<div className="flex items-center space-x-2">
															<span className="text-lg">{country.flag}</span>
															<span className="font-semibold">
																{country.country}
															</span>
														</div>
														<div className="text-right">
															<div className="text-xl font-bold text-primary">
																${country.total}
															</div>
															<div className="text-sm text-text-secondary">
																{country.timeline}
															</div>
														</div>
													</div>
													<div className="grid grid-cols-3 gap-4 text-sm">
														<div>
															<span className="text-text-secondary">
																Government:
															</span>
															<span className="font-medium ml-2">
																${country.governmentFee}
															</span>
														</div>
														<div>
															<span className="text-text-secondary">
																Attorney:
															</span>
															<span className="font-medium ml-2">
																${country.attorneyFee}
															</span>
														</div>
														<div>
															<span className="text-text-secondary">
																Commission:
															</span>
															<span className="font-medium ml-2">
																${country.commission}
															</span>
														</div>
													</div>
												</div>
											))}
										</div>

										<div className="border-t border-border pt-4">
											<div className="flex items-center justify-between">
												<div className="text-lg font-semibold text-text-primary">
													Grand Total: ${generatedQuote.grandTotal}
												</div>
												<Button
													variant="default"
													onClick={downloadQuotePDF}
													className="flex items-center gap-2">
													<Icon name="Download" size={16} />
													Download PDF
												</Button>
											</div>
										</div>
									</div>
								) : null}
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default InteractiveCoverageMap;

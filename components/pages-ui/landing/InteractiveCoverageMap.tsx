"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
import SimplePDFDownload from "@/components/pages-ui/download-pdf/SimplePDFDownload";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
import Overlay from "ol/Overlay";
import type { FeatureLike } from "ol/Feature";

interface Country {
	id: string;
	name: string;
	price: number;
	flag: string;
	timeline: string;
	coordinates: [number, number];
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
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
	const [selectedServices, setSelectedServices] = useState<string[]>([]);
	const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
	const [showQuoteModal, setShowQuoteModal] = useState(false);
	const [generatedQuote, setGeneratedQuote] = useState<GeneratedQuote | null>(
		null
	);
	const [isGenerating, setIsGenerating] = useState(false);
	const [map, setMap] = useState<Map | null>(null);
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const popupRef = useRef<HTMLDivElement | null>(null);
	const popupContentRef = useRef<HTMLDivElement | null>(null);
	const vectorSourceRef = useRef<VectorSource | null>(null);
	const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

	const countryData = [
		{
			id: "US",
			name: "United States",
			price: 325,
			flag: "🇺🇸",
			timeline: "8-12 months",
			coordinates: [-98.5795, 39.8283] as [number, number],
		},
		{
			id: "UK",
			name: "United Kingdom",
			price: 280,
			flag: "🇬🇧",
			timeline: "4-6 months",
			coordinates: [-0.1278, 51.5074] as [number, number],
		},
		{
			id: "DE",
			name: "Germany",
			price: 290,
			flag: "🇩🇪",
			timeline: "6-8 months",
			coordinates: [10.4515, 51.1657] as [number, number],
		},
		{
			id: "JP",
			name: "Japan",
			price: 420,
			flag: "🇯🇵",
			timeline: "10-14 months",
			coordinates: [138.2529, 36.2048] as [number, number],
		},
		{
			id: "AU",
			name: "Australia",
			price: 380,
			flag: "🇦🇺",
			timeline: "8-10 months",
			coordinates: [133.7751, -25.2744] as [number, number],
		},
		{
			id: "CA",
			name: "Canada",
			price: 310,
			flag: "🇨🇦",
			timeline: "6-8 months",
			coordinates: [-106.3468, 56.1304] as [number, number],
		},
		{
			id: "FR",
			name: "France",
			price: 295,
			flag: "🇫🇷",
			timeline: "6-8 months",
			coordinates: [2.2137, 46.2276] as [number, number],
		},
		{
			id: "IN",
			name: "India",
			price: 180,
			flag: "🇮🇳",
			timeline: "12-18 months",
			coordinates: [78.9629, 20.5937] as [number, number],
		},
		{
			id: "BR",
			name: "Brazil",
			price: 250,
			flag: "🇧🇷",
			timeline: "8-12 months",
			coordinates: [-51.9253, -14.235] as [number, number],
		},
		{
			id: "CN",
			name: "China",
			price: 350,
			flag: "🇨🇳",
			timeline: "9-12 months",
			coordinates: [104.1954, 35.8617] as [number, number],
		},
		{
			id: "KR",
			name: "South Korea",
			price: 320,
			flag: "🇰🇷",
			timeline: "8-10 months",
			coordinates: [127.7669, 35.9078] as [number, number],
		},
		{
			id: "MX",
			name: "Mexico",
			price: 220,
			flag: "🇲🇽",
			timeline: "6-9 months",
			coordinates: [-102.5528, 23.6345] as [number, number],
		},
		{
			id: "IT",
			name: "Italy",
			price: 285,
			flag: "🇮🇹",
			timeline: "6-8 months",
			coordinates: [12.5674, 41.8719] as [number, number],
		},
		{
			id: "ES",
			name: "Spain",
			price: 275,
			flag: "🇪🇸",
			timeline: "6-8 months",
			coordinates: [-3.7492, 40.4637] as [number, number],
		},
		{
			id: "NL",
			name: "Netherlands",
			price: 300,
			flag: "🇳🇱",
			timeline: "4-6 months",
			coordinates: [5.2913, 52.1326] as [number, number],
		},
		{
			id: "CH",
			name: "Switzerland",
			price: 450,
			flag: "🇨🇭",
			timeline: "8-10 months",
			coordinates: [8.2275, 46.8182] as [number, number],
		},
		{
			id: "SE",
			name: "Sweden",
			price: 320,
			flag: "🇸🇪",
			timeline: "6-8 months",
			coordinates: [18.6435, 60.1282] as [number, number],
		},
		{
			id: "NO",
			name: "Norway",
			price: 340,
			flag: "🇳🇴",
			timeline: "6-8 months",
			coordinates: [9.5018, 60.472] as [number, number],
		},
		{
			id: "DK",
			name: "Denmark",
			price: 330,
			flag: "🇩🇰",
			timeline: "4-6 months",
			coordinates: [9.5018, 56.2639] as [number, number],
		},
		{
			id: "FI",
			name: "Finland",
			price: 315,
			flag: "🇫🇮",
			timeline: "6-8 months",
			coordinates: [25.7482, 61.9241] as [number, number],
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

	// Unified style function that handles both selection and hover states
	const getFeatureStyle = useCallback(
		(feature: FeatureLike) => {
			// Check if feature is selected
			const countryId = feature.get("id");
			const isSelected = selectedCountries.includes(countryId);

			// Check if feature is highlighted (hovered)
			const isHighlighted = hoveredCountry?.id === countryId;

			return new Style({
				image: new CircleStyle({
					radius: isSelected ? 7 : isHighlighted ? 8 : 7,
					fill: new Fill({
						color: isSelected
							? "#f59e0b"
							: isHighlighted
							? "#6366F1"
							: "#3B82F6",
					}),
					stroke: new Stroke({
						color: "white",
						width: 2,
					}),
				}),
			});
		},
		[selectedCountries, hoveredCountry]
	);

	useEffect(() => {
		// Create popup elements
		if (!popupRef.current) {
			const popupElement = document.createElement("div");
			popupElement.className = "ol-popup";
			popupElement.style.position = "absolute";
			popupElement.style.backgroundColor = "white";
			popupElement.style.boxShadow = "0 1px 4px rgba(0,0,0,0.2)";
			popupElement.style.padding = "15px";
			popupElement.style.borderRadius = "10px";
			popupElement.style.border = "1px solid #cccccc";
			popupElement.style.bottom = "12px";
			popupElement.style.left = "-50px";
			popupElement.style.minWidth = "150px";
			popupElement.style.display = "none";
			popupElement.style.pointerEvents = "none";
			popupElement.style.zIndex = "1000";

			const popupContent = document.createElement("div");
			popupContent.className = "ol-popup-content";
			popupContent.style.textAlign = "center";
			popupContent.style.fontSize = "14px";

			popupElement.appendChild(popupContent);

			popupRef.current = popupElement;
			popupContentRef.current = popupContent;
		}

		// Initialize OpenLayers map
		if (!map && mapContainerRef.current) {
			// Add the popup overlay to the map container
			if (popupRef.current) {
				mapContainerRef.current.appendChild(popupRef.current);
			}

			// Create vector source and layer for markers
			const vectorSource = new VectorSource();
			vectorSourceRef.current = vectorSource;

			const vectorLayer = new VectorLayer({
				source: vectorSource,
				style: getFeatureStyle,
			});

			// Store reference to vector layer
			vectorLayerRef.current = vectorLayer;

			// Create the map
			const newMap = new Map({
				target: mapContainerRef.current,
				layers: [
					// Base map layer
					new TileLayer({
						source: new OSM(),
					}),
					vectorLayer,
				],
				view: new View({
					center: fromLonLat([0, 20]),
					zoom: 2,
					minZoom: 1.5,
					maxZoom: 6,
				}),
				controls: [],
			});

			// Create a popup overlay
			const popup = new Overlay({
				element: popupRef.current || undefined,
				positioning: "bottom-center",
				stopEvent: false,
				offset: [0, -10],
			});

			newMap.addOverlay(popup);

			// Add markers for each country
			countryData.forEach((country) => {
				const feature = new Feature({
					geometry: new Point(fromLonLat(country.coordinates)),
					id: country.id,
					name: country.name,
					price: country.price,
					flag: country.flag,
					timeline: country.timeline,
				});

				vectorSource.addFeature(feature);
			});

			// Handle pointer move event with debouncing
			let hoverTimeout: NodeJS.Timeout | null = null;
			newMap.on("pointermove", (evt) => {
				// Clear previous timeout
				if (hoverTimeout) {
					clearTimeout(hoverTimeout);
				}

				// Debounce the hover effect
				hoverTimeout = setTimeout(() => {
					const feature = newMap.forEachFeatureAtPixel(
						evt.pixel,
						(feature) => feature,
						{
							hitTolerance: 5,
						}
					);

					if (feature) {
						const countryId = feature.get("id");
						const country = countryData.find((c) => c.id === countryId);

						// Only update if it's a different country
						if (
							country &&
							hoveredCountry?.id !== countryId &&
							popupContentRef.current &&
							popupRef.current &&
							mapContainerRef.current
						) {
							// Update the popup content
							popupContentRef.current.innerHTML = `
								<div style="font-weight: 600; display: flex; align-items: center; gap: 8px;">
									<span>${country.flag}</span>
									<span>${country.name}</span>
								</div>
								<div style="color: #6366F1; margin-top: 5px;">$${country.price}</div>
								<div style="color: #6b7280; font-size: 12px; margin-top: 2px;">${country.timeline}</div>
							`;

							// Show the popup
							popupRef.current.style.display = "block";
							popup.setPosition(evt.coordinate);

							// Update the hovered country
							setHoveredCountry(country);

							// Change cursor to pointer
							mapContainerRef.current.style.cursor = "pointer";
						}
					} else {
						// Hide the popup
						if (popupRef.current) {
							popupRef.current.style.display = "none";
						}

						// Clear the hovered country
						setHoveredCountry(null);

						// Reset cursor
						if (mapContainerRef.current) {
							mapContainerRef.current.style.cursor = "";
						}
					}
				}, 50);
			});

			// Handle click event for country selection
			newMap.on("click", (evt) => {
				const feature = newMap.forEachFeatureAtPixel(
					evt.pixel,
					(feature) => feature
				);
				if (feature) {
					const countryId = feature.get("id");
					toggleCountrySelection(countryId);
				}
			});

			setMap(newMap);
			setIsMapLoaded(true);
		}

		// Cleanup function
		return () => {
			if (map) {
				map.setTarget(undefined);
				setMap(null);
			}
		};
	}, []); // Remove dependencies to prevent re-initialization

	// Separate effect to handle style changes
	useEffect(() => {
		if (vectorLayerRef.current) {
			// Update the style function on the layer
			vectorLayerRef.current.setStyle(getFeatureStyle);
			// Trigger re-render of the vector layer
			vectorLayerRef.current.changed();
		}
	}, [getFeatureStyle]);

	// Effect to update map features based on selected countries
	useEffect(() => {
		if (vectorSourceRef.current) {
			// Clear existing features
			vectorSourceRef.current.clear();

			// Add features only for selected countries, or all if none selected
			const countriesToShow =
				selectedCountries.length > 0
					? countryData.filter((country) =>
							selectedCountries.includes(country.id)
					  )
					: countryData;

			countriesToShow.forEach((country) => {
				const feature = new Feature({
					geometry: new Point(fromLonLat(country.coordinates)),
					id: country.id,
					name: country.name,
					price: country.price,
					flag: country.flag,
					timeline: country.timeline,
				});

				vectorSourceRef.current?.addFeature(feature);
			});
		}
	}, [selectedCountries]);

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
		// This function is now handled by the PDFDownloadComponent
		console.log("PDF download initiated via PDFDownloadComponent");
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
							<div
								ref={mapContainerRef}
								className="w-full border border-border rounded-lg"
								style={{ height: "400px", minHeight: "400px" }}>
								{!isMapLoaded && (
									<div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
										<div className="text-gray-500">Loading map...</div>
									</div>
								)}
							</div>
						</div>
						<div className="mt-4 space-y-3">
							<div className="text-center">
								<div className="text-sm text-text-secondary">
									Selected: {selectedCountries.length} countries
								</div>
							</div>
							{/* Color Legend */}
							<div className="bg-gray-600 rounded-lg p-3">
								<div className="text-xs font-medium text-white mb-2 text-center">
									Map Colour Codes Identification
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center space-x-2">
											<div
												className="w-3 h-3 rounded-full border border-white"
												style={{ backgroundColor: "#3B82F6" }}></div>
											<span className="text-white">Available Countries</span>
										</div>
									</div>
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center space-x-2">
											<div
												className="w-3 h-3 rounded-full border border-white"
												style={{ backgroundColor: "#6366F1" }}></div>
											<span className="text-white">Hovered Country</span>
										</div>
									</div>
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center space-x-2">
											<div
												className="w-3 h-3 rounded-full border border-white"
												style={{ backgroundColor: "#f59e0b" }}></div>
											<span className="text-white">Selected Countries</span>
										</div>
									</div>
								</div>
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
												<SimplePDFDownload
													quote={generatedQuote}
													onDownloadComplete={() => {
														console.log("PDF download completed successfully");
													}}
												/>
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

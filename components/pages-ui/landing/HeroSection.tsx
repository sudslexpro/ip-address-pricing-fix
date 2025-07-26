"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/AppIcon";
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
import Link from "next/link";
import { VersatileCalendlyScheduler } from "@/components/scheduling";

interface CountryData {
	id: string;
	name: string;
	price: string;
	coordinates: [number, number];
	region: string;
}

const HeroSection: React.FC = () => {
	const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(
		null
	);
	const [quotesGenerated, setQuotesGenerated] = useState(888);
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const mapRef = useRef<HTMLDivElement>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<Map | null>(null);
	const [activeRegion, setActiveRegion] = useState("all");
	const [showAllPrices, setShowAllPrices] = useState(false);
	const markersRef = useRef<Feature[]>([]);
	const popupRef = useRef<HTMLDivElement | null>(null);
	const popupContentRef = useRef<HTMLDivElement | null>(null);
	const vectorSourceRef = useRef<VectorSource | null>(null);
	const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
	const [showCalendlyScheduler, setShowCalendlyScheduler] = useState(false);
	const calendlyRef = useRef<HTMLDivElement>(null);

	// Unified style function that handles both filtering and hover states
	const getFeatureStyle = useCallback(
		(feature: FeatureLike) => {
			// Check if feature should be visible based on current filter
			const featureRegion = feature.get("region");
			const isVisible =
				activeRegion === "all" || featureRegion === activeRegion;

			// If not visible, return undefined to hide the feature
			if (!isVisible) {
				return undefined;
			}

			// Check if feature is highlighted (hovered)
			const isHighlighted = hoveredCountry?.id === feature.get("id");

			return new Style({
				image: new CircleStyle({
					radius: isHighlighted ? 8 : 6,
					fill: new Fill({
						color: isHighlighted ? "#6366F1" : "#3B82F6",
					}),
					stroke: new Stroke({
						color: "white",
						width: 2,
					}),
				}),
			});
		},
		[activeRegion, hoveredCountry]
	);

	const countryData: CountryData[] = [
		{
			id: "us",
			name: "United States",
			price: "$300",
			coordinates: [-98.5795, 39.8283],
			region: "americas",
		},
		{
			id: "uk",
			name: "United Kingdom",
			price: "$275",
			coordinates: [-0.1278, 51.5074],
			region: "europe",
		},
		{
			id: "au",
			name: "Australia",
			price: "$250",
			coordinates: [133.7751, -25.2744],
			region: "asia",
		},
		{
			id: "ca",
			name: "Canada",
			price: "$300",
			coordinates: [-106.3468, 56.1304],
			region: "americas",
		},
		{
			id: "cn",
			name: "China",
			price: "$400",
			coordinates: [104.1954, 35.8617],
			region: "asia",
		},
		{
			id: "eu",
			name: "European Union",
			price: "$400",
			coordinates: [9.1582, 48.9513],
			region: "europe",
		},
		{
			id: "in",
			name: "India",
			price: "$100",
			coordinates: [78.9629, 20.5937],
			region: "asia",
		},
		{
			id: "nz",
			name: "New Zealand",
			price: "$250",
			coordinates: [174.886, -40.9006],
			region: "asia",
		},
		{
			id: "sg",
			name: "Singapore",
			price: "$400",
			coordinates: [103.8198, 1.3521],
			region: "asia",
		},
		{
			id: "ae",
			name: "UAE",
			price: "$550",
			coordinates: [53.8478, 23.4241],
			region: "asia",
		},
		{
			id: "sa",
			name: "Saudi Arabia",
			price: "$625",
			coordinates: [45.0792, 23.8859],
			region: "asia",
		},
		{
			id: "za",
			name: "South Africa",
			price: "$275",
			coordinates: [22.9375, -30.5595],
			region: "africa",
		},
		{
			id: "bd",
			name: "Bangladesh",
			price: "$150",
			coordinates: [90.3563, 23.685],
			region: "asia",
		},
		{
			id: "tr",
			name: "Turkey",
			price: "$295",
			coordinates: [35.2433, 38.9637],
			region: "europe",
		},
		{
			id: "tw",
			name: "Taiwan",
			price: "$350",
			coordinates: [120.9605, 23.6978],
			region: "asia",
		},
		{
			id: "cl",
			name: "Chile",
			price: "$425",
			coordinates: [-71.543, -35.6751],
			region: "americas",
		},
		{
			id: "kw",
			name: "Kuwait",
			price: "$350",
			coordinates: [47.4818, 29.3117],
			region: "asia",
		},
		{
			id: "ec",
			name: "Ecuador",
			price: "$375",
			coordinates: [-78.1834, -1.8312],
			region: "americas",
		},
		{
			id: "bh",
			name: "Bahrain",
			price: "$250",
			coordinates: [50.5577, 26.0667],
			region: "asia",
		},
		{
			id: "om",
			name: "Oman",
			price: "$350",
			coordinates: [55.9754, 21.4735],
			region: "asia",
		},
		{
			id: "jp",
			name: "Japan",
			price: "$400",
			coordinates: [138.2529, 36.2048],
			region: "asia",
		},
		{
			id: "my",
			name: "Malaysia",
			price: "$250",
			coordinates: [101.9758, 4.2105],
			region: "asia",
		},
		{
			id: "id",
			name: "Indonesia",
			price: "$350",
			coordinates: [113.9213, -0.7893],
			region: "asia",
		},
		{
			id: "np",
			name: "Nepal",
			price: "$275",
			coordinates: [84.124, 28.3949],
			region: "asia",
		},
		{
			id: "mx",
			name: "Mexico",
			price: "$275",
			coordinates: [-102.5528, 23.6345],
			region: "americas",
		},
	];

	// Initialize map only once
	useEffect(() => {
		const interval = setInterval(() => {
			setQuotesGenerated((prev) => prev + Math.floor(Math.random() * 3) + 1);
		}, 60000); // Changed to 60000 ms (1 minute)

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
			popupElement.style.pointerEvents = "none"; // Prevent popup from blocking map interactions
			popupElement.style.zIndex = "1000"; // Ensure popup is above map

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
					region: country.region,
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
							hitTolerance: 5, // Add some tolerance for easier hover detection
						}
					);

					if (feature) {
						const countryId = feature.get("id");
						const country = countryData.find((c) => c.id === countryId);

						// Check if the feature should be visible based on current filter
						const featureRegion = feature.get("region");
						const isVisible =
							activeRegion === "all" || featureRegion === activeRegion;

						// Only update if it's a different country and the feature is visible
						if (
							country &&
							isVisible &&
							hoveredCountry?.id !== countryId &&
							popupContentRef.current &&
							popupRef.current &&
							mapContainerRef.current
						) {
							// Update the popup content
							popupContentRef.current.innerHTML = `
								<div style="font-weight: 600;">${country.name}</div>
								<div style="color: #6366F1; margin-top: 5px;">${country.price}</div>
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
				}, 50); // 50ms debounce
			});

			// Handle click event for toggling popups
			newMap.on("click", (evt) => {
				const feature = newMap.forEachFeatureAtPixel(
					evt.pixel,
					(feature) => feature
				);
				if (feature) {
					const countryId = feature.get("id");
					const country = countryData.find((c) => c.id === countryId);

					// Check if the feature should be visible based on current filter
					const featureRegion = feature.get("region");
					const isVisible =
						activeRegion === "all" || featureRegion === activeRegion;

					if (country && isVisible && popupRef.current) {
						// Toggle the popup
						if (popupRef.current.style.display === "none") {
							popupRef.current.style.display = "block";
							popup.setPosition(evt.coordinate);
						} else {
							popupRef.current.style.display = "none";
						}
					}
				}
			});

			setMap(newMap);
			setIsMapLoaded(true);
		}

		// Cleanup function
		return () => {
			clearInterval(interval);
		};
	}, []); // Remove dependencies to prevent re-initialization

	// Separate effect to handle hover state changes and region filtering
	useEffect(() => {
		if (vectorLayerRef.current) {
			// Update the style function on the layer
			vectorLayerRef.current.setStyle(getFeatureStyle);
			// Trigger re-render of the vector layer
			vectorLayerRef.current.changed();
		}
	}, [getFeatureStyle]);

	// Cleanup effect for component unmount
	useEffect(() => {
		return () => {
			if (map) {
				map.setTarget(undefined);
				setMap(null);
			}
		};
	}, [map]);

	// Function to filter markers by region
	const filterMarkersByRegion = useCallback(
		(region: string) => {
			setActiveRegion(region);

			// Optional: Pan to region center when filtering
			if (map && region !== "all") {
				const regionCenters = {
					americas: [-85, 40],
					europe: [10, 50],
					asia: [100, 30],
				};

				const center = regionCenters[region as keyof typeof regionCenters];
				if (center) {
					map.getView().animate({
						center: fromLonLat(center),
						zoom: 3,
						duration: 1000,
					});
				}
			} else if (map && region === "all") {
				// Reset to world view
				map.getView().animate({
					center: fromLonLat([0, 20]),
					zoom: 2,
					duration: 1000,
				});
			}
		},
		[map]
	);

	// Function to toggle all price popups
	const toggleAllPrices = () => {
		const newShowAllPrices = !showAllPrices;
		setShowAllPrices(newShowAllPrices);

		if (newShowAllPrices && vectorSourceRef.current) {
			const features = vectorSourceRef.current.getFeatures();

			features.forEach((feature) => {
				// Only show popups for features that match the current region filter
				const featureRegion = feature.get("region");
				const isVisible =
					activeRegion === "all" || featureRegion === activeRegion;

				if (isVisible) {
					const countryId = feature.get("id");
					const country = countryData.find((c) => c.id === countryId);

					if (country) {
						const geometry = feature.getGeometry();
						if (geometry && "getCoordinates" in geometry) {
							const coordinate = (geometry as Point).getCoordinates();

							// Update the popup content
							if (popupContentRef.current) {
								popupContentRef.current.innerHTML = `
									<div style="font-weight: 600;">${country.name}</div>
									<div style="color: #6366F1; margin-top: 5px;">${country.price}</div>
								`;
							}

							// Show the popup
							if (popupRef.current) {
								popupRef.current.style.display = "block";
							}

							// Get the overlay from map
							if (map) {
								const overlays = map.getOverlays().getArray();
								const popup = overlays.find(
									(overlay) => overlay.getElement() === popupRef.current
								);

								if (popup) {
									popup.setPosition(coordinate);
								}
							}
						}
					}
				}
			});
		} else {
			// Hide the popup
			if (popupRef.current) {
				popupRef.current.style.display = "none";
			}
		}
	};

	// Function to reset the map view
	const resetMapView = () => {
		if (map) {
			map.getView().animate({
				center: fromLonLat([0, 20]),
				zoom: 2,
				duration: 1000,
			});
		}
	};

	const handleTrialStart = () => {
		const element = document.querySelector("#pricing");
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const handleRequestLiveDemo = () => {
		setShowCalendlyScheduler(true);
		// Small delay to ensure the component is rendered before scrolling
		setTimeout(() => {
			if (calendlyRef.current) {
				calendlyRef.current.scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "nearest",
				});
			}
		}, 100);
	};

	return (
		<section className="relative min-h-screen bg-[#ecf6ff] dark:bg-[#0d1520] pt-20 pb-16 overflow-hidden">
			{/* Custom CSS for OpenLayers elements */}
			<style jsx>{`
				.ol-popup {
					padding: 12px;
					border-radius: 8px;
					border: 1px solid #e2e8f0;
					box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
					font-family: inherit;
					background-color: white;
					pointer-events: none !important;
					z-index: 1000;
				}

				/* Style the OpenLayers controls */
				.ol-control button {
					background-color: rgba(255, 255, 255, 0.9) !important;
					color: #3b82f6;
					border-radius: 4px;
					margin: 2px;
				}

				.ol-control button:hover {
					background-color: rgba(255, 255, 255, 1) !important;
					color: #6366f1;
				}

				/* Hide the OpenLayers attribution */
				.ol-attribution {
					display: none;
				}

				/* Add smooth transitions */
				.map-container {
					transition: opacity 0.5s ease;
				}

				/* Ensure map container doesn't interfere with interactions */
				.map-container * {
					pointer-events: auto;
				}

				/* Popup should not block pointer events */
				.ol-popup * {
					pointer-events: none !important;
				}
			`}</style>

			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
				{/* Hero Content and Map Section */}
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
					{/* Left Side - Content */}
					<div className="space-y-8">
						<div className="space-y-6">
							<div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
								<Icon name="Zap" size={16} />
								<span>White-Label Trademark Quotation</span>
							</div>

							<h1 className="text-4xl lg:text-6xl font-bold text-primary dark:text-muted-foreground leading-tight">
								Generate Professional{" "}
								<span className="text-accent">Trademark Quotes</span> in 2
								Minutes for{" "}
								<span className="text-[#1a365d] dark:text-muted-foreground">
									100+ Countries
								</span>
							</h1>

							<p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
								Transform your IP lawyer & boutique law firm with the only
								white-label platform that turns 2-hour manual research into
								2-minute professional quotes. Select countries, choose services,
								and generate multi-country quotes with detailed schedules and
								commission calculations.
							</p>
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<Button
								variant="default"
								size="lg"
								onClick={handleRequestLiveDemo}
								className="bg-[#1a365d] hover:bg-background text-white hover:text-[#1a365d] border-ring font-semibold px-8 py-8">
								<Icon name="Play" size={16} />
								Request Live Demo
							</Button>
							<Link href="https://partner.lexprotector.com/signup">
								<Button
									variant="outline"
									size="lg"
									onClick={handleTrialStart}
									className="border-primary text-primary dark:text-gray-100 hover:bg-[#1a365d] hover:text-white w-[22rem] md:w-auto px-8 py-8">
									Start Free Trial
									<Icon name="ArrowRight" size={16} />
								</Button>
							</Link>
						</div>

						{/* Trust Bar */}
						<div className="pt-8 border-t border-border">
							<div className="flex flex-wrap items-center gap-8">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
									<span className="text-sm font-medium text-primary dark:text-gray-100">
										{quotesGenerated.toLocaleString()}+ quotes generated monthly
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Icon name="Shield" size={16} className="text-success" />
									<span className="text-sm font-medium text-text-secondary">
										SOC 2 Certified
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Icon
										name="Users"
										size={16}
										className="text-primary dark:text-gray-100"
									/>
									<span className="text-sm font-medium text-text-secondary">
										100+ Partner Firms
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Interactive World Map */}
					<div className="relative">
						<div className="bg-white dark:bg-white/5 rounded-2xl shadow-cta p-8 border border-border">
							<div className="text-center mb-6">
								<h3 className="text-lg font-semibold text-text-primary mb-2">
									Quick Coverage Preview
								</h3>
								<p className="text-sm text-text-secondary">
									Hover over countries to see instant pricing
								</p>
							</div>

							{/* World Map Container */}
							<div
								ref={mapRef}
								className={`relative w-full h-80 bg-surface rounded-lg overflow-hidden transition-all duration-1000 ${
									isMapLoaded ? "opacity-100" : "opacity-0"
								}`}>
								{/* OpenLayers Map */}
								<div
									ref={mapContainerRef}
									className="absolute inset-0 w-full h-full map-container"
									style={{ zIndex: 0 }}
								/>

								{/* Map Controls */}
								<div className="absolute top-4 right-4 flex flex-col items-end space-y-2 z-10">
									<button
										onClick={resetMapView}
										className="bg-white/80 hover:bg-white dark:bg-primary dark:hover:text-white p-2 rounded-full shadow-sm text-text-secondary hover:text-primary transition-colors"
										title="Reset View">
										<Icon name="RefreshCw" size={14} />
									</button>
									<button
										className="bg-white/80 hover:bg-white dark:bg-primary dark:hover:text-white p-2 rounded-full shadow-sm text-text-secondary hover:text-primary transition-colors"
										title="Toggle Satellite View"
										onClick={() => {
											// Toggle between standard and satellite view
											if (map) {
												const layers = map.getLayers().getArray();
												const baseLayer = layers[0] as TileLayer<OSM>;
												if (baseLayer && baseLayer instanceof TileLayer) {
													// Create a new layer and replace it
													map.removeLayer(baseLayer);
													const newLayer = new TileLayer({
														source: new OSM({
															url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
														}),
													});
													map.getLayers().insertAt(0, newLayer);
												}
											}
										}}>
										<Icon name="Layers" size={14} />
									</button>
									<button
										onClick={toggleAllPrices}
										className={`${
											showAllPrices
												? "bg-accent text-white"
												: "bg-white/80 text-text-secondary hover:text-primary dark:bg-primary dark:hover:text-white"
										} p-2 rounded-full shadow-sm transition-colors`}
										title="Show All Prices">
										<Icon name="DollarSign" size={14} />
									</button>
								</div>

								{/* Region Selection */}
								<div className="absolute top-4 left-4 flex space-x-1 z-10">
									<button
										onClick={() => filterMarkersByRegion("all")}
										className={`${
											activeRegion === "all"
												? "bg-[#1a365d] text-white"
												: "bg-white/80 text-text-secondary hover:text-primary"
										} px-2 py-1 rounded text-xs font-medium shadow-sm transition-colors`}>
										All
									</button>
									<button
										onClick={() => filterMarkersByRegion("americas")}
										className={`${
											activeRegion === "americas"
												? "bg-accent text-white"
												: "bg-white/80 text-text-secondary hover:text-primary dark:bg-primary dark:hover:text-white"
										} px-2 py-1 rounded text-xs font-medium shadow-sm transition-colors`}>
										Americas
									</button>
									<button
										onClick={() => filterMarkersByRegion("europe")}
										className={`${
											activeRegion === "europe"
												? "bg-accent text-white"
												: "bg-white/80 text-text-secondary hover:text-primary dark:bg-primary dark:hover:text-white"
										} px-2 py-1 rounded text-xs font-medium shadow-sm transition-colors`}>
										Europe
									</button>
									<button
										onClick={() => filterMarkersByRegion("asia")}
										className={`${
											activeRegion === "asia"
												? "bg-accent text-white"
												: "bg-white/80 text-text-secondary hover:text-primary dark:bg-primary dark:hover:text-white"
										} px-2 py-1 rounded text-xs font-medium shadow-sm transition-colors`}>
										Asia
									</button>
								</div>

								{/* Coverage Stats */}
								<div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-primary backdrop-blur-sm rounded-lg p-4 border border-border/50 z-10">
									<div className="grid grid-cols-3 gap-4 text-center">
										<div>
											<div className="text-2xl font-bold text-[#1a365d] dark:text-muted-foreground">
												100+
											</div>
											<div className="text-xs text-text-secondary">
												Countries
											</div>
										</div>
										<div>
											<div className="text-2xl font-bold text-accent">99%</div>
											<div className="text-xs text-text-secondary">
												Accuracy
											</div>
										</div>
										<div>
											<div className="text-2xl font-bold text-success">
												2min
											</div>
											<div className="text-xs text-text-secondary">
												Avg Time
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* CTA to Full Coverage Map */}
							<div className="mt-4 text-center">
								<Button
									variant="outline"
									size="sm"
									onClick={() =>
										document
											.querySelector("#coverage")
											?.scrollIntoView({ behavior: "smooth" })
									}>
									<Icon name="MapPin" size={16} />
									View Full Coverage Map
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Calendly Scheduler Section */}
				{showCalendlyScheduler && (
					<div ref={calendlyRef} className="mt-16 fade-in">
						<div className="mb-8 text-center">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
								Schedule Your Demo
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Book a personalized demo to see how Lex Protector can transform
								your practice
							</p>
						</div>
						<VersatileCalendlyScheduler
							calendlyUrl="https://calendly.com/lexprotector-int"
							eventType="30min"
							mode="inline"
							autoLoadScript={true}
						/>
					</div>
				)}
			</div>
		</section>
	);
};

export default HeroSection;

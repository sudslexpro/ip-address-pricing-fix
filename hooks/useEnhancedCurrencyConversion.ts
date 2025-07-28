import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface GeolocationData {
	method: "ip" | "browser" | "fallback";
	country: string;
	countryName: string;
	currency: string;
	timezone: string;
	city?: string;
	region?: string;
	ip?: string;
	coordinates?: { lat: number; lon: number };
	accuracy: "low" | "medium" | "high";
	error?: string;
}

interface ExchangeRateData {
	base: string;
	target: string;
	rate: number;
	lastUpdated: string;
}

interface CurrencyInfo {
	code: string;
	symbol: string;
	name: string;
	decimalPlaces: number;
}

const CURRENCY_INFO: Record<string, CurrencyInfo> = {
	USD: { code: "USD", symbol: "$", name: "US Dollar", decimalPlaces: 2 },
	EUR: { code: "EUR", symbol: "€", name: "Euro", decimalPlaces: 2 },
	GBP: { code: "GBP", symbol: "£", name: "British Pound", decimalPlaces: 2 },
	JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", decimalPlaces: 0 },
	AUD: {
		code: "AUD",
		symbol: "A$",
		name: "Australian Dollar",
		decimalPlaces: 2,
	},
	CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", decimalPlaces: 2 },
	CHF: { code: "CHF", symbol: "Fr", name: "Swiss Franc", decimalPlaces: 2 },
	CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan", decimalPlaces: 2 },
	INR: { code: "INR", symbol: "₹", name: "Indian Rupee", decimalPlaces: 2 },
	SGD: {
		code: "SGD",
		symbol: "S$",
		name: "Singapore Dollar",
		decimalPlaces: 2,
	},
	// ... add more currencies as needed
};

export interface CurrencyConversionOptions {
	enableAutoDetection?: boolean;
	baseCurrency?: string;
	targetCurrency?: string;
	enableRounding?: boolean;
	roundingMode?: "up" | "down" | "nearest";
	customRoundingValue?: number;
	preferBrowserGeolocation?: boolean; // New option
	fallbackToIP?: boolean; // New option
}

export const useEnhancedCurrencyConversion = (
	options: CurrencyConversionOptions = {}
) => {
	const {
		enableAutoDetection = true,
		baseCurrency = "USD",
		targetCurrency,
		enableRounding = true,
		roundingMode = "nearest",
		customRoundingValue,
		preferBrowserGeolocation = false,
		fallbackToIP = true,
	} = options;

	const [userLocation, setUserLocation] = useState<GeolocationData | null>(
		null
	);
	const [exchangeRate, setExchangeRate] = useState<number | null>(null);
	const [currentCurrency, setCurrentCurrency] = useState<string>(baseCurrency);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [geolocationPermission, setGeolocationPermission] = useState<
		"prompt" | "granted" | "denied" | "unsupported"
	>("prompt");

	// Check geolocation permission status
	const checkGeolocationPermission = useCallback(async () => {
		if (!navigator.geolocation) {
			setGeolocationPermission("unsupported");
			return "unsupported";
		}

		try {
			const permission = await navigator.permissions.query({
				name: "geolocation",
			});
			setGeolocationPermission(permission.state as any);
			return permission.state;
		} catch (error) {
			// Fallback for browsers that don't support permissions API
			setGeolocationPermission("prompt");
			return "prompt";
		}
	}, []);

	// Get browser geolocation
	const getBrowserLocation = useCallback((): Promise<{
		lat: number;
		lon: number;
	}> => {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(new Error("Geolocation not supported"));
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					});
				},
				(error) => {
					let errorMessage = "Geolocation failed";
					switch (error.code) {
						case error.PERMISSION_DENIED:
							errorMessage = "Geolocation permission denied";
							setGeolocationPermission("denied");
							break;
						case error.POSITION_UNAVAILABLE:
							errorMessage = "Position unavailable";
							break;
						case error.TIMEOUT:
							errorMessage = "Geolocation timeout";
							break;
					}
					reject(new Error(errorMessage));
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 300000, // 5 minutes
				}
			);
		});
	}, []);

	// Fetch user location with browser geolocation option
	const fetchUserLocation = useCallback(async () => {
		if (!enableAutoDetection) return;

		setIsLoading(true);
		setError(null);

		try {
			let locationData = null;

			// Try browser geolocation first if preferred
			if (preferBrowserGeolocation) {
				try {
					const permission = await checkGeolocationPermission();

					if (permission === "granted" || permission === "prompt") {
						const coords = await getBrowserLocation();
						const response = await axios.get(
							`/api/geolocation-enhanced?method=browser&lat=${coords.lat}&lon=${coords.lon}`
						);
						locationData = response.data;
						setGeolocationPermission("granted");
					}
				} catch (browserError) {
					console.warn("Browser geolocation failed:", browserError);

					// If browser geolocation fails and fallback is enabled, try IP
					if (!fallbackToIP) {
						throw browserError;
					}
				}
			}

			// Fallback to IP-based detection
			if (!locationData && (fallbackToIP || !preferBrowserGeolocation)) {
				const response = await axios.get("/api/geolocation-enhanced?method=ip");
				locationData = response.data;
			}

			if (!locationData) {
				throw new Error("All geolocation methods failed");
			}

			setUserLocation(locationData);

			// Auto-set currency based on location if not explicitly set
			if (!targetCurrency && locationData.currency) {
				setCurrentCurrency(locationData.currency);
			}
		} catch (err) {
			console.error("Failed to fetch user location:", err);
			setError(
				err instanceof Error ? err.message : "Failed to detect location"
			);
		} finally {
			setIsLoading(false);
		}
	}, [
		enableAutoDetection,
		targetCurrency,
		preferBrowserGeolocation,
		fallbackToIP,
		checkGeolocationPermission,
		getBrowserLocation,
	]);

	// Request geolocation permission explicitly
	const requestGeolocationPermission = useCallback(async () => {
		try {
			setIsLoading(true);
			await getBrowserLocation();
			await fetchUserLocation();
		} catch (error) {
			console.error("Permission request failed:", error);
			setError("Geolocation permission required for accurate location");
		} finally {
			setIsLoading(false);
		}
	}, [getBrowserLocation, fetchUserLocation]);

	// Fetch exchange rate
	const fetchExchangeRate = useCallback(async (from: string, to: string) => {
		if (from === to) {
			setExchangeRate(1);
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await axios.get(
				`/api/exchange-rates?base=${from}&target=${to}`
			);
			setExchangeRate(response.data.rate);
		} catch (err) {
			console.error("Failed to fetch exchange rate:", err);
			setError("Failed to fetch exchange rate");
			setExchangeRate(1); // Fallback to 1:1 rate
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Convert amount with optional rounding
	const convertAmount = useCallback(
		(
			amount: number,
			customRate?: number,
			customTargetCurrency?: string
		): number => {
			const rate = customRate || exchangeRate || 1;
			const convertedAmount = amount * rate;

			if (!enableRounding) {
				return convertedAmount;
			}

			const targetCurr = customTargetCurrency || currentCurrency;
			const currencyInfo = CURRENCY_INFO[targetCurr];

			// Use custom rounding value if provided
			if (customRoundingValue) {
				switch (roundingMode) {
					case "up":
						return (
							Math.ceil(convertedAmount / customRoundingValue) *
							customRoundingValue
						);
					case "down":
						return (
							Math.floor(convertedAmount / customRoundingValue) *
							customRoundingValue
						);
					case "nearest":
					default:
						return (
							Math.round(convertedAmount / customRoundingValue) *
							customRoundingValue
						);
				}
			}

			// Default rounding based on currency
			const decimalPlaces = currencyInfo?.decimalPlaces ?? 2;

			if (decimalPlaces === 0) {
				switch (roundingMode) {
					case "up":
						return Math.ceil(convertedAmount);
					case "down":
						return Math.floor(convertedAmount);
					case "nearest":
					default:
						return Math.round(convertedAmount);
				}
			}

			const factor = Math.pow(10, decimalPlaces);
			switch (roundingMode) {
				case "up":
					return Math.ceil(convertedAmount * factor) / factor;
				case "down":
					return Math.floor(convertedAmount * factor) / factor;
				case "nearest":
				default:
					return Math.round(convertedAmount * factor) / factor;
			}
		},
		[
			exchangeRate,
			currentCurrency,
			enableRounding,
			roundingMode,
			customRoundingValue,
		]
	);

	// Format currency display
	const formatCurrency = useCallback(
		(amount: number, currencyCode?: string): string => {
			const currency = currencyCode || currentCurrency;
			const currencyInfo = CURRENCY_INFO[currency];

			if (!currencyInfo) {
				return `${amount.toFixed(2)} ${currency}`;
			}

			const decimalPlaces = currencyInfo.decimalPlaces;
			const formattedAmount = amount.toFixed(decimalPlaces);

			return `${currencyInfo.symbol}${formattedAmount}`;
		},
		[currentCurrency]
	);

	// Get currency info
	const getCurrencyInfo = useCallback(
		(currencyCode?: string): CurrencyInfo => {
			const currency = currencyCode || currentCurrency;
			return CURRENCY_INFO[currency] || CURRENCY_INFO.USD;
		},
		[currentCurrency]
	);

	// Manual currency change
	const changeCurrency = useCallback(
		(newCurrency: string) => {
			setCurrentCurrency(newCurrency);
			if (newCurrency !== baseCurrency) {
				fetchExchangeRate(baseCurrency, newCurrency);
			} else {
				setExchangeRate(1);
			}
		},
		[baseCurrency, fetchExchangeRate]
	);

	// Initialize
	useEffect(() => {
		fetchUserLocation();
		checkGeolocationPermission();
	}, [fetchUserLocation, checkGeolocationPermission]);

	// Fetch exchange rate when currency changes
	useEffect(() => {
		const targetCurr =
			targetCurrency ||
			(userLocation?.currency !== baseCurrency ? userLocation?.currency : null);

		if (targetCurr && targetCurr !== baseCurrency) {
			setCurrentCurrency(targetCurr);
			fetchExchangeRate(baseCurrency, targetCurr);
		}
	}, [userLocation, baseCurrency, targetCurrency, fetchExchangeRate]);

	return {
		// State
		userLocation,
		exchangeRate,
		currentCurrency,
		isLoading,
		error,
		geolocationPermission,

		// Methods
		convertAmount,
		formatCurrency,
		getCurrencyInfo,
		changeCurrency,
		fetchExchangeRate,
		requestGeolocationPermission,
		checkGeolocationPermission,

		// Utilities
		availableCurrencies: Object.keys(CURRENCY_INFO),
		baseCurrency,
	};
};

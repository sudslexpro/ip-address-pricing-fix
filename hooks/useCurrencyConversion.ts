import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface GeolocationData {
	country: string;
	countryName: string;
	currency: string;
	timezone: string;
	city?: string;
	region?: string;
	ip: string;
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
	HKD: {
		code: "HKD",
		symbol: "HK$",
		name: "Hong Kong Dollar",
		decimalPlaces: 2,
	},
	NZD: {
		code: "NZD",
		symbol: "NZ$",
		name: "New Zealand Dollar",
		decimalPlaces: 2,
	},
	SEK: { code: "SEK", symbol: "kr", name: "Swedish Krona", decimalPlaces: 2 },
	NOK: { code: "NOK", symbol: "kr", name: "Norwegian Krone", decimalPlaces: 2 },
	DKK: { code: "DKK", symbol: "kr", name: "Danish Krone", decimalPlaces: 2 },
	PLN: { code: "PLN", symbol: "zł", name: "Polish Zloty", decimalPlaces: 2 },
	CZK: { code: "CZK", symbol: "Kč", name: "Czech Koruna", decimalPlaces: 2 },
	HUF: {
		code: "HUF",
		symbol: "Ft",
		name: "Hungarian Forint",
		decimalPlaces: 0,
	},
	RUB: { code: "RUB", symbol: "₽", name: "Russian Ruble", decimalPlaces: 2 },
	BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real", decimalPlaces: 2 },
	MXN: { code: "MXN", symbol: "$", name: "Mexican Peso", decimalPlaces: 2 },
	ZAR: {
		code: "ZAR",
		symbol: "R",
		name: "South African Rand",
		decimalPlaces: 2,
	},
	KRW: { code: "KRW", symbol: "₩", name: "South Korean Won", decimalPlaces: 0 },
	THB: { code: "THB", symbol: "฿", name: "Thai Baht", decimalPlaces: 2 },
	MYR: {
		code: "MYR",
		symbol: "RM",
		name: "Malaysian Ringgit",
		decimalPlaces: 2,
	},
	PHP: { code: "PHP", symbol: "₱", name: "Philippine Peso", decimalPlaces: 2 },
	IDR: {
		code: "IDR",
		symbol: "Rp",
		name: "Indonesian Rupiah",
		decimalPlaces: 0,
	},
	VND: { code: "VND", symbol: "₫", name: "Vietnamese Dong", decimalPlaces: 0 },
	TWD: { code: "TWD", symbol: "NT$", name: "Taiwan Dollar", decimalPlaces: 2 },
	AED: { code: "AED", symbol: "د.إ", name: "UAE Dirham", decimalPlaces: 2 },
	SAR: { code: "SAR", symbol: "﷼", name: "Saudi Riyal", decimalPlaces: 2 },
	QAR: { code: "QAR", symbol: "ر.ق", name: "Qatari Riyal", decimalPlaces: 2 },
	KWD: { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar", decimalPlaces: 3 },
	BHD: {
		code: "BHD",
		symbol: ".د.ب",
		name: "Bahraini Dinar",
		decimalPlaces: 3,
	},
	OMR: { code: "OMR", symbol: "ر.ع.", name: "Omani Rial", decimalPlaces: 3 },
	EGP: { code: "EGP", symbol: "£", name: "Egyptian Pound", decimalPlaces: 2 },
	TRY: { code: "TRY", symbol: "₺", name: "Turkish Lira", decimalPlaces: 2 },
	ILS: { code: "ILS", symbol: "₪", name: "Israeli Shekel", decimalPlaces: 2 },
	CLP: { code: "CLP", symbol: "$", name: "Chilean Peso", decimalPlaces: 0 },
	COP: { code: "COP", symbol: "$", name: "Colombian Peso", decimalPlaces: 0 },
	PEN: { code: "PEN", symbol: "S/", name: "Peruvian Sol", decimalPlaces: 2 },
	ARS: { code: "ARS", symbol: "$", name: "Argentine Peso", decimalPlaces: 2 },
	UYU: { code: "UYU", symbol: "$U", name: "Uruguayan Peso", decimalPlaces: 2 },
};

export interface CurrencyConversionOptions {
	enableAutoDetection?: boolean;
	baseCurrency?: string;
	targetCurrency?: string;
	enableRounding?: boolean;
	roundingMode?: "up" | "down" | "nearest";
	customRoundingValue?: number;
}

export const useCurrencyConversion = (
	options: CurrencyConversionOptions = {}
) => {
	const {
		enableAutoDetection = true,
		baseCurrency = "USD",
		targetCurrency,
		enableRounding = true,
		roundingMode = "nearest",
		customRoundingValue,
	} = options;

	const [userLocation, setUserLocation] = useState<GeolocationData | null>(
		null
	);
	const [exchangeRate, setExchangeRate] = useState<number | null>(null);
	const [currentCurrency, setCurrentCurrency] = useState<string>(baseCurrency);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Fetch user location
	const fetchUserLocation = useCallback(async () => {
		if (!enableAutoDetection) return;

		setIsLoading(true);
		setError(null);

		try {
			const response = await axios.get("/api/geolocation");
			setUserLocation(response.data);

			// Auto-set currency based on location if not explicitly set
			if (!targetCurrency && response.data.currency) {
				setCurrentCurrency(response.data.currency);
			}
		} catch (err) {
			console.error("Failed to fetch user location:", err);
			setError("Failed to detect location");
		} finally {
			setIsLoading(false);
		}
	}, [enableAutoDetection, targetCurrency]);

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
	}, [fetchUserLocation]);

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

		// Methods
		convertAmount,
		formatCurrency,
		getCurrencyInfo,
		changeCurrency,
		fetchExchangeRate,

		// Utilities
		availableCurrencies: Object.keys(CURRENCY_INFO),
		baseCurrency,
	};
};

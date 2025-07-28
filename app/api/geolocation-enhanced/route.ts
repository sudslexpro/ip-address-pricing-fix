import { NextRequest, NextResponse } from "next/server";

// Country code to currency mapping for browser geolocation
const COUNTRY_CURRENCY_MAP: Record<string, string> = {
	US: "USD",
	CA: "CAD",
	GB: "GBP",
	EU: "EUR",
	DE: "EUR",
	FR: "EUR",
	IT: "EUR",
	ES: "EUR",
	JP: "JPY",
	AU: "AUD",
	NZ: "NZD",
	CN: "CNY",
	IN: "INR",
	SG: "SGD",
	HK: "HKD",
	CH: "CHF",
	SE: "SEK",
	NO: "NOK",
	DK: "DKK",
	PL: "PLN",
	CZ: "CZK",
	HU: "HUF",
	RU: "RUB",
	BR: "BRL",
	MX: "MXN",
	ZA: "ZAR",
	KR: "KRW",
	TH: "THB",
	MY: "MYR",
	PH: "PHP",
	ID: "IDR",
	VN: "VND",
	TW: "TWD",
	AE: "AED",
	SA: "SAR",
	QA: "QAR",
	KW: "KWD",
	BH: "BHD",
	OM: "OMR",
	EG: "EGP",
	TR: "TRY",
	IL: "ILS",
	CL: "CLP",
	CO: "COP",
	PE: "PEN",
	AR: "ARS",
	UY: "UYU",
};

async function reverseGeocode(lat: number, lon: number) {
	try {
		// Use a free reverse geocoding service
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=3&addressdetails=1`,
			{
				headers: {
					"User-Agent": "LexProtector-Portal/1.0",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Reverse geocoding failed");
		}

		const data = await response.json();
		const countryCode = data.address?.country_code?.toUpperCase();

		return {
			country: countryCode || "US",
			countryName: data.address?.country || "United States",
			currency: COUNTRY_CURRENCY_MAP[countryCode] || "USD",
			city: data.address?.city || data.address?.town || data.address?.village,
			region: data.address?.state || data.address?.region,
		};
	} catch (error) {
		console.error("Reverse geocoding error:", error);
		return {
			country: "US",
			countryName: "United States",
			currency: "USD",
		};
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const method = searchParams.get("method") || "ip"; // 'ip' or 'browser'
		const lat = searchParams.get("lat");
		const lon = searchParams.get("lon");

		// If browser geolocation coordinates are provided
		if (method === "browser" && lat && lon) {
			const latitude = parseFloat(lat);
			const longitude = parseFloat(lon);

			if (isNaN(latitude) || isNaN(longitude)) {
				throw new Error("Invalid coordinates");
			}

			const locationData = await reverseGeocode(latitude, longitude);

			return NextResponse.json({
				method: "browser",
				...locationData,
				coordinates: { lat: latitude, lon: longitude },
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				accuracy: "high",
			});
		}

		// Fallback to IP-based detection
		const forwarded = request.headers.get("x-forwarded-for");
		const ip =
			forwarded?.split(",")[0] ||
			request.headers.get("x-real-ip") ||
			"127.0.0.1";

		// For development, use a default location
		if (ip === "127.0.0.1" || ip === "::1") {
			return NextResponse.json({
				method: "ip",
				country: "US",
				countryName: "United States",
				currency: "USD",
				timezone: "America/New_York",
				ip: ip,
				accuracy: "low",
			});
		}

		// Use IP geolocation service
		const response = await fetch(`https://ipapi.co/${ip}/json/`);

		if (!response.ok) {
			throw new Error("Failed to fetch geolocation data");
		}

		const data = await response.json();

		return NextResponse.json({
			method: "ip",
			country: data.country_code || "US",
			countryName: data.country_name || "United States",
			currency: data.currency || "USD",
			timezone: data.timezone || "UTC",
			city: data.city,
			region: data.region,
			ip: ip,
			accuracy: "medium",
		});
	} catch (error) {
		console.error("Geolocation API error:", error);

		// Return default location on error
		return NextResponse.json({
			method: "fallback",
			country: "US",
			countryName: "United States",
			currency: "USD",
			timezone: "America/New_York",
			ip: "unknown",
			accuracy: "low",
			error: "Failed to detect location",
		});
	}
}

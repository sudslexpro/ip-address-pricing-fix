import { NextRequest, NextResponse } from "next/server";

// Currency codes for common countries
const COUNTRY_CURRENCIES: { [key: string]: string } = {
	US: "USD",
	IN: "INR",
	GB: "GBP",
	EU: "EUR",
	AU: "AUD",
	CA: "CAD",
	// Add more as needed
};

// Function to get location data for an IP
async function getLocationData(ip: string) {
	const API_KEY = process.env.ABSTRACT_API_KEY;

	if (!API_KEY) {
		throw new Error("ABSTRACT_API_KEY environment variable is not set");
	}

	const response = await fetch(
		`https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}`,
		{
			headers: {
				Accept: "application/json",
			},
			// Add timeout to prevent hanging requests
			signal: AbortSignal.timeout(5000),
		}
	);

	if (!response.ok) {
		// Check specific error codes
		if (response.status === 429) {
			console.warn("Rate limit hit for Abstract API");
			throw new Error("Rate limit exceeded");
		}
		throw new Error(`Failed to fetch geolocation data: ${response.status}`);
	}

	const data = await response.json();

	// Validate the response data
	if (!data.country_code) {
		throw new Error("Invalid response from Abstract API");
	}

	// Map the response to our expected format
	const countryCode = data.country_code;
	return {
		country: countryCode,
		countryName: data.country || "United States",
		currency:
			data.currency?.currency_code || COUNTRY_CURRENCIES[countryCode] || "USD",
		timezone: data.timezone?.name || "UTC",
		city: data.city,
		region: data.region,
		ip: ip,
	};
}

export async function GET(request: NextRequest) {
	try {
		// Get IP address from request headers
		const forwarded = request.headers.get("x-forwarded-for");
		const ip =
			forwarded?.split(",")[0] ||
			request.headers.get("x-real-ip") ||
			"127.0.0.1";

		// For development, if we get a loopback address, use a service to get our public IP
		if (ip === "127.0.0.1" || ip === "::1") {
			try {
				const publicIpResponse = await fetch(
					"https://api.ipify.org?format=json"
				);
				if (publicIpResponse.ok) {
					const publicIpData = await publicIpResponse.json();
					if (publicIpData.ip) {
						const locationData = await getLocationData(publicIpData.ip);
						return NextResponse.json(locationData, {
							headers: {
								"Cache-Control":
									"public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
							},
						});
					}
				}
			} catch (error) {
				console.warn("Failed to get public IP:", error);
			}
		}

		// Use the getLocationData function for the detected IP
		const locationData = await getLocationData(ip);
		return NextResponse.json(locationData, {
			headers: {
				// Cache successful responses for 1 hour
				"Cache-Control":
					"public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
			},
		});
	} catch (error) {
		console.error("Geolocation API error:", error);

		// Return default location on error
		return NextResponse.json(
			{
				country: "US",
				countryName: "United States",
				currency: "USD",
				timezone: "America/New_York",
				ip: "unknown",
				error: "Failed to detect location",
			},
			{
				headers: {
					// Cache error responses for 5 minutes
					"Cache-Control": "public, max-age=300, s-maxage=300",
				},
			}
		);
	}
}

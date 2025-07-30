import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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
	const API_KEY = process.env.NEXT_PUBLIC_ABSTRACT_API_KEY;

	if (!API_KEY) {
		console.error("API Key environment variable is not set");
		throw new Error(
			"NEXT_PUBLIC_ABSTRACT_API_KEY environment variable is not set"
		);
	}

	// Log the IP we're checking for debugging
	console.log("Checking location for IP:", ip);

	try {
		const response = await axios.get(
			`https://ipgeolocation.abstractapi.com/v1/`,
			{
				params: {
					api_key: API_KEY,
					ip_address: ip,
				},
				headers: {
					Accept: "application/json",
				},
				timeout: 5000, // 5 second timeout
			}
		);

		// With axios, successful response is in response.data
		const data = response.data;

		// Log the raw response for debugging
		console.log("Abstract API raw response:", data);

		// Validate the response data
		if (!data.country_code) {
			console.error("Invalid response - missing country_code:", data);
			throw new Error("Invalid response from Abstract API");
		}

		// Map the response to our expected format
		const countryCode = data.country_code;
		console.log("Detected country code:", countryCode);
		return {
			country: countryCode,
			countryName: data.country || "United States",
			currency:
				data.currency?.currency_code ||
				COUNTRY_CURRENCIES[countryCode] ||
				"USD",
			timezone: data.timezone?.name || "UTC",
			city: data.city,
			region: data.region,
			ip: ip,
		};
	} catch (error) {
		// Handle Axios errors
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 429) {
				console.warn("Rate limit hit for Abstract API");
				throw new Error("Rate limit exceeded");
			}
			throw new Error(
				`Failed to fetch geolocation data: ${
					error.response?.status || error.message
				}`
			);
		}
		throw error;
	}
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
				const publicIpResponse = await axios.get(
					"https://api.ipify.org?format=json"
				);
				if (publicIpResponse.data?.ip) {
					const locationData = await getLocationData(publicIpResponse.data.ip);
					return NextResponse.json(locationData, {
						headers: {
							"Cache-Control":
								"public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
						},
					});
				}
			} catch (error) {
				console.warn(
					"Failed to get public IP:",
					error instanceof Error ? error.message : error
				);
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

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		// Get IP address from request headers
		const forwarded = request.headers.get("x-forwarded-for");
		const ip =
			forwarded?.split(",")[0] ||
			request.headers.get("x-real-ip") ||
			"127.0.0.1";

		// For development, use a default location
		if (ip === "127.0.0.1" || ip === "::1") {
			return NextResponse.json({
				country: "US",
				countryName: "United States",
				currency: "USD",
				timezone: "America/New_York",
				ip: ip,
			});
		}

		// Use a free IP geolocation service
		const response = await fetch(`https://ipapi.co/${ip}/json/`);

		if (!response.ok) {
			throw new Error("Failed to fetch geolocation data");
		}

		const data = await response.json();

		return NextResponse.json({
			country: data.country_code || "US",
			countryName: data.country_name || "United States",
			currency: data.currency || "USD",
			timezone: data.timezone || "UTC",
			city: data.city,
			region: data.region,
			ip: ip,
		});
	} catch (error) {
		console.error("Geolocation API error:", error);

		// Return default location on error
		return NextResponse.json({
			country: "US",
			countryName: "United States",
			currency: "USD",
			timezone: "America/New_York",
			ip: "unknown",
			error: "Failed to detect location",
		});
	}
}

import { NextResponse } from "next/server";

/**
 * Health check endpoint for connectivity testing
 * Returns a simple OK response with timestamp
 */
export async function GET() {
	return NextResponse.json(
		{
			status: "ok",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
		},
		{
			status: 200,
			headers: {
				"Cache-Control": "no-cache, no-store, must-revalidate",
				Pragma: "no-cache",
				Expires: "0",
			},
		}
	);
}

/**
 * HEAD request for lightweight connectivity checks
 */
export async function HEAD() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Pragma: "no-cache",
			Expires: "0",
		},
	});
}

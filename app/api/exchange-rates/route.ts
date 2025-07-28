import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const baseCurrency = searchParams.get("base") || "USD";
		const targetCurrency = searchParams.get("target");

		// Use a free exchange rate API (exchangerate-api.com)
		const response = await fetch(
			`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch exchange rates");
		}

		const data = await response.json();

		// If specific target currency requested, return just that rate
		if (targetCurrency) {
			const rate = data.rates[targetCurrency];
			if (!rate) {
				return NextResponse.json(
					{ error: `Exchange rate not found for ${targetCurrency}` },
					{ status: 404 }
				);
			}

			return NextResponse.json({
				base: baseCurrency,
				target: targetCurrency,
				rate: rate,
				lastUpdated: data.date,
			});
		}

		// Return all rates
		return NextResponse.json({
			base: baseCurrency,
			rates: data.rates,
			lastUpdated: data.date,
		});
	} catch (error) {
		console.error("Exchange rates API error:", error);

		return NextResponse.json(
			{ error: "Failed to fetch exchange rates" },
			{ status: 500 }
		);
	}
}

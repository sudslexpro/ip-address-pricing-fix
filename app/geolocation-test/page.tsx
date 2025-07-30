"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface GeoLocation {
	country: string;
	countryName: string;
	currency: string;
	timezone: string;
	city: string | null;
	region: string | null;
	ip: string;
	error?: string;
}

export default function GeolocationTest() {
	const [location, setLocation] = useState<GeoLocation | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [rawResponse, setRawResponse] = useState<string | null>(null);

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				setLoading(true);
				setError(null);

				// Make two calls - one to our API and one directly to Abstract API for comparison
				const [localResponse, abstractResponse] = await Promise.all([
					fetch("/api/geolocation"),
					fetch(
						`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}`
					),
				]);

				if (!localResponse.ok) {
					throw new Error(
						`Local API error: ${localResponse.status} ${localResponse.statusText}`
					);
				}

				const localData = await localResponse.json();
				const abstractData = abstractResponse.ok
					? await abstractResponse.json()
					: "Failed to fetch";

				setLocation(localData);
				setRawResponse(JSON.stringify(abstractData, null, 2));
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch location"
				);
				console.error("Geolocation fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchLocation();
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="animate-pulse text-lg">Loading location data...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Card className="p-6 bg-destructive/10 text-destructive">
					<h2 className="text-lg font-semibold mb-2">Error Loading Location</h2>
					<p>{error}</p>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10 space-y-8">
			<h1 className="text-3xl font-bold mb-6">Geolocation Test Page</h1>

			{location && (
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-4">
						Processed Location Data
					</h2>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Property</TableHead>
								<TableHead>Value</TableHead>
								<TableHead>Notes</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Object.entries(location).map(([key, value]) => (
								<TableRow key={key}>
									<TableCell className="font-medium">{key}</TableCell>
									<TableCell>
										{value === null ? "Not Available" : value}
									</TableCell>
									<TableCell className="text-muted-foreground text-sm">
										{key === "ip" &&
											value === "::1" &&
											"Local IPv6 address - using ipify.org to get public IP"}
										{key === "ip" &&
											value === "127.0.0.1" &&
											"Local IPv4 address - using ipify.org to get public IP"}
										{(key === "city" || key === "region") &&
											value === null &&
											"Not available for this IP address"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
			)}

			{rawResponse && (
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-4">
						Raw Abstract API Response
					</h2>
					<pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
						{rawResponse}
					</pre>
				</Card>
			)}
		</div>
	);
}

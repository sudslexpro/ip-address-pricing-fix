"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw, User, Clock } from "lucide-react";

export default function TestLoginPage() {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<any>(null);
	const [error, setError] = useState("");

	const testLoginUpdate = async () => {
		setLoading(true);
		setError("");
		setResult(null);

		try {
			const response = await fetch("/api/test-login-update", {
				method: "POST",
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to update login time");
			}

			setResult(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const getCurrentUser = async () => {
		setLoading(true);
		setError("");
		setResult(null);

		try {
			const response = await fetch("/api/test-login-update", {
				method: "GET",
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to fetch user data");
			}

			setResult(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (!session) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Card className="w-96">
					<CardHeader>
						<CardTitle>Authentication Required</CardTitle>
						<CardDescription>
							Please sign in to test login tracking
						</CardDescription>
					</CardHeader>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-2xl mx-auto space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Login Activity Test
						</CardTitle>
						<CardDescription>
							Test the lastLoginAt tracking functionality
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<Button
								onClick={getCurrentUser}
								disabled={loading}
								variant="outline"
								className="flex items-center gap-2">
								<Clock className="h-4 w-4" />
								Get Current Data
							</Button>
							<Button
								onClick={testLoginUpdate}
								disabled={loading}
								className="flex items-center gap-2">
								<RefreshCw
									className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
								/>
								Update Login Time
							</Button>
						</div>

						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						{result && (
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Result</CardTitle>
								</CardHeader>
								<CardContent>
									<pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
										{JSON.stringify(result, null, 2)}
									</pre>
								</CardContent>
							</Card>
						)}

						<div className="text-sm text-gray-600">
							<p>
								<strong>Current Session:</strong>
							</p>
							<ul className="list-disc list-inside space-y-1">
								<li>Email: {session.user?.email}</li>
								<li>Name: {session.user?.name}</li>
								<li>Role: {(session.user as any)?.role}</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

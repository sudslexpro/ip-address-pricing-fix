"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DebugAuthPage() {
	const { data: session, status } = useSession();
	const [testResult, setTestResult] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const testLastLoginUpdate = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/test-login-update", {
				method: "POST",
			});
			const data = await response.json();
			setTestResult(data);
		} catch (error) {
			setTestResult({
				error: error instanceof Error ? error.message : "Unknown error",
			});
		} finally {
			setLoading(false);
		}
	};

	const getCurrentUserData = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/test-login-update", {
				method: "GET",
			});
			const data = await response.json();
			setTestResult(data);
		} catch (error) {
			setTestResult({
				error: error instanceof Error ? error.message : "Unknown error",
			});
		} finally {
			setLoading(false);
		}
	};

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (!session) {
		return (
			<div className="container mx-auto p-8">
				<Card>
					<CardHeader>
						<CardTitle>Debug Auth - Not Authenticated</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Please sign in to test the authentication functionality.</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8 space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Authentication Debug Panel</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<h3 className="font-semibold">Current Session:</h3>
						<pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
							{JSON.stringify(session, null, 2)}
						</pre>
					</div>

					<div className="flex gap-2">
						<Button onClick={getCurrentUserData} disabled={loading}>
							Get Current User Data
						</Button>
						<Button onClick={testLastLoginUpdate} disabled={loading}>
							Test Update LastLoginAt
						</Button>
					</div>

					{testResult && (
						<div>
							<h3 className="font-semibold">Test Result:</h3>
							<pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
								{JSON.stringify(testResult, null, 2)}
							</pre>
						</div>
					)}

					<div>
						<h3 className="font-semibold">User Info:</h3>
						<div className="space-y-2">
							<p>
								<strong>Email:</strong> {session.user?.email}
							</p>
							<p>
								<strong>Name:</strong> {session.user?.name}
							</p>
							<p>
								<strong>ID:</strong> {session.user?.id}
							</p>
							<p>
								<strong>Role:</strong> <Badge>{session.user?.role}</Badge>
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const errorMessages = {
	Configuration: "There is a problem with the server configuration.",
	AccessDenied: "You do not have permission to sign in.",
	Verification: "The verification token has expired or has already been used.",
	OAuthCallback:
		"There was an error with the OAuth provider. This could be due to a network timeout or configuration issue.",
	Default: "An unexpected error occurred during authentication.",
};

function AuthErrorContent() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error") as keyof typeof errorMessages;

	const errorMessage = errorMessages[error] || errorMessages.Default;
	const isOAuthError = error === "OAuthCallback";

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl text-center">
						Authentication Error
					</CardTitle>
					<CardDescription className="text-center">
						{isOAuthError ? "OAuth Connection Issue" : "Sign in failed"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert variant="destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>

					{isOAuthError && (
						<div className="space-y-3">
							<div className="text-sm text-muted-foreground">
								<p className="font-medium mb-2">Troubleshooting steps:</p>
								<ul className="space-y-1 text-xs">
									<li>• Check your internet connection</li>
									<li>• Clear browser cache and cookies</li>
									<li>• Try signing in again</li>
									<li>• Use a different browser if the issue persists</li>
								</ul>
							</div>
						</div>
					)}

					<div className="flex flex-col space-y-2">
						<Button asChild className="w-full">
							<Link href="/auth/signin">
								<RefreshCw className="w-4 h-4 mr-2" />
								Try Again
							</Link>
						</Button>
						<Button variant="outline" asChild className="w-full">
							<Link href="/">Back to Home</Link>
						</Button>
					</div>

					{process.env.NODE_ENV === "development" && (
						<div className="mt-4 p-3 bg-muted rounded-md">
							<p className="text-xs text-muted-foreground">
								<strong>Debug Info:</strong> Error type: {error || "Unknown"}
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default function AuthErrorPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center p-4">
					<Card className="w-full max-w-md">
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl text-center">
								Authentication Error
							</CardTitle>
							<CardDescription className="text-center">
								Loading...
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			}>
			<AuthErrorContent />
		</Suspense>
	);
}

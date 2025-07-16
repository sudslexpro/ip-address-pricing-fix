"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPasswordPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/forgot-password", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (response.ok) {
				setSuccess(true);
			} else {
				setError(data.message || "Failed to send reset email");
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (success) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold text-center">
							Check your email
						</CardTitle>
						<CardDescription className="text-center">
							We&apos;ve sent a password reset link to {email}
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Alert>
							<AlertDescription>
								If you don&apos;t see the email, check your spam folder or try
								again with a different email address.
							</AlertDescription>
						</Alert>
					</CardContent>
					<CardFooter>
						<Link href="/auth/signin" className="w-full">
							<Button variant="outline" className="w-full">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to sign in
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Forgot your password?
					</CardTitle>
					<CardDescription className="text-center">
						Enter your email address and we&apos;ll send you a link to reset
						your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant="destructive" className="mb-4">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="pl-10"
									required
								/>
							</div>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Sending..." : "Send reset link"}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<Link href="/auth/signin" className="w-full">
						<Button variant="outline" className="w-full">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to sign in
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ForgotPasswordPage;

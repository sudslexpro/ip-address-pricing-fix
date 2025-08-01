"use client";

import React, { useState, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FaGoogle, FaFacebook, FaXTwitter } from "react-icons/fa6";

const SignInForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid email or password");
			} else {
				router.push(callbackUrl);
				router.refresh();
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleOAuthSignIn = async (provider: string) => {
		setIsLoading(true);
		try {
			await signIn(provider, { callbackUrl });
		} catch (error) {
			setError(`Failed to sign in with ${provider}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Welcome back
					</CardTitle>
					<CardDescription className="text-center">
						Sign in to your Lex Protector account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{/* OAuth Providers */}
					<div className="grid grid-cols-1 gap-3">
						<Button
							variant="outline"
							onClick={() => handleOAuthSignIn("google")}
							disabled={isLoading}
							className="w-full hover:text-white h-12 text-md">
							<FaGoogle className="mr-2 h-12 w-12 text-blue-500" />
							Continue with Google
						</Button>
						<Button
							variant="outline"
							onClick={() => handleOAuthSignIn("facebook")}
							disabled={isLoading}
							className="w-full hover:text-white h-12 text-md">
							<FaFacebook className="mr-2 h-12 w-12 text-blue-600" />
							Continue with Facebook
						</Button>
						<Button
							variant="outline"
							onClick={() => handleOAuthSignIn("x")}
							disabled={isLoading}
							className="w-full hover:text-white h-12 text-md">
							<FaXTwitter className="mr-2 h-12 w-12 text-black dark:text-white" />
							Continue with X
						</Button>
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<Separator className="w-full" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground dark:text-blue-600">
								Or continue with email
							</span>
						</div>
					</div>

					{/* Email/Password Form */}
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

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="pl-10 pr-10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<Link
								href="/auth/forgot-password"
								className="text-sm text-primary dark:text-blue-600 hover:underline">
								Forgot your password?
							</Link>
						</div>

						<Button type="submit" className="w-full dark:bg-blue-600 dark:text-white" disabled={isLoading}>
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className="text-center text-sm text-muted-foreground dark:text-white w-full">
						Don&apos;t have an account?{" "}
						<Link href="/auth/signup" className="text-primary dark:text-blue-600 hover:underline">
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

const SignInPage: React.FC = () => {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
						<p className="mt-2 text-gray-600">Loading...</p>
					</div>
				</div>
			}>
			<SignInForm />
		</Suspense>
	);
};

export default SignInPage;

"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { FaGoogle, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const SignUpPage: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess("");

		// Validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		if (formData.password.length < 8) {
			setError("Password must be at least 8 characters long");
			setIsLoading(false);
			return;
		}

		if (!acceptTerms) {
			setError("Please accept the terms and conditions");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setSuccess("Account created successfully! Redirecting to sign in...");
				setTimeout(() => {
					router.push("/auth/signin");
				}, 2000);
			} else {
				setError(data.message || "Failed to create account");
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
			await signIn(provider, { callbackUrl: "/" });
		} catch (error) {
			setError(`Failed to sign in with ${provider}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Create an account
					</CardTitle>
					<CardDescription className="text-center">
						Get started with your Lex Protector account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{success && (
						<Alert>
							<AlertDescription>{success}</AlertDescription>
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
							onClick={() => handleOAuthSignIn("twitter")}
							disabled={isLoading}
							className="w-full hover:text-white h-12 text-md">
							<FaXTwitter className="mr-2 h-12 w-12 text-black" />
							Continue with X
						</Button>
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<Separator className="w-full" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with email
							</span>
						</div>
					</div>

					{/* Email/Password Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<div className="relative">
								<User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="name"
									name="name"
									type="text"
									placeholder="Enter your full name"
									value={formData.name}
									onChange={handleInputChange}
									className="pl-10"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={handleInputChange}
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
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Create a password"
									value={formData.password}
									onChange={handleInputChange}
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

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm your password"
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className="pl-10 pr-10"
									required
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
									{showConfirmPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="terms"
								checked={acceptTerms}
								onCheckedChange={(checked) => setAcceptTerms(checked === true)}
							/>
							<Label htmlFor="terms" className="text-sm">
								I agree to the{" "}
								<Link
									href="/terms-of-service"
									className="text-primary hover:underline">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="/privacy-policy"
									className="text-primary hover:underline">
									Privacy Policy
								</Link>
							</Label>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Creating account..." : "Create account"}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className="text-center text-sm text-muted-foreground w-full">
						Already have an account?{" "}
						<Link href="/auth/signin" className="text-primary hover:underline">
							Sign in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default SignUpPage;

"use client";

import React from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Chrome,
	Facebook,
	Twitter,
	Mail,
	Lock,
	CheckCircle,
} from "lucide-react";

const TestAuthPage: React.FC = () => {
	const { data: session, status } = useSession();

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Authentication System Test
					</h1>
					<p className="text-gray-600 text-lg">
						Test all authentication methods and view session information
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Authentication Status */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CheckCircle className="h-5 w-5" />
								Authentication Status
							</CardTitle>
						</CardHeader>
						<CardContent>
							{status === "loading" && (
								<Alert>
									<AlertDescription>Loading session...</AlertDescription>
								</Alert>
							)}

							{status === "unauthenticated" && (
								<Alert>
									<AlertDescription>Not authenticated</AlertDescription>
								</Alert>
							)}

							{status === "authenticated" && session && (
								<div className="space-y-4">
									<Alert>
										<CheckCircle className="h-4 w-4" />
										<AlertDescription>
											Successfully authenticated!
										</AlertDescription>
									</Alert>

									<div className="space-y-2">
										<p>
											<strong>Name:</strong> {session.user.name}
										</p>
										<p>
											<strong>Email:</strong> {session.user.email}
										</p>
										<p>
											<strong>Role:</strong> <Badge>{session.user.role}</Badge>
										</p>
										{session.user.image && (
											<p>
												<strong>Avatar:</strong>
												<Image
													src={session.user.image}
													alt="Avatar"
													width={32}
													height={32}
													className="inline-block w-8 h-8 rounded-full ml-2"
												/>
											</p>
										)}
									</div>

									<Button onClick={() => signOut()} variant="outline">
										Sign Out
									</Button>
								</div>
							)}
						</CardContent>
					</Card>

					{/* OAuth Providers */}
					<Card>
						<CardHeader>
							<CardTitle>OAuth Authentication</CardTitle>
							<CardDescription>Test social login providers</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button
								onClick={() => signIn("google")}
								variant="outline"
								className="w-full justify-start"
								disabled={status === "authenticated"}>
								<Chrome className="mr-2 h-4 w-4" />
								Sign in with Google
							</Button>

							<Button
								onClick={() => signIn("facebook")}
								variant="outline"
								className="w-full justify-start"
								disabled={status === "authenticated"}>
								<Facebook className="mr-2 h-4 w-4" />
								Sign in with Facebook
							</Button>

							<Button
								onClick={() => signIn("twitter")}
								variant="outline"
								className="w-full justify-start"
								disabled={status === "authenticated"}>
								<Twitter className="mr-2 h-4 w-4" />
								Sign in with Twitter
							</Button>
						</CardContent>
					</Card>

					{/* Email/Password Authentication */}
					<Card>
						<CardHeader>
							<CardTitle>Email/Password Authentication</CardTitle>
							<CardDescription>
								Test credentials-based authentication
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button
								onClick={() => signIn(undefined, { callbackUrl: "/test-auth" })}
								variant="outline"
								className="w-full justify-start"
								disabled={status === "authenticated"}>
								<Mail className="mr-2 h-4 w-4" />
								Sign in with Email
							</Button>

							<Button
								onClick={() => window.open("/auth/signup", "_blank")}
								variant="outline"
								className="w-full justify-start">
								<Lock className="mr-2 h-4 w-4" />
								Create New Account
							</Button>
						</CardContent>
					</Card>

					{/* Session Details */}
					<Card>
						<CardHeader>
							<CardTitle>Session Details</CardTitle>
							<CardDescription>Raw session data for debugging</CardDescription>
						</CardHeader>
						<CardContent>
							<pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-64">
								{JSON.stringify({ session, status }, null, 2)}
							</pre>
						</CardContent>
					</Card>
				</div>

				{/* API Endpoints */}
				<Card className="mt-6">
					<CardHeader>
						<CardTitle>Available API Endpoints</CardTitle>
						<CardDescription>
							Authentication-related API endpoints in this application
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h4 className="font-semibold mb-2">Authentication</h4>
								<ul className="space-y-1 text-sm">
									<li>
										<code>/api/auth/signin</code> - Sign in
									</li>
									<li>
										<code>/api/auth/signout</code> - Sign out
									</li>
									<li>
										<code>/api/auth/session</code> - Get session
									</li>
									<li>
										<code>/api/auth/register</code> - Register user
									</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold mb-2">OAuth Callbacks</h4>
								<ul className="space-y-1 text-sm">
									<li>
										<code>/api/auth/callback/google</code>
									</li>
									<li>
										<code>/api/auth/callback/facebook</code>
									</li>
									<li>
										<code>/api/auth/callback/twitter</code>
									</li>
									<li>
										<code>/api/auth/callback/credentials</code>
									</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Quick Links */}
				<div className="mt-6 text-center space-x-4">
					<Button onClick={() => window.open("/dashboard", "_blank")}>
						Go to Dashboard
					</Button>
					<Button
						variant="outline"
						onClick={() => window.open("/auth/signin", "_blank")}>
						Sign In Page
					</Button>
					<Button
						variant="outline"
						onClick={() => window.open("/auth/signup", "_blank")}>
						Sign Up Page
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TestAuthPage;

"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Shield,
	User,
	Settings,
	TestTube,
	Lock,
	ArrowRight,
	Code,
	Database,
	Monitor,
} from "lucide-react";

export const DevAuthPage: React.FC = () => {
	const { data: session, status } = useSession();

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Dev Header */}
			<header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
								<Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
							</div>
							<div>
								<h1 className="text-xl font-bold text-slate-900 dark:text-white">
									Developer Portal
								</h1>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									Authentication & Dashboard Access
								</p>
							</div>
						</div>
						<Badge
							variant="outline"
							className="bg-yellow-50 text-yellow-700 border-yellow-200">
							Development Environment
						</Badge>
					</div>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8">
				{/* Warning Banner */}
				<div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
					<div className="flex items-center space-x-2">
						<Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
						<p className="text-sm text-yellow-800 dark:text-yellow-200">
							<strong>Development Access Only:</strong> This route is for
							internal development and testing purposes. Regular users should
							access authentication through the main portal.
						</p>
					</div>
				</div>

				{/* Current Session Status */}
				<Card className="mb-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Monitor className="h-5 w-5" />
							<span>Current Session Status</span>
						</CardTitle>
						<CardDescription>
							Your current authentication state and access level
						</CardDescription>
					</CardHeader>
					<CardContent>
						{status === "loading" ? (
							<div className="flex items-center space-x-2">
								<div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
								<span className="text-slate-600 dark:text-slate-400">
									Loading session...
								</span>
							</div>
						) : session?.user ? (
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<Badge
										variant="default"
										className="bg-green-100 text-green-800 border-green-200">
										Authenticated
									</Badge>
									<span className="text-sm text-slate-600 dark:text-slate-400">
										Signed in as <strong>{session.user.name}</strong>
									</span>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="flex items-center space-x-2">
										<User className="h-4 w-4 text-slate-500" />
										<span className="text-sm">
											<strong>Email:</strong> {session.user.email}
										</span>
									</div>
									<div className="flex items-center space-x-2">
										<Shield className="h-4 w-4 text-slate-500" />
										<span className="text-sm">
											<strong>Role:</strong> {session.user.role || "User"}
										</span>
									</div>
									<div className="flex items-center space-x-2">
										<Database className="h-4 w-4 text-slate-500" />
										<span className="text-sm">
											<strong>ID:</strong> {session.user.id}
										</span>
									</div>
								</div>
							</div>
						) : (
							<div className="flex items-center space-x-3">
								<Badge
									variant="outline"
									className="bg-slate-100 text-slate-700 border-slate-200">
									Not Authenticated
								</Badge>
								<span className="text-sm text-slate-600 dark:text-slate-400">
									No active session found
								</span>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Authentication Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{/* Sign In Card */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Lock className="h-5 w-5" />
								<span>Developer Sign In</span>
							</CardTitle>
							<CardDescription>
								Access the internal authentication system for dashboard testing
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{session?.user ? (
								<div className="space-y-3">
									<p className="text-sm text-green-600 dark:text-green-400">
										✓ Already authenticated
									</p>
									<Link href="/dashboard">
										<Button className="w-full">
											<Monitor className="mr-2 h-4 w-4" />
											Access Dashboard
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</Link>
								</div>
							) : (
								<div className="space-y-3">
									<Link href="/auth/signin">
										<Button variant="outline" className="w-full">
											<User className="mr-2 h-4 w-4" />
											Sign In to Dashboard
										</Button>
									</Link>
									<Link href="/auth/signup">
										<Button className="w-full">
											<Shield className="mr-2 h-4 w-4" />
											Create Developer Account
										</Button>
									</Link>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Quick Actions Card */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<TestTube className="h-5 w-5" />
								<span>Development Tools</span>
							</CardTitle>
							<CardDescription>
								Quick access to testing and debugging features
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<Link href="/test-auth">
								<Button
									variant="outline"
									size="sm"
									className="w-full justify-start">
									<Settings className="mr-2 h-4 w-4" />
									Test Authentication
								</Button>
							</Link>
							<Link href="/debug-auth">
								<Button
									variant="outline"
									size="sm"
									className="w-full justify-start">
									<Code className="mr-2 h-4 w-4" />
									Debug Auth State
								</Button>
							</Link>
							<Link href="/test-online-status">
								<Button
									variant="outline"
									size="sm"
									className="w-full justify-start">
									<Monitor className="mr-2 h-4 w-4" />
									Test Online Status
								</Button>
							</Link>
							<Link href="/modal-showcase">
								<Button
									variant="outline"
									size="sm"
									className="w-full justify-start">
									<Database className="mr-2 h-4 w-4" />
									Modal Components Showcase
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>

				{/* Information Panel */}
				<Card>
					<CardHeader>
						<CardTitle>Development Information</CardTitle>
						<CardDescription>
							Important details about this development environment
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold text-slate-900 dark:text-white mb-2">
									Production Authentication
								</h4>
								<ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
									<li>• Sign In: partner.lexprotector.com/login</li>
									<li>• Sign Up: partner.lexprotector.com/signup</li>
									<li>• Main Portal: partner.lexprotector.com</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold text-slate-900 dark:text-white mb-2">
									Development Routes
								</h4>
								<ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
									<li>• Development Access: /dev</li>
									<li>• Dashboard: /dashboard</li>
									<li>• Auth Testing: /test-auth</li>
								</ul>
							</div>
						</div>

						<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
							<p className="text-sm text-blue-800 dark:text-blue-200">
								<strong>Note:</strong> This development route (/dev) provides
								internal access to the dashboard system. The main site
								authentication buttons now redirect to the production partner
								portal for regular users.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

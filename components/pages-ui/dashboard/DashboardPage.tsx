"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	User,
	Mail,
	Calendar,
	Shield,
	Settings,
	LogOut,
	Clock,
	Activity,
} from "lucide-react";

const DashboardPage: React.FC = () => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-pulse">Loading...</div>
			</div>
		);
	}

	if (!session?.user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Please sign in to access your dashboard.</div>
			</div>
		);
	}

	const handleSignOut = () => {
		signOut({ callbackUrl: "/" });
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
					<p className="text-gray-600 mt-2">
						Manage your Lex Protector account and settings
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* User Profile Card */}
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="h-5 w-5" />
								Profile Information
							</CardTitle>
							<CardDescription>
								Your account details and preferences
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center space-x-4">
								<Avatar className="h-16 w-16">
									<AvatarImage
										src={session.user.image || ""}
										alt={session.user.name || ""}
									/>
									<AvatarFallback>
										{session.user.name
											?.split(" ")
											.map((n) => n[0])
											.join("") || "U"}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<h3 className="text-xl font-semibold">{session.user.name}</h3>
									<div className="flex items-center text-gray-600">
										<Mail className="h-4 w-4 mr-2" />
										{session.user.email}
									</div>
									<Badge variant="secondary" className="mt-1">
										<Shield className="h-3 w-3 mr-1" />
										{session.user.role || "USER"}
									</Badge>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<h4 className="font-medium text-gray-900">Account Status</h4>
									<Badge variant="default">Active</Badge>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium text-gray-900">Member Since</h4>
									<div className="flex items-center text-gray-600">
										<Calendar className="h-4 w-4 mr-2" />
										{new Date().toLocaleDateString()}
									</div>
								</div>
							</div>

							<div className="flex gap-3">
								<Button variant="outline" className="flex items-center gap-2">
									<Settings className="h-4 w-4" />
									Edit Profile
								</Button>
								<Button
									variant="outline"
									onClick={handleSignOut}
									className="flex items-center gap-2">
									<LogOut className="h-4 w-4" />
									Sign Out
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Quick Actions */}
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Activity className="h-5 w-5" />
									Quick Actions
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<Button className="w-full justify-start" variant="outline">
									<Settings className="h-4 w-4 mr-2" />
									Account Settings
								</Button>
								<Button className="w-full justify-start" variant="outline">
									<Shield className="h-4 w-4 mr-2" />
									Security Settings
								</Button>
								<Button className="w-full justify-start" variant="outline">
									<Mail className="h-4 w-4 mr-2" />
									Email Preferences
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Clock className="h-5 w-5" />
									Recent Activity
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-3 text-sm">
									<div className="flex items-center justify-between">
										<span>Last login</span>
										<span className="text-gray-600">Today</span>
									</div>
									<div className="flex items-center justify-between">
										<span>Account created</span>
										<span className="text-gray-600">Recently</span>
									</div>
									<div className="flex items-center justify-between">
										<span>Profile updated</span>
										<span className="text-gray-600">N/A</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Additional Features */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Integration</CardTitle>
							<CardDescription>Connect with external services</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full" variant="outline">
								View Integrations
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>API Access</CardTitle>
							<CardDescription>Manage your API keys and access</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full" variant="outline">
								API Documentation
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Support</CardTitle>
							<CardDescription>Get help and contact support</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full" variant="outline">
								Help Center
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;

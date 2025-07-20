"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import DashboardTabs from "./DashboardTabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Crown, Shield, User } from "lucide-react";

const DashboardPage: React.FC = () => {
	const { session, status, role, permissions, isLoading, isAuthenticated } =
		useRole();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-pulse">Loading...</div>
			</div>
		);
	}

	if (!isAuthenticated || !session?.user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						Please sign in to access your dashboard.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	const handleSignOut = () => {
		signOut({ callbackUrl: "/" });
	};

	const getRoleBasedWelcome = () => {
		switch (role) {
			case "SUPER_ADMIN":
				return {
					title: "System Administration Dashboard",
					subtitle: "Complete system oversight and management capabilities",
					icon: Crown,
					color: "text-purple-600",
				};
			case "ADMIN":
				return {
					title: "Administration Dashboard",
					subtitle: "User management and system monitoring tools",
					icon: Shield,
					color: "text-blue-600",
				};
			case "USER":
			default:
				return {
					title: "Welcome back!",
					subtitle: "Manage your Lex Protector account and quotes",
					icon: User,
					color: "text-green-600",
				};
		}
	};

	const welcome = getRoleBasedWelcome();
	const IconComponent = welcome.icon;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-4">
						<div
							className={`p-2 rounded-lg bg-white shadow-sm ${welcome.color}`}>
							<IconComponent className="h-6 w-6" />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								{welcome.title}
							</h1>
							<p className="text-gray-600 mt-1">{welcome.subtitle}</p>
						</div>
					</div>
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<span>Current Role:</span>
						<span className={`font-medium ${welcome.color}`}>
							{role || "USER"}
						</span>
						{role === "SUPER_ADMIN" && (
							<span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
								Full Access
							</span>
						)}
						{role === "ADMIN" && (
							<span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
								Administrative Access
							</span>
						)}
					</div>
				</div>

				{/* Dashboard Content */}
				<DashboardTabs
					role={role || "USER"}
					permissions={permissions}
					user={session.user}
					onSignOut={handleSignOut}
				/>
			</div>
		</div>
	);
};

export default DashboardPage;

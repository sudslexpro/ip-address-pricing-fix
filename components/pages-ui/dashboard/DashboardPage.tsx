"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import DashboardLayout from "./DashboardLayout";
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
		<div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
			{/* Dashboard Content with Sidebar - Full height container */}
			<div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
				<DashboardLayout
					role={role || "USER"}
					permissions={permissions}
					user={session.user}
					onSignOut={handleSignOut}
					welcome={welcome}
					IconComponent={IconComponent}
				/>
			</div>
		</div>
	);
};

export default DashboardPage;

"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import DashboardSidebar from "./DashboardSidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Crown, Shield, User } from "lucide-react";

interface DashboardLayoutClientProps {
	children: React.ReactNode;
}

const DashboardLayoutClient: React.FC<DashboardLayoutClientProps> = ({
	children,
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const { session, status, role, permissions, isLoading, isAuthenticated } =
		useRole();
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="animate-pulse">Loading...</div>
			</div>
		);
	}

	if (!isAuthenticated || !session?.user) {
		return (
			<div className="h-full flex items-center justify-center">
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

	const handleToggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
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

	// Extract current section from pathname
	const pathParts = pathname.split("/");
	const currentSection = pathParts[2] || "overview";

	const handleSectionChange = (section: string) => {
		router.push(`/dashboard/${section}`);
	};

	return (
		<div className="flex h-full">
			{/* Sidebar */}
			<DashboardSidebar
				role={role || "USER"}
				activeSection={currentSection}
				onSectionChange={handleSectionChange}
				collapsed={sidebarCollapsed}
				onToggleCollapse={handleToggleSidebar}
			/>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Role-based Welcome Header */}
				<div className="border-b border-border bg-background px-6 py-4">
					<div className="flex items-center gap-3 mb-3">
						<div
							className={`p-2 rounded-lg bg-card shadow-sm ${welcome.color}`}>
							<IconComponent className="h-6 w-6" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-foreground">
								{welcome.title}
							</h1>
							<p className="text-muted-foreground text-sm">
								{welcome.subtitle}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<span>Current Role:</span>
						<span className={`font-medium ${welcome.color}`}>
							{role || "USER"}
						</span>
						{role === "SUPER_ADMIN" && (
							<span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 px-2 py-1 rounded-full">
								Full Access
							</span>
						)}
						{role === "ADMIN" && (
							<span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 px-2 py-1 rounded-full">
								Administrative Access
							</span>
						)}
					</div>
				</div>

				{/* Content Area */}
				<div className="flex-1 overflow-auto">
					<div className="p-6 h-full">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayoutClient;

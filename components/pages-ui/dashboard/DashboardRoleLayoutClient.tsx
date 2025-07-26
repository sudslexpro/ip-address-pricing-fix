"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import DashboardSidebar from "./DashboardSidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Crown, Shield, User } from "lucide-react";

interface DashboardRoleLayoutClientProps {
	children: React.ReactNode;
	role: string;
}

const DashboardRoleLayoutClient: React.FC<DashboardRoleLayoutClientProps> = ({
	children,
	role: urlRole,
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const {
		session,
		status,
		role: userRole,
		permissions,
		isLoading,
		isAuthenticated,
	} = useRole();
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

	// Check if user has access to the requested role route
	const hasAccess = () => {
		const userRoleLower = (userRole || "USER").toLowerCase().replace("_", "-");

		if (urlRole === "user") return true; // All authenticated users can access user routes
		if (urlRole === "admin")
			return userRole === "ADMIN" || userRole === "SUPER_ADMIN";
		if (urlRole === "super-admin") return userRole === "SUPER_ADMIN";

		return false;
	};

	if (!hasAccess()) {
		return (
			<div className="h-full flex items-center justify-center">
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>
						You don't have permission to access this section.
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
		switch (userRole) {
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

	// Extract current section from pathname - /dashboard/[role]/[section]
	const pathParts = pathname.split("/");
	const currentSection = pathParts[3] || "overview";

	const handleSectionChange = (section: string) => {
		if (section.startsWith("../")) {
			// Handle role switching navigation
			router.push(`/dashboard/${section}`);
		} else {
			// Handle regular section navigation within the same role
			router.push(`/dashboard/${urlRole}/${section}`);
		}
	};

	return (
		<div className="flex h-full">
			{/* Sidebar */}
			<DashboardSidebar
				role={userRole || "USER"}
				roleRoute={urlRole}
				activeSection={currentSection}
				onSectionChange={handleSectionChange}
				collapsed={sidebarCollapsed}
				onToggleCollapse={handleToggleSidebar}
			/>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<div className="bg-white dark:bg-slate-900 border-b border-border px-6 py-4 flex-shrink-0">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<IconComponent className={`h-6 w-6 ${welcome.color}`} />
							<div>
								<h1 className="text-xl font-semibold text-foreground">
									{welcome.title}
								</h1>
								<p className="text-sm text-muted-foreground">
									{welcome.subtitle}
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="text-right">
								<p className="text-sm font-medium text-foreground">
									{session.user.name || session.user.email}
								</p>
								<p className="text-xs text-muted-foreground">{userRole}</p>
							</div>
							<button
								onClick={handleSignOut}
								className="text-sm text-destructive hover:text-destructive/80 transition-colors">
								Sign Out
							</button>
						</div>
					</div>
				</div>

				{/* Page Content */}
				<div className="flex-1 overflow-auto p-6">{children}</div>
			</div>
		</div>
	);
};

export default DashboardRoleLayoutClient;

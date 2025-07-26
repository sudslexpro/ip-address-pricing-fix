"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Users,
	Settings,
	FileText,
	BarChart3,
	Shield,
	Database,
	Key,
	Webhook,
	Mail,
	Clock,
	Crown,
	Eye,
	UserCheck,
	Activity,
	Zap,
	Loader2,
	AlertCircle,
} from "lucide-react";

interface QuickActionsProps {
	role: string;
	permissions: any;
	onUserManagementClick?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
	role,
	permissions,
	onUserManagementClick,
}) => {
	const [loading, setLoading] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handleAction = async (
		actionId: string,
		action: () => void | Promise<void>
	) => {
		try {
			setLoading(actionId);
			setError("");
			await action();
		} catch (err: any) {
			setError(err.message || "An error occurred");
		} finally {
			setLoading("");
		}
	};

	const getUserActions = () => [
		{
			id: "generate-quote",
			title: "Generate Quote",
			description: "Create a new trademark quote",
			icon: FileText,
			action: () => {
				// Redirect to support page for quote generation
				window.location.href = "/support";
			},
			variant: "default" as const,
		},
		{
			id: "account-settings",
			title: "Account Settings",
			description: "Update your preferences",
			icon: Settings,
			action: () => {
				console.log("Opening account settings...");
			},
			variant: "outline" as const,
		},
		{
			id: "view-reports",
			title: "View Reports",
			description: "Check your quote history",
			icon: BarChart3,
			action: () => {
				console.log("Opening reports...");
			},
			variant: "outline" as const,
		},
	];

	const getAdminActions = () => [
		{
			id: "user-management",
			title: "User Management",
			description: "Manage user accounts",
			icon: Users,
			action: () => {
				if (onUserManagementClick) {
					onUserManagementClick();
				} else {
					console.log("User management clicked");
				}
			},
			variant: "default" as const,
		},
		{
			id: "analytics",
			title: "Analytics Dashboard",
			description: "View system analytics",
			icon: BarChart3,
			action: async () => {
				const response = await fetch("/api/admin/analytics");
				if (response.ok) {
					console.log("Analytics data refreshed");
				} else {
					throw new Error("Failed to fetch analytics");
				}
			},
			variant: "outline" as const,
		},
		{
			id: "quote-reviews",
			title: "Quote Reviews",
			description: "Review pending quotes",
			icon: FileText,
			action: () => {
				console.log("Opening quote reviews...");
			},
			variant: "outline" as const,
		},
		{
			id: "audit-logs",
			title: "Audit Logs",
			description: "View system activity",
			icon: Activity,
			action: () => {
				console.log("Opening audit logs...");
			},
			variant: "outline" as const,
		},
		{
			id: "email-campaigns",
			title: "Email Campaigns",
			description: "Manage communications",
			icon: Mail,
			action: () => {
				console.log("Opening email campaigns...");
			},
			variant: "outline" as const,
		},
	];

	const getSuperAdminActions = () => [
		{
			id: "system-admin",
			title: "System Administration",
			description: "Full system control",
			icon: Crown,
			action: () => {
				console.log("Opening system administration...");
			},
			variant: "default" as const,
		},
		{
			id: "user-role-management",
			title: "User & Role Management",
			description: "Manage all users and roles",
			icon: UserCheck,
			action: () => {
				if (onUserManagementClick) {
					onUserManagementClick();
				} else {
					console.log("User role management clicked");
				}
			},
			variant: "outline" as const,
		},
		{
			id: "database-management",
			title: "Database Management",
			description: "Database operations",
			icon: Database,
			action: () => {
				console.log("Opening database management...");
			},
			variant: "outline" as const,
		},
		{
			id: "system-monitoring",
			title: "System Monitoring",
			description: "Monitor system health",
			icon: Eye,
			action: async () => {
				const response = await fetch("/api/admin/analytics");
				if (response.ok) {
					const data = await response.json();
					console.log("System health check completed:", data.system);
				} else {
					throw new Error("System health check failed");
				}
			},
			variant: "outline" as const,
		},
		{
			id: "security-center",
			title: "Security Center",
			description: "Security settings & logs",
			icon: Shield,
			action: () => {
				console.log("Opening security center...");
			},
			variant: "outline" as const,
		},
		{
			id: "performance-analytics",
			title: "Performance Analytics",
			description: "System performance metrics",
			icon: Zap,
			action: async () => {
				const response = await fetch("/api/admin/analytics");
				if (response.ok) {
					const data = await response.json();
					console.log("Performance metrics:", {
						uptime: data.system.uptime,
						responseTime: data.system.responseTime,
						errorRate: data.system.errorRate,
					});
				} else {
					throw new Error("Failed to fetch performance metrics");
				}
			},
			variant: "outline" as const,
		},
		{
			id: "audit-compliance",
			title: "Audit & Compliance",
			description: "Compliance monitoring",
			icon: Clock,
			action: () => {
				console.log("Opening audit & compliance...");
			},
			variant: "outline" as const,
		},
	];

	const getActionsForRole = () => {
		switch (role) {
			case "SUPER_ADMIN":
				return getSuperAdminActions();
			case "ADMIN":
				return getAdminActions();
			case "USER":
			default:
				return getUserActions();
		}
	};

	const actions = getActionsForRole();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
				<CardDescription>
					Common tasks and shortcuts for your role
				</CardDescription>
			</CardHeader>
			<CardContent>
				{error && (
					<Alert variant="destructive" className="mb-4">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<div className="space-y-2">
					{actions.map((action, index) => {
						const Icon = action.icon;
						const isLoading = loading === action.id;

						return (
							<Button
								key={index}
								variant={action.variant}
								className="w-full h-auto p-4 flex items-center justify-start gap-3 text-left dark:bg-blue-600/20 dark:text-white border dark:border-blue-600 hover:bg-blue-600/30"
								onClick={() => handleAction(action.id, action.action)}
								disabled={isLoading}>
								{isLoading ? (
									<Loader2 className="h-5 w-5 animate-spin flex-shrink-0" />
								) : (
									<Icon className="h-5 w-5 flex-shrink-0" />
								)}
								<div className="flex flex-col gap-1 flex-1">
									<div className="font-medium text-sm">{action.title}</div>
									<div className="text-xs text-muted-foreground">
										{action.description}
									</div>
								</div>
							</Button>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

export default QuickActions;

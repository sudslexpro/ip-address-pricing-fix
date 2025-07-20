"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";

interface QuickActionsProps {
	role: string;
	permissions: any;
}

const QuickActions: React.FC<QuickActionsProps> = ({ role, permissions }) => {
	const getUserActions = () => [
		{
			title: "Generate Quote",
			description: "Create a new trademark quote",
			icon: FileText,
			action: () => console.log("Generate quote"),
			variant: "default" as const,
		},
		{
			title: "API Keys",
			description: "Manage your API access",
			icon: Key,
			action: () => console.log("API keys"),
			variant: "outline" as const,
		},
		{
			title: "Account Settings",
			description: "Update your preferences",
			icon: Settings,
			action: () => console.log("Account settings"),
			variant: "outline" as const,
		},
		{
			title: "View Reports",
			description: "Check your quote history",
			icon: BarChart3,
			action: () => console.log("View reports"),
			variant: "outline" as const,
		},
	];

	const getAdminActions = () => [
		{
			title: "User Management",
			description: "Manage user accounts",
			icon: Users,
			action: () => console.log("User management"),
			variant: "default" as const,
		},
		{
			title: "Analytics Dashboard",
			description: "View system analytics",
			icon: BarChart3,
			action: () => console.log("Analytics"),
			variant: "outline" as const,
		},
		{
			title: "Quote Reviews",
			description: "Review pending quotes",
			icon: FileText,
			action: () => console.log("Quote reviews"),
			variant: "outline" as const,
		},
		{
			title: "Integration Settings",
			description: "Configure integrations",
			icon: Webhook,
			action: () => console.log("Integrations"),
			variant: "outline" as const,
		},
		{
			title: "Audit Logs",
			description: "View system activity",
			icon: Activity,
			action: () => console.log("Audit logs"),
			variant: "outline" as const,
		},
		{
			title: "Email Campaigns",
			description: "Manage communications",
			icon: Mail,
			action: () => console.log("Email campaigns"),
			variant: "outline" as const,
		},
	];

	const getSuperAdminActions = () => [
		{
			title: "System Administration",
			description: "Full system control",
			icon: Crown,
			action: () => console.log("System admin"),
			variant: "default" as const,
		},
		{
			title: "User & Role Management",
			description: "Manage all users and roles",
			icon: UserCheck,
			action: () => console.log("User role management"),
			variant: "outline" as const,
		},
		{
			title: "Database Management",
			description: "Database operations",
			icon: Database,
			action: () => console.log("Database management"),
			variant: "outline" as const,
		},
		{
			title: "System Monitoring",
			description: "Monitor system health",
			icon: Eye,
			action: () => console.log("System monitoring"),
			variant: "outline" as const,
		},
		{
			title: "Security Center",
			description: "Security settings & logs",
			icon: Shield,
			action: () => console.log("Security center"),
			variant: "outline" as const,
		},
		{
			title: "Performance Analytics",
			description: "System performance metrics",
			icon: Zap,
			action: () => console.log("Performance analytics"),
			variant: "outline" as const,
		},
		{
			title: "Audit & Compliance",
			description: "Compliance monitoring",
			icon: Clock,
			action: () => console.log("Audit compliance"),
			variant: "outline" as const,
		},
		{
			title: "API Management",
			description: "Global API settings",
			icon: Key,
			action: () => console.log("API management"),
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
				<CardTitle className="flex items-center gap-2">
					<Activity className="h-5 w-5" />
					Quick Actions
				</CardTitle>
				<CardDescription>
					{role === "SUPER_ADMIN" && "Full system administration tools"}
					{role === "ADMIN" && "User and system management tools"}
					{role === "USER" && "Manage your account and quotes"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{actions.map((action, index) => {
						const IconComponent = action.icon;
						return (
							<Button
								key={index}
								variant={action.variant}
								className="justify-start h-auto p-4 flex-col items-start gap-2"
								onClick={action.action}>
								<div className="flex items-center gap-2 w-full">
									<IconComponent className="h-4 w-4" />
									<span className="font-medium text-sm">{action.title}</span>
								</div>
								<span className="text-xs text-muted-foreground text-left">
									{action.description}
								</span>
							</Button>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

export default QuickActions;

"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Clock,
	CheckCircle,
	AlertCircle,
	User,
	FileText,
	Activity,
	TrendingUp,
	Mail,
	Shield,
	Database,
	Eye,
} from "lucide-react";

interface RecentActivityProps {
	role: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ role }) => {
	const getUserActivity = () => [
		{
			id: 1,
			type: "quote_generated",
			title: "New quote generated",
			description: "Trademark registration for TechCorp Inc. - United States",
			timestamp: "2 hours ago",
			status: "completed",
			icon: FileText,
		},
		{
			id: 2,
			type: "quote_approved",
			title: "Quote approved by client",
			description: "Quote #TM-2024-001 accepted",
			timestamp: "5 hours ago",
			status: "approved",
			icon: CheckCircle,
		},
		{
			id: 3,
			type: "profile_updated",
			title: "Profile updated",
			description: "Contact information updated",
			timestamp: "1 day ago",
			status: "info",
			icon: User,
		},
	];

	const getAdminActivity = () => [
		{
			id: 1,
			type: "user_created",
			title: "New user registered",
			description: "john.doe@example.com joined the platform",
			timestamp: "30 minutes ago",
			status: "info",
			icon: User,
		},
		{
			id: 2,
			type: "quote_reviewed",
			title: "Quote review completed",
			description: "Quote #TM-2024-0156 reviewed and approved",
			timestamp: "1 hour ago",
			status: "completed",
			icon: FileText,
		},
		{
			id: 3,
			type: "system_alert",
			title: "System performance alert",
			description: "High system load detected - monitoring",
			timestamp: "3 hours ago",
			status: "warning",
			icon: AlertCircle,
		},
		{
			id: 4,
			type: "system_update",
			title: "System configuration updated",
			description: "Security settings have been enhanced",
			timestamp: "6 hours ago",
			status: "completed",
			icon: Activity,
		},
		{
			id: 5,
			type: "user_suspended",
			title: "User account suspended",
			description: "Suspicious activity detected on user account",
			timestamp: "8 hours ago",
			status: "warning",
			icon: Shield,
		},
	];

	const getSuperAdminActivity = () => [
		{
			id: 1,
			type: "system_maintenance",
			title: "System maintenance completed",
			description: "Database optimization and security updates applied",
			timestamp: "15 minutes ago",
			status: "completed",
			icon: Database,
		},
		{
			id: 2,
			type: "admin_created",
			title: "New admin user created",
			description:
				"Administrator privileges granted to sarah.wilson@company.com",
			timestamp: "45 minutes ago",
			status: "info",
			icon: Shield,
		},
		{
			id: 3,
			type: "security_scan",
			title: "Security scan completed",
			description: "Weekly security audit completed - no issues found",
			timestamp: "2 hours ago",
			status: "completed",
			icon: Eye,
		},
		{
			id: 4,
			type: "performance_alert",
			title: "Performance optimization",
			description: "Cache optimization improved response times by 23%",
			timestamp: "4 hours ago",
			status: "approved",
			icon: TrendingUp,
		},
		{
			id: 5,
			type: "backup_completed",
			title: "System backup completed",
			description: "Daily automated backup completed successfully",
			timestamp: "6 hours ago",
			status: "completed",
			icon: Database,
		},
		{
			id: 6,
			type: "email_campaign",
			title: "Email campaign sent",
			description: "Monthly newsletter sent to 1,247 subscribers",
			timestamp: "8 hours ago",
			status: "completed",
			icon: Mail,
		},
	];

	const getActivityForRole = () => {
		switch (role) {
			case "SUPER_ADMIN":
				return getSuperAdminActivity();
			case "ADMIN":
				return getAdminActivity();
			case "USER":
			default:
				return getUserActivity();
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "completed":
				return (
					<Badge
						variant="default"
						className="bg-green-100 text-green-800 border-green-200">
						Completed
					</Badge>
				);
			case "approved":
				return (
					<Badge
						variant="default"
						className="bg-blue-100 text-blue-800 border-blue-200">
						Approved
					</Badge>
				);
			case "warning":
				return <Badge variant="destructive">Warning</Badge>;
			case "info":
			default:
				return <Badge variant="secondary">Info</Badge>;
		}
	};

	const activities = getActivityForRole();

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Clock className="h-5 w-5" />
					Recent Activity
				</CardTitle>
				<CardDescription>
					{role === "SUPER_ADMIN" &&
						"System-wide activity and administrative actions"}
					{role === "ADMIN" &&
						"User management and system monitoring activities"}
					{role === "USER" && "Your recent account and quote activities"}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{activities.map((activity) => {
						const IconComponent = activity.icon;
						return (
							<div
								key={activity.id}
								className="flex items-start space-x-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
								<div className="flex-shrink-0 mt-0.5">
									<IconComponent className="h-4 w-4 text-muted-foreground" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-foreground">
											{activity.title}
										</p>
										{getStatusBadge(activity.status)}
									</div>
									<p className="text-xs text-muted-foreground mt-1">
										{activity.description}
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										{activity.timestamp}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<div className="mt-4 pt-4 border-t">
					<Button variant="outline" size="sm" className="w-full">
						View All Activity
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default RecentActivity;

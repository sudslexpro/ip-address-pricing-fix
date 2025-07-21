"use client";

import React, { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Users,
	Shield,
	Activity,
	TrendingUp,
	FileText,
	Clock,
	Loader2,
	AlertCircle,
	Server,
} from "lucide-react";

interface DashboardStatsProps {
	role: string;
}

interface AnalyticsData {
	users: {
		total: number;
		active: number;
		inactive: number;
		newThisMonth: number;
		adminCount: number;
		superAdminCount: number;
	};
	growth: {
		usersGrowthRate: number;
		activeUsersGrowthRate: number;
	};
	system: {
		uptime: number;
		responseTime: number;
		errorRate: number;
	};
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ role }) => {
	const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>("");

	// Fetch analytics data from API
	const fetchAnalytics = async () => {
		try {
			setLoading(true);
			setError("");

			const response = await fetch("/api/admin/analytics");
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to fetch analytics");
			}

			setAnalytics(data);
		} catch (err: any) {
			setError(err.message);
			// Fallback to mock data if API fails
			setAnalytics({
				users: {
					total: 1250,
					active: 892,
					inactive: 358,
					newThisMonth: 89,
					adminCount: 8,
					superAdminCount: 2,
				},
				growth: {
					usersGrowthRate: 12.5,
					activeUsersGrowthRate: 8.3,
				},
				system: {
					uptime: 99.9,
					responseTime: 145,
					errorRate: 0.1,
				},
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAnalytics();
	}, []);

	if (loading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{[...Array(4)].map((_, i) => (
					<Card key={i}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<div className="h-4 bg-muted animate-pulse rounded w-20"></div>
							<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>
						</CardHeader>
						<CardContent>
							<div className="h-8 bg-muted animate-pulse rounded w-16 mb-2"></div>
							<div className="h-3 bg-muted animate-pulse rounded w-24"></div>
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	if (error && !analytics) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		);
	}

	if (!analytics) return null;

	if (role === "SUPER_ADMIN") {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
				{error && (
					<div className="col-span-full">
						<Alert>
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>
								Using fallback data due to API issues: {error}
							</AlertDescription>
						</Alert>
					</div>
				)}

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.users.total.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							{analytics.users.adminCount} admins,{" "}
							{analytics.users.superAdminCount} super admins
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.users.active.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							{Math.round(
								(analytics.users.active / analytics.users.total) * 100
							)}
							% of total
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Monthly Growth
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							+{analytics.users.newThisMonth}
						</div>
						<p className="text-xs text-muted-foreground">
							{analytics.growth.usersGrowthRate > 0 ? "+" : ""}
							{analytics.growth.usersGrowthRate.toFixed(1)}% growth
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">System Health</CardTitle>
						<Shield className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.system.uptime.toFixed(1)}%
						</div>
						<Badge
							variant={analytics.system.uptime > 99 ? "default" : "destructive"}
							className="text-xs">
							{analytics.system.uptime > 99 ? "Operational" : "Issues"}
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Response Time</CardTitle>
						<Server className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.system.responseTime}ms
						</div>
						<p className="text-xs text-muted-foreground">
							Average response time
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Error Rate</CardTitle>
						<AlertCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.system.errorRate.toFixed(2)}%
						</div>
						<Badge
							variant={
								analytics.system.errorRate < 1 ? "default" : "destructive"
							}
							className="text-xs">
							{analytics.system.errorRate < 1 ? "Good" : "High"}
						</Badge>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (role === "ADMIN") {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{error && (
					<div className="col-span-full">
						<Alert>
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>
								Using fallback data due to API issues: {error}
							</AlertDescription>
						</Alert>
					</div>
				)}

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.users.total.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							+{analytics.users.newThisMonth} this month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.users.active.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							{Math.round(
								(analytics.users.active / analytics.users.total) * 100
							)}
							% active rate
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{analytics.growth.usersGrowthRate > 0 ? "+" : ""}
							{analytics.growth.usersGrowthRate.toFixed(1)}%
						</div>
						<p className="text-xs text-muted-foreground">Monthly user growth</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	// USER role - simplified stats
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{error && (
				<div className="col-span-full">
					<Alert>
						<AlertCircle className="h-4 w-4" />
						<AlertDescription>
							Some features may be limited due to connectivity issues.
						</AlertDescription>
					</Alert>
				</div>
			)}

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Account Status</CardTitle>
					<Users className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">Active</div>
					<p className="text-xs text-muted-foreground">
						Your account is in good standing
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">System Status</CardTitle>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{analytics.system.uptime.toFixed(1)}%
					</div>
					<Badge
						variant={analytics.system.uptime > 99 ? "default" : "destructive"}
						className="text-xs">
						{analytics.system.uptime > 99 ? "Operational" : "Issues"}
					</Badge>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Quick Access</CardTitle>
					<FileText className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">Ready</div>
					<p className="text-xs text-muted-foreground">
						All features available
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardStats;

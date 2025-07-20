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
import {
	Users,
	Shield,
	Activity,
	TrendingUp,
	FileText,
	Clock,
} from "lucide-react";

interface DashboardStatsProps {
	role: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ role }) => {
	// Mock data - in real app, this would come from API
	const userStats = {
		totalQuotes: 45,
		activeQuotes: 12,
		monthlyQuotes: 15,
		successRate: 92,
	};

	const adminStats = {
		totalUsers: 1250,
		activeUsers: 892,
		monthlySignups: 89,
		systemHealth: 98,
		totalQuotes: 15420,
		pendingReviews: 23,
	};

	const superAdminStats = {
		totalUsers: 1250,
		totalAdmins: 8,
		activeUsers: 892,
		systemHealth: 98,
		totalQuotes: 15420,
		revenue: 125000,
		pendingReviews: 23,
		auditLogs: 156,
	};

	if (role === "SUPER_ADMIN") {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{superAdminStats.totalUsers.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							+{superAdminStats.totalAdmins} admins
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
							{superAdminStats.activeUsers.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							{Math.round(
								(superAdminStats.activeUsers / superAdminStats.totalUsers) * 100
							)}
							% of total
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Monthly Revenue
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							${superAdminStats.revenue.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							+12% from last month
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
							{superAdminStats.systemHealth}%
						</div>
						<Badge variant="default" className="text-xs">
							Operational
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{superAdminStats.totalQuotes.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">All time</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Reviews
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{superAdminStats.pendingReviews}
						</div>
						<p className="text-xs text-muted-foreground">Requires attention</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (role === "ADMIN") {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{adminStats.totalUsers.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							+{adminStats.monthlySignups} this month
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
							{adminStats.activeUsers.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							{Math.round(
								(adminStats.activeUsers / adminStats.totalUsers) * 100
							)}
							% active rate
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{adminStats.totalQuotes.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground">
							{adminStats.pendingReviews} pending review
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	// Default USER role
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
					<FileText className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{userStats.totalQuotes}</div>
					<p className="text-xs text-muted-foreground">All time</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Quotes</CardTitle>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{userStats.activeQuotes}</div>
					<p className="text-xs text-muted-foreground">Currently processing</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">This Month</CardTitle>
					<TrendingUp className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{userStats.monthlyQuotes}</div>
					<p className="text-xs text-muted-foreground">+20% from last month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Success Rate</CardTitle>
					<Shield className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{userStats.successRate}%</div>
					<Badge variant="default" className="text-xs">
						Excellent
					</Badge>
				</CardContent>
			</Card>
		</div>
	);
};

export default DashboardStats;

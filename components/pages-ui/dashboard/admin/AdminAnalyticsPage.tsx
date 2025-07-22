"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	BarChart3,
	TrendingUp,
	Users,
	Activity,
	FileText,
	Clock,
} from "lucide-react";
import DashboardStats from "../DashboardStats";

const AdminAnalyticsPage: React.FC = () => {
	const { role } = useRole();

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
				<div className="flex items-center space-x-4">
					<div className="bg-blue-100 p-3 rounded-full">
						<BarChart3 className="h-8 w-8 text-blue-600" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-blue-800">
							Analytics Dashboard
						</h1>
						<p className="text-blue-600">
							Comprehensive system metrics and user analytics
						</p>
					</div>
				</div>
			</div>

			{/* Enhanced Analytics Stats */}
			<DashboardStats role={role || "ADMIN"} />

			{/* Additional Analytics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">User Growth</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+12.5%</div>
						<p className="text-xs text-muted-foreground">
							<Badge variant="secondary" className="text-green-600">
								+2.1% from last month
							</Badge>
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Sessions
						</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,423</div>
						<p className="text-xs text-muted-foreground">
							<Badge variant="secondary" className="text-blue-600">
								Real-time
							</Badge>
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Quotes Generated
						</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">8,947</div>
						<p className="text-xs text-muted-foreground">
							<Badge variant="secondary" className="text-purple-600">
								+15.3% this week
							</Badge>
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Detailed Analytics Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Users className="h-5 w-5" />
							<span>User Activity Trends</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm">Daily Active Users</span>
								<Badge variant="outline">2,341</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">Weekly Active Users</span>
								<Badge variant="outline">12,847</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">Monthly Active Users</span>
								<Badge variant="outline">45,231</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Clock className="h-5 w-5" />
							<span>System Performance</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm">Average Response Time</span>
								<Badge variant="outline" className="text-green-600">
									145ms
								</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">System Uptime</span>
								<Badge variant="outline" className="text-green-600">
									99.8%
								</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm">Error Rate</span>
								<Badge variant="outline" className="text-yellow-600">
									0.02%
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AdminAnalyticsPage;

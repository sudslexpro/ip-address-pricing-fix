"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import DashboardStats from "../DashboardStats";
import QuickActions from "../QuickActions";
import RecentActivity from "../RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Shield, Database, Activity, Eye } from "lucide-react";

const SuperAdminOverviewPage: React.FC = () => {
	const { role, permissions } = useRole();

	return (
		<div className="space-y-6">
			{/* Super Admin Stats */}
			<DashboardStats role={role || "SUPER_ADMIN"} />

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Activity className="h-5 w-5" />
						<span>System Administration</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<QuickActions
						role={role || "SUPER_ADMIN"}
						permissions={permissions}
					/>
				</CardContent>
			</Card>

			{/* System Health Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">System Status</CardTitle>
						<Shield className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">Healthy</div>
						<p className="text-xs text-muted-foreground">
							All systems operational
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Database</CardTitle>
						<Database className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">Online</div>
						<p className="text-xs text-muted-foreground">99.9% uptime</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Security</CardTitle>
						<Eye className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-600">Monitoring</div>
						<p className="text-xs text-muted-foreground">Active surveillance</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Performance</CardTitle>
						<Activity className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-purple-600">Optimal</div>
						<p className="text-xs text-muted-foreground">Peak efficiency</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Activity className="h-5 w-5" />
						<span>System Activity</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentActivity role={role || "SUPER_ADMIN"} />
				</CardContent>
			</Card>
		</div>
	);
};

export default SuperAdminOverviewPage;

"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import DashboardStats from "../DashboardStats";
import QuickActions from "../QuickActions";
import RecentActivity from "../RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, BarChart3, Activity } from "lucide-react";

const AdminOverviewPage: React.FC = () => {
	const { role, permissions } = useRole();

	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
				<div className="flex items-center space-x-4">
					<div className="bg-blue-100 p-3 rounded-full">
						<Shield className="h-8 w-8 text-blue-600" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-blue-800">
							Administration Dashboard
						</h1>
						<p className="text-blue-600">
							User management and system monitoring tools
						</p>
					</div>
				</div>
			</div>

			{/* Admin Stats */}
			<DashboardStats role={role || "ADMIN"} />

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Activity className="h-5 w-5" />
						<span>Admin Quick Actions</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<QuickActions role={role || "ADMIN"} permissions={permissions} />
				</CardContent>
			</Card>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<BarChart3 className="h-5 w-5" />
						<span>System Activity</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentActivity role={role || "ADMIN"} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminOverviewPage;

"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import DashboardStats from "../DashboardStats";
import QuickActions from "../QuickActions";
import RecentActivity from "../RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Quote, Calendar, Activity } from "lucide-react";

const UserOverviewPage: React.FC = () => {
	const { role, permissions } = useRole();

	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
				<div className="flex items-center space-x-4">
					<div className="bg-green-100 p-3 rounded-full">
						<User className="h-8 w-8 text-green-600" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-green-800">
							Welcome to Your Dashboard
						</h1>
						<p className="text-green-600">
							Manage your quotes, settings, and account information
						</p>
					</div>
				</div>
			</div>

			{/* User Stats */}
			<DashboardStats role={role || "USER"} />

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Activity className="h-5 w-5" />
						<span>Quick Actions</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<QuickActions role={role || "USER"} permissions={permissions} />
				</CardContent>
			</Card>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Calendar className="h-5 w-5" />
						<span>Recent Activity</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RecentActivity role={role || "USER"} />
				</CardContent>
			</Card>
		</div>
	);
};

export default UserOverviewPage;

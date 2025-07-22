"use client";

import React from "react";
import { useRole } from "@/hooks/useRole";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";

const OverviewPage: React.FC = () => {
	const { role, permissions } = useRole();

	// Handler for UserManagement click from QuickActions
	const handleUserManagementClick = () => {
		// This will be handled by the router now
		window.location.href = "/dashboard/users";
	};

	return (
		<div className="space-y-6">
			{/* Dashboard Stats */}
			<DashboardStats role={role || "USER"} />

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Quick Actions */}
				<QuickActions
					role={role || "USER"}
					permissions={permissions}
					onUserManagementClick={handleUserManagementClick}
				/>

				{/* Additional dashboard widgets */}
				<Card>
					<CardHeader>
						<CardTitle>Welcome Back!</CardTitle>
						<CardDescription>
							Here's what's happening with your account today.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							Check the settings tab to manage your profile information.
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<RecentActivity role={role || "USER"} />
		</div>
	);
};

export default OverviewPage;

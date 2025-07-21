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
import {
	BarChart3,
	FileText,
	Shield,
	Key,
	Webhook,
	Database,
	Eye,
	Crown,
	Zap,
	Settings,
	Activity,
} from "lucide-react";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import UserManagement from "./UserManagement";
import DashboardSidebar from "./DashboardSidebar";
import ProfileSettings from "./ProfileSettings";

interface DashboardLayoutProps {
	role: string;
	permissions: any;
	user: any;
	onSignOut: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	role,
	permissions,
	user,
	onSignOut,
}) => {
	const [activeSection, setActiveSection] = useState("overview");
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	// Handler for UserManagement click from QuickActions
	const handleUserManagementClick = () => {
		setActiveSection("users");
	};

	const handleToggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const renderContent = () => {
		switch (activeSection) {
			case "overview":
				return (
					<div className="space-y-6">
						{/* Dashboard Stats */}
						<DashboardStats role={role} />

						{/* Main Content Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Quick Actions */}
							<QuickActions
								role={role}
								permissions={permissions}
								onUserManagementClick={handleUserManagementClick}
							/>

							{/* Additional dashboard widgets can go here */}
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
						<RecentActivity role={role} />
					</div>
				);

			case "quotes":
				return (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="h-5 w-5" />
								Quote Management
							</CardTitle>
							<CardDescription>
								Manage your trademark quotes and applications
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8">
								<FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
								<p className="text-muted-foreground">
									Quote management interface would be implemented here...
								</p>
								<Button className="mt-4">Create New Quote</Button>
							</div>
						</CardContent>
					</Card>
				);

			case "users":
				if (role === "ADMIN" || role === "SUPER_ADMIN") {
					return <UserManagement currentUserRole={role} />;
				}
				return null;

			case "analytics":
				if (role === "ADMIN" || role === "SUPER_ADMIN") {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BarChart3 className="h-5 w-5" />
									Analytics Dashboard
								</CardTitle>
								<CardDescription>
									System performance and usage analytics
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-center py-8">
									<BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
									<p className="text-muted-foreground">
										Analytics dashboard would be implemented here...
									</p>
									<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
										<Button variant="outline">User Analytics</Button>
										<Button variant="outline">Quote Analytics</Button>
										<Button variant="outline">Revenue Analytics</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				}
				return null;

			case "system":
				if (role === "SUPER_ADMIN") {
					return (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Database className="h-5 w-5" />
										Database Management
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<Button variant="outline" className="w-full justify-start">
											<Database className="h-4 w-4 mr-2" />
											Database Status
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<Activity className="h-4 w-4 mr-2" />
											Backup Management
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<Zap className="h-4 w-4 mr-2" />
											Performance Tuning
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Settings className="h-5 w-5" />
										System Configuration
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<Button variant="outline" className="w-full justify-start">
											<Shield className="h-4 w-4 mr-2" />
											Security Configuration
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<Settings className="h-4 w-4 mr-2" />
											System Settings
										</Button>
										<Button variant="outline" className="w-full justify-start">
											<Eye className="h-4 w-4 mr-2" />
											System Logs
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					);
				}
				return null;

			case "security":
				if (role === "SUPER_ADMIN") {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5" />
									Security Center
								</CardTitle>
								<CardDescription>
									Monitor and manage system security
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-center py-8">
									<Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
									<p className="text-muted-foreground">
										Security management interface would be implemented here...
									</p>
									<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
										<Button variant="outline">Security Audit</Button>
										<Button variant="outline">Access Logs</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				}
				return null;

			case "monitoring":
				if (role === "SUPER_ADMIN") {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Eye className="h-5 w-5" />
									System Monitoring
								</CardTitle>
								<CardDescription>
									Real-time system performance monitoring
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-center py-8">
									<Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
									<p className="text-muted-foreground">
										System monitoring dashboard would be implemented here...
									</p>
									<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
										<Button variant="outline">Performance Metrics</Button>
										<Button variant="outline">Error Tracking</Button>
										<Button variant="outline">Uptime Monitoring</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				}
				return null;

			case "settings":
				return (
					<ProfileSettings user={user} role={role} onSignOut={onSignOut} />
				);

			default:
				return null;
		}
	};

	return (
		<div className="flex h-full min-h-[calc(100vh-200px)]">
			{/* Sidebar */}
			<DashboardSidebar
				role={role}
				activeSection={activeSection}
				onSectionChange={setActiveSection}
				collapsed={sidebarCollapsed}
				onToggleCollapse={handleToggleSidebar}
			/>

			{/* Main Content */}
			<div className="flex-1 overflow-auto">
				<div className="p-6">{renderContent()}</div>
			</div>
		</div>
	);
};

export default DashboardLayout;

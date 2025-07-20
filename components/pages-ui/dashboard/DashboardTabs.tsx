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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	LayoutDashboard,
	Users,
	Settings,
	BarChart3,
	FileText,
	Shield,
	Activity,
	Key,
	Webhook,
	Database,
	Eye,
	Crown,
	Zap,
} from "lucide-react";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import UserProfileCard from "./UserProfileCard";
import UserManagement from "./UserManagement";

interface DashboardTabsProps {
	role: string;
	permissions: any;
	user: any;
	onSignOut: () => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
	role,
	permissions,
	user,
	onSignOut,
}) => {
	const [activeTab, setActiveTab] = useState("overview");

	const getTabsForRole = () => {
		const baseTabs = [
			{
				id: "overview",
				label: "Overview",
				icon: LayoutDashboard,
			},
			{
				id: "quotes",
				label: "Quotes",
				icon: FileText,
			},
			{
				id: "api",
				label: "API Keys",
				icon: Key,
			},
			{
				id: "settings",
				label: "Settings",
				icon: Settings,
			},
		];

		if (role === "ADMIN" || role === "SUPER_ADMIN") {
			baseTabs.splice(2, 0, {
				id: "users",
				label: "User Management",
				icon: Users,
			});
			baseTabs.splice(3, 0, {
				id: "analytics",
				label: "Analytics",
				icon: BarChart3,
			});
		}

		if (role === "SUPER_ADMIN") {
			baseTabs.splice(-1, 0, {
				id: "system",
				label: "System Admin",
				icon: Crown,
			});
			baseTabs.splice(-1, 0, {
				id: "security",
				label: "Security",
				icon: Shield,
			});
			baseTabs.splice(-1, 0, {
				id: "monitoring",
				label: "Monitoring",
				icon: Eye,
			});
		}

		return baseTabs;
	};

	const tabs = getTabsForRole();

	return (
		<div className="space-y-6">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
					{tabs.map((tab) => {
						const IconComponent = tab.icon;
						return (
							<TabsTrigger
								key={tab.id}
								value={tab.id}
								className="flex items-center gap-2">
								<IconComponent className="h-4 w-4" />
								<span className="hidden sm:inline">{tab.label}</span>
							</TabsTrigger>
						);
					})}
				</TabsList>

				<TabsContent value="overview" className="space-y-6">
					{/* Dashboard Stats */}
					<DashboardStats role={role} />

					{/* Main Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* User Profile Card */}
						<UserProfileCard user={user} onSignOut={onSignOut} />

						{/* Quick Actions */}
						<div className="space-y-6">
							<QuickActions role={role} permissions={permissions} />
						</div>
					</div>

					{/* Recent Activity */}
					<RecentActivity role={role} />
				</TabsContent>

				<TabsContent value="quotes" className="space-y-6">
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
				</TabsContent>

				{(role === "ADMIN" || role === "SUPER_ADMIN") && (
					<TabsContent value="users" className="space-y-6">
						<UserManagement currentUserRole={role} />
					</TabsContent>
				)}

				{(role === "ADMIN" || role === "SUPER_ADMIN") && (
					<TabsContent value="analytics" className="space-y-6">
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
					</TabsContent>
				)}

				<TabsContent value="api" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Key className="h-5 w-5" />
								API Key Management
							</CardTitle>
							<CardDescription>
								Manage your API keys and access tokens
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8">
								<Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
								<p className="text-muted-foreground">
									API key management interface would be implemented here...
								</p>
								<div className="mt-4 space-x-2">
									<Button>Generate New Key</Button>
									<Button variant="outline">View Documentation</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{role === "SUPER_ADMIN" && (
					<TabsContent value="system" className="space-y-6">
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
										<Webhook className="h-5 w-5" />
										System Integration
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<Button variant="outline" className="w-full justify-start">
											<Webhook className="h-4 w-4 mr-2" />
											Webhook Configuration
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
					</TabsContent>
				)}

				{role === "SUPER_ADMIN" && (
					<TabsContent value="security" className="space-y-6">
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
					</TabsContent>
				)}

				{role === "SUPER_ADMIN" && (
					<TabsContent value="monitoring" className="space-y-6">
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
					</TabsContent>
				)}

				<TabsContent value="settings" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Settings className="h-5 w-5" />
								Account Settings
							</CardTitle>
							<CardDescription>
								Manage your account preferences and settings
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-center py-8">
								<Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
								<p className="text-muted-foreground">
									Account settings interface would be implemented here...
								</p>
								<div className="mt-4 space-x-2">
									<Button variant="outline">Profile Settings</Button>
									<Button variant="outline">Notification Preferences</Button>
									<Button variant="outline">Privacy Settings</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default DashboardTabs;

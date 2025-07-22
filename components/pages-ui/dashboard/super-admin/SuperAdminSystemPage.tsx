"use client";

import React, { useState } from "react";
import { useRole } from "@/hooks/useRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Crown,
	Database,
	Server,
	Shield,
	Settings,
	Activity,
	Users,
	AlertTriangle,
	CheckCircle,
	XCircle,
	Loader2,
} from "lucide-react";

const SuperAdminSystemPage: React.FC = () => {
	const { role } = useRole();
	const [loading, setLoading] = useState<string>("");

	const handleSystemAction = async (action: string) => {
		setLoading(action);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setLoading("");
	};

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
				<div className="flex items-center space-x-4">
					<div className="bg-purple-100 p-3 rounded-full">
						<Crown className="h-8 w-8 text-purple-600" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-purple-800">
							System Administration
						</h1>
						<p className="text-purple-600">
							Comprehensive system management and configuration
						</p>
					</div>
				</div>
			</div>

			{/* System Status Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">System Health</CardTitle>
						<CheckCircle className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">Healthy</div>
						<Badge variant="secondary" className="text-green-600 mt-1">
							99.9% Uptime
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Database</CardTitle>
						<Database className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">Online</div>
						<Badge variant="secondary" className="text-blue-600 mt-1">
							PostgreSQL
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">API Status</CardTitle>
						<Server className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">Active</div>
						<Badge variant="secondary" className="text-green-600 mt-1">
							145ms avg
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Security</CardTitle>
						<Shield className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-orange-600">Secure</div>
						<Badge variant="secondary" className="text-orange-600 mt-1">
							24/7 Monitor
						</Badge>
					</CardContent>
				</Card>
			</div>

			{/* System Controls */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Settings className="h-5 w-5" />
							<span>System Controls</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Database Backup</p>
								<p className="text-sm text-muted-foreground">
									Create system-wide backup
								</p>
							</div>
							<Button
								onClick={() => handleSystemAction("backup")}
								disabled={loading === "backup"}
								className="min-w-[100px]">
								{loading === "backup" ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Backup"
								)}
							</Button>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Cache Clear</p>
								<p className="text-sm text-muted-foreground">
									Clear all system caches
								</p>
							</div>
							<Button
								onClick={() => handleSystemAction("cache")}
								disabled={loading === "cache"}
								variant="outline"
								className="min-w-[100px]">
								{loading === "cache" ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Clear"
								)}
							</Button>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">System Maintenance</p>
								<p className="text-sm text-muted-foreground">
									Enable maintenance mode
								</p>
							</div>
							<Button
								onClick={() => handleSystemAction("maintenance")}
								disabled={loading === "maintenance"}
								variant="destructive"
								className="min-w-[100px]">
								{loading === "maintenance" ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Enable"
								)}
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Activity className="h-5 w-5" />
							<span>System Metrics</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm">CPU Usage</span>
							<Badge variant="outline" className="text-green-600">
								23%
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Memory Usage</span>
							<Badge variant="outline" className="text-yellow-600">
								67%
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Disk Usage</span>
							<Badge variant="outline" className="text-green-600">
								45%
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Network I/O</span>
							<Badge variant="outline" className="text-blue-600">
								Normal
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Active Connections</span>
							<Badge variant="outline" className="text-purple-600">
								1,423
							</Badge>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* System Alerts */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<AlertTriangle className="h-5 w-5" />
						<span>System Alerts</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert>
						<CheckCircle className="h-4 w-4" />
						<AlertDescription>
							All systems are running normally. No critical alerts at this time.
						</AlertDescription>
					</Alert>

					<div className="space-y-2">
						<div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
							<div className="flex items-center space-x-2">
								<AlertTriangle className="h-4 w-4 text-yellow-600" />
								<span className="text-sm">
									Database connection pool reaching capacity
								</span>
							</div>
							<Badge variant="outline" className="text-yellow-600">
								Warning
							</Badge>
						</div>

						<div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
							<div className="flex items-center space-x-2">
								<CheckCircle className="h-4 w-4 text-green-600" />
								<span className="text-sm">
									Automated backup completed successfully
								</span>
							</div>
							<Badge variant="outline" className="text-green-600">
								Info
							</Badge>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SuperAdminSystemPage;

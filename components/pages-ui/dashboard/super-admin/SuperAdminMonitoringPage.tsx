"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Eye,
	Activity,
	Server,
	Database,
	Users,
	Clock,
	TrendingUp,
	TrendingDown,
	AlertCircle,
	CheckCircle,
} from "lucide-react";

const SuperAdminMonitoringPage: React.FC = () => {
	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
				<div className="flex items-center space-x-4">
					<div className="bg-blue-100 p-3 rounded-full">
						<Eye className="h-8 w-8 text-blue-600" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-blue-800">
							System Monitoring
						</h1>
						<p className="text-blue-600">
							Real-time system performance and health monitoring
						</p>
					</div>
				</div>
			</div>

			{/* Real-time Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Server Load</CardTitle>
						<Server className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">23%</div>
						<p className="text-xs text-muted-foreground flex items-center">
							<TrendingDown className="h-3 w-3 mr-1 text-green-600" />
							-5% from last hour
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
						<Activity className="h-4 w-4 text-yellow-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-yellow-600">67%</div>
						<p className="text-xs text-muted-foreground flex items-center">
							<TrendingUp className="h-3 w-3 mr-1 text-yellow-600" />
							+2% from last hour
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Response Time</CardTitle>
						<Clock className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">145ms</div>
						<p className="text-xs text-muted-foreground flex items-center">
							<TrendingDown className="h-3 w-3 mr-1 text-green-600" />
							-12ms from avg
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Users</CardTitle>
						<Users className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">1,423</div>
						<p className="text-xs text-muted-foreground flex items-center">
							<TrendingUp className="h-3 w-3 mr-1 text-blue-600" />
							+123 from yesterday
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Detailed Monitoring */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Database className="h-5 w-5" />
							<span>Database Performance</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm">Connection Pool</span>
							<div className="flex items-center space-x-2">
								<Badge variant="outline" className="text-yellow-600">
									85%
								</Badge>
								<AlertCircle className="h-4 w-4 text-yellow-600" />
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Query Performance</span>
							<div className="flex items-center space-x-2">
								<Badge variant="outline" className="text-green-600">
									Optimal
								</Badge>
								<CheckCircle className="h-4 w-4 text-green-600" />
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Replication Lag</span>
							<div className="flex items-center space-x-2">
								<Badge variant="outline" className="text-green-600">
									12ms
								</Badge>
								<CheckCircle className="h-4 w-4 text-green-600" />
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Storage Usage</span>
							<div className="flex items-center space-x-2">
								<Badge variant="outline" className="text-blue-600">
									45%
								</Badge>
								<CheckCircle className="h-4 w-4 text-green-600" />
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Activity className="h-5 w-5" />
							<span>API Monitoring</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm">Total Requests</span>
							<Badge variant="outline" className="text-blue-600">
								89.7k today
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Success Rate</span>
							<div className="flex items-center space-x-2">
								<Badge variant="outline" className="text-green-600">
									99.8%
								</Badge>
								<CheckCircle className="h-4 w-4 text-green-600" />
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Error Rate</span>
							<div className="flex items-center space-x-2">
								<Badge variant="outline" className="text-green-600">
									0.02%
								</Badge>
								<CheckCircle className="h-4 w-4 text-green-600" />
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Rate Limiting</span>
							<div className="flex items-center space-x-2">
								<Badge variant="outline" className="text-yellow-600">
									23 blocked
								</Badge>
								<AlertCircle className="h-4 w-4 text-yellow-600" />
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* System Health Status */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<CheckCircle className="h-5 w-5" />
						<span>System Health Status</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium text-green-800">Web Server</p>
								<p className="text-sm text-green-600">Healthy</p>
							</div>
						</div>

						<div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium text-green-800">Database</p>
								<p className="text-sm text-green-600">Online</p>
							</div>
						</div>

						<div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium text-green-800">Cache Server</p>
								<p className="text-sm text-green-600">Optimal</p>
							</div>
						</div>

						<div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
							<AlertCircle className="h-5 w-5 text-yellow-600" />
							<div>
								<p className="font-medium text-yellow-800">File Storage</p>
								<p className="text-sm text-yellow-600">High Usage</p>
							</div>
						</div>

						<div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium text-green-800">Background Jobs</p>
								<p className="text-sm text-green-600">Processing</p>
							</div>
						</div>

						<div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium text-green-800">Email Service</p>
								<p className="text-sm text-green-600">Active</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SuperAdminMonitoringPage;

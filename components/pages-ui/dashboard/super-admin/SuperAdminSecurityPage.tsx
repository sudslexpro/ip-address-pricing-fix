"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Shield,
	Lock,
	Eye,
	AlertTriangle,
	Key,
	Activity,
	CheckCircle,
	XCircle,
	Users,
	Database,
	Loader2,
} from "lucide-react";

const SuperAdminSecurityPage: React.FC = () => {
	const [loading, setLoading] = useState<string>("");

	const handleSecurityAction = async (action: string) => {
		setLoading(action);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setLoading("");
	};

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
				<div className="flex items-center space-x-4">
					<div className="bg-red-100 p-3 rounded-full">
						<Shield className="h-8 w-8 text-red-600" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-red-800">
							Security Dashboard
						</h1>
						<p className="text-red-600">
							Monitor and manage system security settings
						</p>
					</div>
				</div>
			</div>

			{/* Security Status Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Threat Level</CardTitle>
						<Shield className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">Low</div>
						<Badge variant="secondary" className="text-green-600 mt-1">
							No active threats
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
						<Lock className="h-4 w-4 text-yellow-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-yellow-600">23</div>
						<Badge variant="secondary" className="text-yellow-600 mt-1">
							Last 24 hours
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Sessions
						</CardTitle>
						<Eye className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">1,423</div>
						<Badge variant="secondary" className="text-blue-600 mt-1">
							Monitored
						</Badge>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">API Calls</CardTitle>
						<Activity className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-purple-600">89.7k</div>
						<Badge variant="secondary" className="text-purple-600 mt-1">
							Today
						</Badge>
					</CardContent>
				</Card>
			</div>

			{/* Security Controls */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Lock className="h-5 w-5" />
							<span>Security Controls</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Force Password Reset</p>
								<p className="text-sm text-muted-foreground">
									Require all users to update passwords
								</p>
							</div>
							<Button
								onClick={() => handleSecurityAction("password-reset")}
								disabled={loading === "password-reset"}
								variant="destructive"
								className="min-w-[100px]">
								{loading === "password-reset" ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Execute"
								)}
							</Button>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Enable 2FA Requirement</p>
								<p className="text-sm text-muted-foreground">
									Enforce two-factor authentication
								</p>
							</div>
							<Button
								onClick={() => handleSecurityAction("2fa")}
								disabled={loading === "2fa"}
								className="min-w-[100px]">
								{loading === "2fa" ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Enable"
								)}
							</Button>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Lockdown Mode</p>
								<p className="text-sm text-muted-foreground">
									Temporarily disable new logins
								</p>
							</div>
							<Button
								onClick={() => handleSecurityAction("lockdown")}
								disabled={loading === "lockdown"}
								variant="destructive"
								className="min-w-[100px]">
								{loading === "lockdown" ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Activate"
								)}
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Eye className="h-5 w-5" />
							<span>Security Monitoring</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-sm">Firewall Status</span>
							<Badge variant="outline" className="text-green-600">
								Active
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">DDoS Protection</span>
							<Badge variant="outline" className="text-green-600">
								Enabled
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">SSL Certificate</span>
							<Badge variant="outline" className="text-green-600">
								Valid
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Intrusion Detection</span>
							<Badge variant="outline" className="text-blue-600">
								Monitoring
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm">Audit Logging</span>
							<Badge variant="outline" className="text-green-600">
								Active
							</Badge>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Security Events */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<AlertTriangle className="h-5 w-5" />
						<span>Recent Security Events</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
							<div className="flex items-center space-x-2">
								<XCircle className="h-4 w-4 text-red-600" />
								<span className="text-sm">
									Multiple failed login attempts from IP 192.168.1.100
								</span>
							</div>
							<Badge variant="outline" className="text-red-600">
								Critical
							</Badge>
						</div>

						<div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
							<div className="flex items-center space-x-2">
								<AlertTriangle className="h-4 w-4 text-yellow-600" />
								<span className="text-sm">
									Unusual API activity detected from user account
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
									Security scan completed - no vulnerabilities found
								</span>
							</div>
							<Badge variant="outline" className="text-green-600">
								Info
							</Badge>
						</div>

						<div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
							<div className="flex items-center space-x-2">
								<Key className="h-4 w-4 text-blue-600" />
								<span className="text-sm">
									API key regenerated for admin user
								</span>
							</div>
							<Badge variant="outline" className="text-blue-600">
								Info
							</Badge>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SuperAdminSecurityPage;

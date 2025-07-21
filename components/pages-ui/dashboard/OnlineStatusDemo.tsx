"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	useOnlineStatus,
	useConnectivityStatus,
} from "@/hooks/useOnlineStatus";
import OnlineStatusIndicator from "@/components/ui/online-status-indicator";
import {
	getUserOnlineStatus,
	getOnlineStatusLabel,
	formatTimeAgo,
} from "@/lib/utils";
import {
	Wifi,
	WifiOff,
	Activity,
	Clock,
	RefreshCw,
	AlertCircle,
	CheckCircle,
	Globe,
} from "lucide-react";

const OnlineStatusDemo: React.FC = () => {
	const { isOnline, lastOnlineTime, status } = useOnlineStatus();
	const {
		isServerReachable,
		lastPingTime,
		pingLoading,
		overallStatus,
		hasConnectivityIssues,
	} = useConnectivityStatus(true);

	// Demo users with different online statuses
	const [demoUsers] = useState([
		{
			id: "1",
			name: "John Doe",
			email: "john@example.com",
			lastLoginAt: new Date().toISOString(), // Online now
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane@example.com",
			lastLoginAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago (away)
		},
		{
			id: "3",
			name: "Bob Johnson",
			email: "bob@example.com",
			lastLoginAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago (recently active)
		},
		{
			id: "4",
			name: "Alice Brown",
			email: "alice@example.com",
			lastLoginAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago (offline)
		},
		{
			id: "5",
			name: "Charlie Wilson",
			email: "charlie@example.com",
			lastLoginAt: null, // Never logged in
		},
	]);

	const getStatusIcon = (overallStatus: string) => {
		switch (overallStatus) {
			case "online":
				return <CheckCircle className="h-4 w-4 text-green-500" />;
			case "connection-issues":
				return <AlertCircle className="h-4 w-4 text-yellow-500" />;
			case "offline":
				return <WifiOff className="h-4 w-4 text-red-500" />;
			default:
				return <Globe className="h-4 w-4 text-gray-500" />;
		}
	};

	return (
		<div className="space-y-6 p-6">
			<div className="text-center">
				<h1 className="text-3xl font-bold mb-2">Online Status Demo</h1>
				<p className="text-muted-foreground">
					Test the online/offline detection functionality
				</p>
			</div>

			{/* Current User Status */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						{getStatusIcon(overallStatus)}
						Your Connection Status
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="text-center">
							<div className="flex items-center justify-center gap-2 mb-2">
								{isOnline ? (
									<Wifi className="h-5 w-5 text-green-500" />
								) : (
									<WifiOff className="h-5 w-5 text-red-500" />
								)}
								<span className="font-medium">Browser Status</span>
							</div>
							<Badge variant={isOnline ? "default" : "destructive"}>
								{isOnline ? "Online" : "Offline"}
							</Badge>
							<p className="text-xs text-muted-foreground mt-1">
								Last online: {formatTimeAgo(lastOnlineTime)}
							</p>
						</div>

						<div className="text-center">
							<div className="flex items-center justify-center gap-2 mb-2">
								<Activity
									className={`h-5 w-5 ${pingLoading ? "animate-pulse" : ""} ${
										isServerReachable ? "text-green-500" : "text-red-500"
									}`}
								/>
								<span className="font-medium">Server Connection</span>
							</div>
							<Badge variant={isServerReachable ? "default" : "destructive"}>
								{isServerReachable ? "Connected" : "Disconnected"}
							</Badge>
							<p className="text-xs text-muted-foreground mt-1">
								Last ping: {formatTimeAgo(lastPingTime)}
							</p>
						</div>

						<div className="text-center">
							<div className="flex items-center justify-center gap-2 mb-2">
								<Globe className="h-5 w-5 text-blue-500" />
								<span className="font-medium">Overall Status</span>
							</div>
							<Badge
								variant={
									overallStatus === "online"
										? "default"
										: overallStatus === "connection-issues"
										? "secondary"
										: "destructive"
								}>
								{overallStatus
									.replace("-", " ")
									.replace(/\b\w/g, (l) => l.toUpperCase())}
							</Badge>
						</div>
					</div>

					{hasConnectivityIssues && (
						<Alert>
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>
								You appear to be online but there may be connectivity issues
								with our servers.
							</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>

			{/* Demo Users */}
			<Card>
				<CardHeader>
					<CardTitle>Demo Users - Online Status Examples</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{demoUsers.map((user) => {
							const userStatus = getUserOnlineStatus(user.lastLoginAt);
							return (
								<div
									key={user.id}
									className="flex items-center justify-between p-3 border rounded-lg">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
											{user.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</div>
										<div>
											<div className="font-medium">{user.name}</div>
											<div className="text-sm text-muted-foreground">
												{user.email}
											</div>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="text-right">
											<div className="text-sm font-medium">
												{getOnlineStatusLabel(userStatus.status)}
											</div>
											<div className="text-xs text-muted-foreground">
												{userStatus.timeAgo}
											</div>
										</div>
										<OnlineStatusIndicator
											lastLoginAt={user.lastLoginAt}
											variant="default"
											showIcon={true}
											showLabel={false}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* Testing Instructions */}
			<Card>
				<CardHeader>
					<CardTitle>Test Instructions</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h4 className="font-medium mb-2">Browser Online/Offline Test:</h4>
							<ul className="text-sm space-y-1">
								<li>• Open browser DevTools</li>
								<li>• Go to Network tab</li>
								<li>• Toggle "Offline" checkbox</li>
								<li>• Watch status change in real-time</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium mb-2">User Status Examples:</h4>
							<ul className="text-sm space-y-1">
								<li>
									•{" "}
									<span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
									Green: Online (last 5 minutes)
								</li>
								<li>
									•{" "}
									<span className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-2"></span>
									Yellow: Away (5-15 minutes)
								</li>
								<li>
									•{" "}
									<span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-2"></span>
									Blue: Recently active (15-60 minutes)
								</li>
								<li>
									•{" "}
									<span className="w-2 h-2 bg-gray-400 rounded-full inline-block mr-2"></span>
									Gray: Offline (1+ hours)
								</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default OnlineStatusDemo;

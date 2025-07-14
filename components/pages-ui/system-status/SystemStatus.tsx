"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	CheckCircle,
	AlertCircle,
	XCircle,
	Clock,
	TrendingUp,
	Server,
	Database,
	Cloud,
	Shield,
	Globe,
	RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceStatus {
	id: string;
	name: string;
	status: "operational" | "degraded" | "outage" | "maintenance";
	uptime: number;
	responseTime: number;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
}

interface Incident {
	id: string;
	title: string;
	status: "investigating" | "identified" | "monitoring" | "resolved";
	severity: "minor" | "major" | "critical";
	startTime: string;
	resolvedTime?: string;
	description: string;
	updates: {
		time: string;
		message: string;
		status: string;
	}[];
}

const SystemStatus: React.FC = () => {
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
	const [isRefreshing, setIsRefreshing] = useState(false);

	const services: ServiceStatus[] = [
		{
			id: "api",
			name: "API Services",
			status: "operational",
			uptime: 99.95,
			responseTime: 245,
			icon: Server,
			description: "Core API endpoints and authentication services",
		},
		{
			id: "database",
			name: "Database",
			status: "operational",
			uptime: 99.98,
			responseTime: 12,
			icon: Database,
			description: "Primary database and data storage systems",
		},
		{
			id: "pdf-generation",
			name: "PDF Generation",
			status: "operational",
			uptime: 99.92,
			responseTime: 1250,
			icon: Cloud,
			description: "Document generation and PDF creation services",
		},
		{
			id: "security",
			name: "Security Services",
			status: "operational",
			uptime: 100.0,
			responseTime: 89,
			icon: Shield,
			description: "Authentication, authorization, and security monitoring",
		},
		{
			id: "cdn",
			name: "Content Delivery",
			status: "degraded",
			uptime: 98.7,
			responseTime: 450,
			icon: Globe,
			description: "Static asset delivery and content distribution",
		},
	];

	const incidents: Incident[] = [
		{
			id: "inc-001",
			title: "Intermittent CDN Performance Issues",
			status: "monitoring",
			severity: "minor",
			startTime: "2025-07-14T09:30:00Z",
			description:
				"Some users may experience slower loading times for static assets.",
			updates: [
				{
					time: "2025-07-14T10:15:00Z",
					message:
						"We have implemented a fix and are monitoring the situation.",
					status: "monitoring",
				},
				{
					time: "2025-07-14T09:45:00Z",
					message:
						"Issue has been identified with our CDN provider. Working on resolution.",
					status: "identified",
				},
			],
		},
	];

	const getStatusColor = (status: ServiceStatus["status"]) => {
		switch (status) {
			case "operational":
				return "text-green-600";
			case "degraded":
				return "text-yellow-600";
			case "outage":
				return "text-red-600";
			case "maintenance":
				return "text-blue-600";
			default:
				return "text-gray-600";
		}
	};

	const getStatusIcon = (status: ServiceStatus["status"]) => {
		switch (status) {
			case "operational":
				return <CheckCircle className="h-5 w-5 text-green-600" />;
			case "degraded":
				return <AlertCircle className="h-5 w-5 text-yellow-600" />;
			case "outage":
				return <XCircle className="h-5 w-5 text-red-600" />;
			case "maintenance":
				return <Clock className="h-5 w-5 text-blue-600" />;
		}
	};

	const getStatusBadge = (status: ServiceStatus["status"]) => {
		switch (status) {
			case "operational":
				return (
					<Badge variant="secondary" className="bg-green-100 text-green-800">
						Operational
					</Badge>
				);
			case "degraded":
				return (
					<Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
						Degraded
					</Badge>
				);
			case "outage":
				return <Badge variant="destructive">Outage</Badge>;
			case "maintenance":
				return (
					<Badge variant="secondary" className="bg-blue-100 text-blue-800">
						Maintenance
					</Badge>
				);
		}
	};

	const getSeverityBadge = (severity: Incident["severity"]) => {
		switch (severity) {
			case "minor":
				return (
					<Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
						Minor
					</Badge>
				);
			case "major":
				return (
					<Badge variant="secondary" className="bg-orange-100 text-orange-800">
						Major
					</Badge>
				);
			case "critical":
				return <Badge variant="destructive">Critical</Badge>;
		}
	};

	const getIncidentStatusBadge = (status: Incident["status"]) => {
		switch (status) {
			case "investigating":
				return (
					<Badge variant="secondary" className="bg-red-100 text-red-800">
						Investigating
					</Badge>
				);
			case "identified":
				return (
					<Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
						Identified
					</Badge>
				);
			case "monitoring":
				return (
					<Badge variant="secondary" className="bg-blue-100 text-blue-800">
						Monitoring
					</Badge>
				);
			case "resolved":
				return (
					<Badge variant="secondary" className="bg-green-100 text-green-800">
						Resolved
					</Badge>
				);
		}
	};

	const overallStatus = services.every((s) => s.status === "operational")
		? "All Systems Operational"
		: services.some((s) => s.status === "outage")
		? "System Outage"
		: "Partial Service Disruption";

	const overallUptime =
		services.reduce((acc, service) => acc + service.uptime, 0) /
		services.length;

	const handleRefresh = async () => {
		setIsRefreshing(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setLastUpdated(new Date());
		setIsRefreshing(false);
	};

	return (
		<main className="min-h-screen bg-background">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h1 className="text-4xl font-bold tracking-tight">
								System Status
							</h1>
							<p className="text-muted-foreground mt-2">
								Current status and performance of Lex Protector Portal services
							</p>
						</div>
						<Button
							variant="outline"
							onClick={handleRefresh}
							disabled={isRefreshing}
							className="flex items-center gap-2">
							<RefreshCw
								className={cn("h-4 w-4", isRefreshing && "animate-spin")}
							/>
							Refresh
						</Button>
					</div>

					{/* Overall Status */}
					<Card className="border-l-4 border-l-green-500">
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									{overallStatus === "All Systems Operational" ? (
										<CheckCircle className="h-8 w-8 text-green-600" />
									) : (
										<AlertCircle className="h-8 w-8 text-yellow-600" />
									)}
									<div>
										<h2 className="text-2xl font-semibold">{overallStatus}</h2>
										<p className="text-muted-foreground">
											Overall uptime: {overallUptime.toFixed(2)}%
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm text-muted-foreground">Last updated</p>
									<p className="font-medium">
										{lastUpdated.toLocaleTimeString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Active Incidents */}
				{incidents.length > 0 && (
					<div className="mb-8">
						<h2 className="text-2xl font-semibold mb-4">Active Incidents</h2>
						{incidents.map((incident) => (
							<Alert key={incident.id} className="mb-4">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<h3 className="font-semibold">{incident.title}</h3>
												{getSeverityBadge(incident.severity)}
												{getIncidentStatusBadge(incident.status)}
											</div>
											<p className="text-sm text-muted-foreground mb-3">
												{incident.description}
											</p>
											<div className="space-y-2">
												{incident.updates.map((update, index) => (
													<div key={index} className="text-xs">
														<span className="font-medium">
															{new Date(update.time).toLocaleString()}
														</span>
														<span className="ml-2">{update.message}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</AlertDescription>
							</Alert>
						))}
					</div>
				)}

				{/* Services Status */}
				<div className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Services</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{services.map((service) => {
							const IconComponent = service.icon;
							return (
								<Card key={service.id} className="relative">
									<CardHeader className="pb-3">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<IconComponent className="h-6 w-6 text-muted-foreground" />
												<CardTitle className="text-lg">
													{service.name}
												</CardTitle>
											</div>
											{getStatusIcon(service.status)}
										</div>
										<div className="flex items-center gap-2">
											{getStatusBadge(service.status)}
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground mb-4">
											{service.description}
										</p>
										<div className="space-y-3">
											<div>
												<div className="flex justify-between text-sm mb-1">
													<span>Uptime</span>
													<span className="font-medium">{service.uptime}%</span>
												</div>
												<Progress value={service.uptime} className="h-2" />
											</div>
											<div className="flex justify-between text-sm">
												<span>Response Time</span>
												<span className="font-medium">
													{service.responseTime}ms
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>

				{/* Performance Metrics */}
				<div className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">
									Overall Uptime
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-green-600">
									{overallUptime.toFixed(2)}%
								</div>
								<p className="text-xs text-muted-foreground">Last 30 days</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">
									Avg Response Time
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{Math.round(
										services.reduce((acc, s) => acc + s.responseTime, 0) /
											services.length
									)}
									ms
								</div>
								<p className="text-xs text-muted-foreground">
									Across all services
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">
									Active Incidents
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-yellow-600">
									{incidents.filter((i) => i.status !== "resolved").length}
								</div>
								<p className="text-xs text-muted-foreground">
									Currently ongoing
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">
									Services Online
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-green-600">
									{services.filter((s) => s.status === "operational").length}/
									{services.length}
								</div>
								<p className="text-xs text-muted-foreground">
									Operational status
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Historical Data */}
				<div>
					<h2 className="text-2xl font-semibold mb-4">System Health</h2>
					<Card>
						<CardHeader>
							<CardTitle>30-Day Uptime History</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{services.map((service) => (
									<div key={service.id} className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="font-medium">{service.name}</span>
											<span className="text-sm text-muted-foreground">
												{service.uptime}% uptime
											</span>
										</div>
										<Progress value={service.uptime} className="h-2" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default SystemStatus;

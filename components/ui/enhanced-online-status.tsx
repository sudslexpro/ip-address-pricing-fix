"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getUserOnlineStatus, getOnlineStatusLabel } from "@/lib/utils";
import { Wifi, WifiOff, Clock, Activity, Signal } from "lucide-react";

interface EnhancedOnlineStatusProps {
	userId: string;
	lastLoginAt: string | null;
	lastActivityAt?: string | null;
	showAnimation?: boolean;
	showDetailedStatus?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}

const EnhancedOnlineStatus: React.FC<EnhancedOnlineStatusProps> = ({
	userId,
	lastLoginAt,
	lastActivityAt,
	showAnimation = true,
	showDetailedStatus = false,
	size = "md",
	className,
}) => {
	const status = getUserOnlineStatus(lastLoginAt, lastActivityAt);

	const getStatusColor = () => {
		switch (status.status) {
			case "online":
				return "bg-green-500";
			case "away":
				return "bg-yellow-500";
			case "recently-active":
				return "bg-blue-500";
			case "offline":
			default:
				return "bg-gray-400";
		}
	};

	const getStatusIcon = () => {
		const iconSize =
			size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";

		switch (status.status) {
			case "online":
				return <Signal className={cn(iconSize, "text-green-600")} />;
			case "away":
				return <Clock className={cn(iconSize, "text-yellow-600")} />;
			case "recently-active":
				return <Activity className={cn(iconSize, "text-blue-600")} />;
			case "offline":
			default:
				return <WifiOff className={cn(iconSize, "text-gray-500")} />;
		}
	};

	const dotSize =
		size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3";

	if (showDetailedStatus) {
		return (
			<div className={cn("flex items-center gap-3", className)}>
				<div className="relative">
					<div
						className={cn(
							dotSize,
							"rounded-full",
							getStatusColor(),
							showAnimation && status.status === "online" && "animate-pulse"
						)}
					/>
					{showAnimation && status.status === "online" && (
						<div
							className={cn(
								dotSize,
								"absolute top-0 left-0 rounded-full bg-green-500 opacity-25 animate-ping"
							)}
						/>
					)}
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						{getStatusIcon()}
						<span
							className={cn(
								"font-medium",
								size === "sm"
									? "text-xs"
									: size === "lg"
									? "text-base"
									: "text-sm"
							)}>
							{getOnlineStatusLabel(status.status)}
						</span>
					</div>
					<span
						className={cn(
							"text-muted-foreground",
							size === "sm" ? "text-xs" : "text-sm"
						)}>
						{status.timeAgo}
					</span>
				</div>
			</div>
		);
	}

	// Simple dot indicator
	return (
		<div className={cn("flex items-center gap-2", className)}>
			<div className="relative">
				<div
					className={cn(
						dotSize,
						"rounded-full",
						getStatusColor(),
						showAnimation && status.status === "online" && "animate-pulse"
					)}
					title={`${getOnlineStatusLabel(status.status)} - ${status.timeAgo}`}
				/>
				{showAnimation && status.status === "online" && (
					<div
						className={cn(
							dotSize,
							"absolute top-0 left-0 rounded-full bg-green-500 opacity-25 animate-ping"
						)}
					/>
				)}
			</div>
			{size !== "sm" && (
				<span
					className={cn(
						"text-muted-foreground",
						size === "lg" ? "text-sm" : "text-xs"
					)}>
					{status.timeAgo}
				</span>
			)}
		</div>
	);
};

export default EnhancedOnlineStatus;

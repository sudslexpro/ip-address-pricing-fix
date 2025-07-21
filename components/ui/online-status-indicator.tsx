"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	getUserOnlineStatus,
	getOnlineStatusClasses,
	getOnlineStatusLabel,
	type UserOnlineStatus,
} from "@/lib/utils";
import { Wifi, WifiOff, Clock, Activity } from "lucide-react";

interface OnlineStatusIndicatorProps {
	lastLoginAt: string | Date | null;
	lastActivityAt?: string | Date | null;
	showLabel?: boolean;
	showIcon?: boolean;
	showTimeAgo?: boolean;
	variant?: "default" | "dot" | "full";
	onlineThresholdMinutes?: number;
	awayThresholdMinutes?: number;
	className?: string;
}

const OnlineStatusIndicator: React.FC<OnlineStatusIndicatorProps> = ({
	lastLoginAt,
	lastActivityAt,
	showLabel = true,
	showIcon = true,
	showTimeAgo = false,
	variant = "default",
	onlineThresholdMinutes = 5,
	awayThresholdMinutes = 15,
	className,
}) => {
	const userStatus = getUserOnlineStatus(
		lastLoginAt,
		lastActivityAt,
		onlineThresholdMinutes,
		awayThresholdMinutes
	);

	const getStatusIcon = (status: UserOnlineStatus["status"]) => {
		switch (status) {
			case "online":
				return <Wifi className="h-3 w-3" />;
			case "away":
				return <Clock className="h-3 w-3" />;
			case "recently-active":
				return <Activity className="h-3 w-3" />;
			case "offline":
			default:
				return <WifiOff className="h-3 w-3" />;
		}
	};

	if (variant === "dot") {
		return (
			<div className={cn("flex items-center gap-2", className)}>
				<div
					className={cn(
						"w-2 h-2 rounded-full",
						userStatus.status === "online" && "bg-green-500",
						userStatus.status === "away" && "bg-yellow-500",
						userStatus.status === "recently-active" && "bg-blue-500",
						userStatus.status === "offline" && "bg-gray-400"
					)}
					title={`${getOnlineStatusLabel(userStatus.status)} - ${
						userStatus.timeAgo
					}`}
				/>
				{showTimeAgo && (
					<span className="text-xs text-muted-foreground">
						{userStatus.timeAgo}
					</span>
				)}
			</div>
		);
	}

	if (variant === "full") {
		return (
			<div className={cn("flex flex-col gap-1", className)}>
				<Badge
					variant="outline"
					className={cn(
						"flex items-center gap-1 w-fit",
						getOnlineStatusClasses(userStatus.status)
					)}>
					{showIcon && getStatusIcon(userStatus.status)}
					{showLabel && getOnlineStatusLabel(userStatus.status)}
				</Badge>
				{showTimeAgo && (
					<span className="text-xs text-muted-foreground">
						Last seen: {userStatus.timeAgo}
					</span>
				)}
			</div>
		);
	}

	// Default variant
	return (
		<Badge
			variant="outline"
			className={cn(
				"flex items-center gap-1",
				getOnlineStatusClasses(userStatus.status),
				className
			)}
			title={showTimeAgo ? `Last seen: ${userStatus.timeAgo}` : undefined}>
			{showIcon && getStatusIcon(userStatus.status)}
			{showLabel && getOnlineStatusLabel(userStatus.status)}
			{showTimeAgo && (
				<span className="ml-1 text-xs opacity-75">({userStatus.timeAgo})</span>
			)}
		</Badge>
	);
};

export default OnlineStatusIndicator;

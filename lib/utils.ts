import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * User online status utilities
 */

export interface UserOnlineStatus {
	isOnline: boolean;
	status: "online" | "offline" | "away" | "recently-active";
	lastSeen: Date | null;
	timeAgo: string;
}

/**
 * Determines if a user is considered online based on their last activity
 * @param lastLoginAt - User's last login timestamp
 * @param lastActivityAt - User's last activity timestamp (optional)
 * @param onlineThresholdMinutes - Minutes after which user is considered offline (default: 5)
 * @param awayThresholdMinutes - Minutes after which user is considered away (default: 15)
 */
export function getUserOnlineStatus(
	lastLoginAt: string | Date | null,
	lastActivityAt?: string | Date | null,
	onlineThresholdMinutes: number = 5,
	awayThresholdMinutes: number = 15
): UserOnlineStatus {
	const now = new Date();

	// Use the most recent timestamp between login and activity
	const lastSeen = getLastSeenTimestamp(lastLoginAt, lastActivityAt);

	if (!lastSeen) {
		return {
			isOnline: false,
			status: "offline",
			lastSeen: null,
			timeAgo: "Never logged in",
		};
	}

	const lastSeenDate = new Date(lastSeen);
	const minutesSinceLastSeen =
		(now.getTime() - lastSeenDate.getTime()) / (1000 * 60);

	let status: "online" | "offline" | "away" | "recently-active";
	let isOnline: boolean;

	if (minutesSinceLastSeen <= onlineThresholdMinutes) {
		status = "online";
		isOnline = true;
	} else if (minutesSinceLastSeen <= awayThresholdMinutes) {
		status = "away";
		isOnline = true;
	} else if (minutesSinceLastSeen <= 60) {
		// 1 hour
		status = "recently-active";
		isOnline = false;
	} else {
		status = "offline";
		isOnline = false;
	}

	return {
		isOnline,
		status,
		lastSeen: lastSeenDate,
		timeAgo: formatTimeAgo(lastSeenDate),
	};
}

/**
 * Gets the most recent timestamp between login and activity
 */
function getLastSeenTimestamp(
	lastLoginAt: string | Date | null,
	lastActivityAt?: string | Date | null
): string | Date | null {
	if (!lastLoginAt && !lastActivityAt) return null;
	if (!lastActivityAt) return lastLoginAt;
	if (!lastLoginAt) return lastActivityAt;

	const loginTime = new Date(lastLoginAt).getTime();
	const activityTime = new Date(lastActivityAt).getTime();

	return loginTime > activityTime ? lastLoginAt : lastActivityAt;
}

/**
 * Formats a date as "time ago" string
 */
export function formatTimeAgo(date: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) {
		return "Just now";
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 30) {
		return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
	}

	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) {
		return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
	}

	const diffInYears = Math.floor(diffInMonths / 12);
	return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
}

/**
 * Gets the appropriate CSS classes for online status badges
 */
export function getOnlineStatusClasses(
	status: UserOnlineStatus["status"]
): string {
	switch (status) {
		case "online":
			return "bg-green-100 text-green-800 border-green-200";
		case "away":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case "recently-active":
			return "bg-blue-100 text-blue-800 border-blue-200";
		case "offline":
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
}

/**
 * Gets a human-readable status label
 */
export function getOnlineStatusLabel(
	status: UserOnlineStatus["status"]
): string {
	switch (status) {
		case "online":
			return "Online";
		case "away":
			return "Away";
		case "recently-active":
			return "Recently Active";
		case "offline":
		default:
			return "Offline";
	}
}

/**
 * Simple check if a user is considered "online" (online or away)
 */
export function isUserOnline(
	lastLoginAt: string | Date | null,
	lastActivityAt?: string | Date | null
): boolean {
	const status = getUserOnlineStatus(lastLoginAt, lastActivityAt);
	return status.isOnline;
}

/**
 * Get a brief status description for a user
 */
export function getUserStatusDescription(
	lastLoginAt: string | Date | null,
	lastActivityAt?: string | Date | null
): string {
	const status = getUserOnlineStatus(lastLoginAt, lastActivityAt);
	return `${getOnlineStatusLabel(status.status)} • ${status.timeAgo}`;
}

/**
 * Check if user has been active recently (within last hour)
 */
export function isRecentlyActive(
	lastLoginAt: string | Date | null,
	lastActivityAt?: string | Date | null
): boolean {
	const status = getUserOnlineStatus(lastLoginAt, lastActivityAt);
	return (
		status.status === "online" ||
		status.status === "away" ||
		status.status === "recently-active"
	);
}

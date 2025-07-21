import { getUserOnlineStatus } from "@/lib/utils";

/**
 * Simple utility functions for checking user online status
 * These can be used throughout the application for quick status checks
 */

export interface UserOnlineCheck {
	id: string;
	lastLoginAt: string | null;
	lastActivityAt?: string | null;
}

/**
 * Check if a user is currently online (online or away status)
 */
export function checkUserIsOnline(user: UserOnlineCheck): boolean {
	const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
	return status.isOnline;
}

/**
 * Check if a user is actively online (only "online" status)
 */
export function checkUserIsActivelyOnline(user: UserOnlineCheck): boolean {
	const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
	return status.status === "online";
}

/**
 * Check if a user is away
 */
export function checkUserIsAway(user: UserOnlineCheck): boolean {
	const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
	return status.status === "away";
}

/**
 * Check if a user is offline
 */
export function checkUserIsOffline(user: UserOnlineCheck): boolean {
	const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
	return status.status === "offline";
}

/**
 * Check if a user was recently active (within last hour)
 */
export function checkUserIsRecentlyActive(user: UserOnlineCheck): boolean {
	const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
	return status.status === "recently-active";
}

/**
 * Get a simple online status string for a user
 */
export function getUserOnlineStatusString(
	user: UserOnlineCheck
): "online" | "away" | "recently-active" | "offline" {
	const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
	return status.status;
}

/**
 * Get a human-readable status description
 */
export function getUserOnlineDescription(user: UserOnlineCheck): string {
	const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);

	switch (status.status) {
		case "online":
			return `Online • ${status.timeAgo}`;
		case "away":
			return `Away • ${status.timeAgo}`;
		case "recently-active":
			return `Recently Active • ${status.timeAgo}`;
		case "offline":
		default:
			return `Offline • ${status.timeAgo}`;
	}
}

/**
 * Filter an array of users by online status
 */
export function filterUsersByOnlineStatus<T extends UserOnlineCheck>(
	users: T[],
	statusFilter: "all" | "online" | "away" | "recently-active" | "offline"
): T[] {
	if (statusFilter === "all") return users;

	return users.filter((user) => {
		const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
		return status.status === statusFilter;
	});
}

/**
 * Count users by online status
 */
export function countUsersByOnlineStatus(users: UserOnlineCheck[]) {
	const counts = {
		online: 0,
		away: 0,
		"recently-active": 0,
		offline: 0,
		total: users.length,
	};

	users.forEach((user) => {
		const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
		counts[status.status]++;
	});

	return counts;
}

/**
 * Get online users (online + away)
 */
export function getOnlineUsers<T extends UserOnlineCheck>(users: T[]): T[] {
	return users.filter((user) => checkUserIsOnline(user));
}

/**
 * Get offline users (offline + recently-active)
 */
export function getOfflineUsers<T extends UserOnlineCheck>(users: T[]): T[] {
	return users.filter((user) => !checkUserIsOnline(user));
}

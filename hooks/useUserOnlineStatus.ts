"use client";

import { useState, useEffect, useCallback } from "react";
import { getUserOnlineStatus, type UserOnlineStatus } from "@/lib/utils";

interface User {
	id: string;
	lastLoginAt: string | null;
	lastActivityAt?: string | null;
}

/**
 * Hook to track online status for multiple users
 * Updates status in real-time and provides filtering capabilities
 */
export function useUsersOnlineStatus(
	users: User[],
	refreshInterval: number = 60000
) {
	const [userStatuses, setUserStatuses] = useState<
		Map<string, UserOnlineStatus>
	>(new Map());

	const updateUserStatuses = useCallback(() => {
		const newStatuses = new Map<string, UserOnlineStatus>();

		users.forEach((user) => {
			const status = getUserOnlineStatus(user.lastLoginAt, user.lastActivityAt);
			newStatuses.set(user.id, status);
		});

		setUserStatuses(newStatuses);
	}, [users]);

	// Update statuses when users change
	useEffect(() => {
		updateUserStatuses();
	}, [updateUserStatuses]);

	// Auto-update statuses periodically
	useEffect(() => {
		const interval = setInterval(updateUserStatuses, refreshInterval);
		return () => clearInterval(interval);
	}, [updateUserStatuses, refreshInterval]);

	const getUserStatus = useCallback(
		(userId: string): UserOnlineStatus | null => {
			return userStatuses.get(userId) || null;
		},
		[userStatuses]
	);

	const getOnlineUsers = useCallback(() => {
		return users.filter((user) => {
			const status = userStatuses.get(user.id);
			return status?.isOnline || false;
		});
	}, [users, userStatuses]);

	const getOfflineUsers = useCallback(() => {
		return users.filter((user) => {
			const status = userStatuses.get(user.id);
			return !status?.isOnline;
		});
	}, [users, userStatuses]);

	const getUsersByStatus = useCallback(
		(statusType: "online" | "away" | "recently-active" | "offline") => {
			return users.filter((user) => {
				const status = userStatuses.get(user.id);
				return status?.status === statusType;
			});
		},
		[users, userStatuses]
	);

	const getStatusCounts = useCallback(() => {
		const counts = {
			online: 0,
			away: 0,
			"recently-active": 0,
			offline: 0,
			total: users.length,
		};

		users.forEach((user) => {
			const status = userStatuses.get(user.id);
			if (status) {
				counts[status.status]++;
			} else {
				counts.offline++;
			}
		});

		return counts;
	}, [users, userStatuses]);

	return {
		userStatuses,
		getUserStatus,
		getOnlineUsers,
		getOfflineUsers,
		getUsersByStatus,
		getStatusCounts,
		updateUserStatuses,
	};
}

/**
 * Hook to track a single user's online status with real-time updates
 */
export function useUserOnlineStatus(
	userId: string,
	lastLoginAt: string | null,
	lastActivityAt?: string | null,
	refreshInterval: number = 30000
) {
	const [status, setStatus] = useState<UserOnlineStatus>(() =>
		getUserOnlineStatus(lastLoginAt, lastActivityAt)
	);

	const updateStatus = useCallback(() => {
		const newStatus = getUserOnlineStatus(lastLoginAt, lastActivityAt);
		setStatus(newStatus);
	}, [lastLoginAt, lastActivityAt]);

	useEffect(() => {
		updateStatus();
	}, [updateStatus]);

	useEffect(() => {
		const interval = setInterval(updateStatus, refreshInterval);
		return () => clearInterval(interval);
	}, [updateStatus, refreshInterval]);

	return {
		status,
		isOnline: status.isOnline,
		statusType: status.status,
		timeAgo: status.timeAgo,
		lastSeen: status.lastSeen,
		updateStatus,
	};
}

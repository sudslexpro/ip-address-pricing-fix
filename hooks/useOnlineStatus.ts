"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current user is online or offline
 * Uses the Navigator.onLine API and listens to online/offline events
 */
export function useOnlineStatus() {
	const [isOnline, setIsOnline] = useState<boolean>(true);
	const [lastOnlineTime, setLastOnlineTime] = useState<Date>(new Date());

	useEffect(() => {
		// Set initial state
		setIsOnline(navigator.onLine);

		const handleOnline = () => {
			setIsOnline(true);
			setLastOnlineTime(new Date());
		};

		const handleOffline = () => {
			setIsOnline(false);
		};

		// Add event listeners
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		// Additional check with visibility API for tab focus changes
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				// Check online status when tab becomes visible
				setIsOnline(navigator.onLine);
				if (navigator.onLine) {
					setLastOnlineTime(new Date());
				}
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Cleanup event listeners
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return {
		isOnline,
		lastOnlineTime,
		status: isOnline ? "online" : "offline",
	};
}

/**
 * Hook to periodically ping a server to verify actual connectivity
 * More reliable than navigator.onLine but uses more resources
 */
export function useServerConnectivity(
	pingInterval: number = 30000, // 30 seconds
	enabled: boolean = true
) {
	const [isServerReachable, setIsServerReachable] = useState<boolean>(true);
	const [lastPingTime, setLastPingTime] = useState<Date>(new Date());
	const [pingLoading, setPingLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!enabled) return;

		const pingServer = async () => {
			setPingLoading(true);
			try {
				// Use a lightweight endpoint or create one specifically for health checks
				const response = await fetch("/api/health", {
					method: "HEAD",
					cache: "no-cache",
				});

				setIsServerReachable(response.ok);
				setLastPingTime(new Date());
			} catch (error) {
				setIsServerReachable(false);
			} finally {
				setPingLoading(false);
			}
		};

		// Initial ping
		pingServer();

		// Set up interval
		const intervalId = setInterval(pingServer, pingInterval);

		return () => {
			clearInterval(intervalId);
		};
	}, [pingInterval, enabled]);

	return {
		isServerReachable,
		lastPingTime,
		pingLoading,
		status: isServerReachable ? "connected" : "disconnected",
	};
}

/**
 * Combined hook that provides comprehensive connectivity status
 */
export function useConnectivityStatus(enableServerPing: boolean = false) {
	const { isOnline, lastOnlineTime } = useOnlineStatus();
	const { isServerReachable, lastPingTime, pingLoading } =
		useServerConnectivity(30000, enableServerPing);

	const getOverallStatus = () => {
		if (!isOnline) return "offline";
		if (enableServerPing && !isServerReachable) return "connection-issues";
		return "online";
	};

	return {
		isOnline,
		isServerReachable,
		lastOnlineTime,
		lastPingTime,
		pingLoading,
		overallStatus: getOverallStatus(),
		hasConnectivityIssues: isOnline && enableServerPing && !isServerReachable,
	};
}

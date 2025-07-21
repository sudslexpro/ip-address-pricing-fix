/**
 * Demo utilities for testing online/offline status functionality
 * These functions can be used to simulate status changes for testing
 */

interface DemoUser {
	id: string;
	name: string;
	email: string;
	lastLoginAt: string | null;
	lastActivityAt?: string | null;
}

/**
 * Create demo users with different online statuses
 */
export function createDemoUsers(): DemoUser[] {
	const now = new Date();

	return [
		{
			id: "1",
			name: "Alice Johnson",
			email: "alice@example.com",
			lastLoginAt: new Date(now.getTime() - 2 * 60 * 1000).toISOString(), // 2 minutes ago (online)
			lastActivityAt: new Date(now.getTime() - 1 * 60 * 1000).toISOString(), // 1 minute ago
		},
		{
			id: "2",
			name: "Bob Smith",
			email: "bob@example.com",
			lastLoginAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 minutes ago (away)
		},
		{
			id: "3",
			name: "Carol Davis",
			email: "carol@example.com",
			lastLoginAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(), // 45 minutes ago (recently active)
		},
		{
			id: "4",
			name: "David Wilson",
			email: "david@example.com",
			lastLoginAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago (offline)
		},
		{
			id: "5",
			name: "Eve Brown",
			email: "eve@example.com",
			lastLoginAt: null, // Never logged in (offline)
		},
	];
}

/**
 * Simulate a user going online
 */
export function simulateUserOnline(user: DemoUser): DemoUser {
	return {
		...user,
		lastLoginAt: new Date().toISOString(),
		lastActivityAt: new Date().toISOString(),
	};
}

/**
 * Simulate a user going away
 */
export function simulateUserAway(user: DemoUser): DemoUser {
	const now = new Date();
	return {
		...user,
		lastLoginAt: new Date(now.getTime() - 8 * 60 * 1000).toISOString(), // 8 minutes ago
		lastActivityAt: new Date(now.getTime() - 7 * 60 * 1000).toISOString(), // 7 minutes ago
	};
}

/**
 * Simulate a user going offline
 */
export function simulateUserOffline(user: DemoUser): DemoUser {
	const now = new Date();
	return {
		...user,
		lastLoginAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
		lastActivityAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
	};
}

/**
 * Update a user's activity to current time
 */
export function updateUserActivity(user: DemoUser): DemoUser {
	return {
		...user,
		lastActivityAt: new Date().toISOString(),
	};
}

/**
 * Get a random status change for demo purposes
 */
export function getRandomStatusChange(user: DemoUser): DemoUser {
	const changes = [simulateUserOnline, simulateUserAway, simulateUserOffline];
	const randomChange = changes[Math.floor(Math.random() * changes.length)];
	return randomChange(user);
}

/**
 * Console helper for testing online status functionality
 */
export function logUserStatus(user: DemoUser, label?: string) {
	console.log(`${label || "User"}: ${user.name}`);
	console.log(`  Last Login: ${user.lastLoginAt}`);
	console.log(`  Last Activity: ${user.lastActivityAt || "N/A"}`);
	console.log("---");
}

/**
 * Utility functions for generating LPP-prefixed user IDs
 */

/**
 * Generates a unique user ID with LPP prefix
 * Format: LPP + 5 random digits (e.g., LPP13655)
 * @returns {string} A unique user ID with LPP prefix
 */
export function generateLPPUserId(): string {
	// Generate 5 random digits (10000-99999)
	const randomDigits = Math.floor(10000 + Math.random() * 90000);
	return `LPP${randomDigits}`;
}

/**
 * Generates a more robust LPP user ID using timestamp + random
 * Format: LPP + last 2 digits of timestamp + 3 random digits
 * @returns {string} A unique user ID with LPP prefix
 */
export function generateRobustLPPUserId(): string {
	const timestamp = Date.now();
	const timestampSuffix = timestamp.toString().slice(-2);
	const randomDigits = Math.floor(100 + Math.random() * 900);
	return `LPP${timestampSuffix}${randomDigits}`;
}

/**
 * Validates if a user ID follows the LPP format
 * @param {string} userId - The user ID to validate
 * @returns {boolean} True if the user ID follows LPP format
 */
export function isValidLPPUserId(userId: string): boolean {
	const lppPattern = /^LPP\d{5}$/;
	return lppPattern.test(userId);
}

/**
 * Extracts the numeric part from an LPP user ID
 * @param {string} userId - The LPP user ID
 * @returns {number} The numeric part of the user ID
 */
export function extractLPPNumber(userId: string): number {
	if (!isValidLPPUserId(userId)) {
		throw new Error(`Invalid LPP user ID format: ${userId}`);
	}
	return parseInt(userId.substring(3));
}

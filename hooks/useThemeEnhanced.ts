"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export interface UseThemeEnhancedReturn {
	theme: string | undefined;
	setTheme: (theme: string) => void;
	resolvedTheme: string | undefined;
	systemTheme: string | undefined;
	isDark: boolean;
	isLight: boolean;
	isSystem: boolean;
	mounted: boolean;
	toggleTheme: () => void;
	cycleTheme: () => void;
}

/**
 * Enhanced theme hook with additional utilities
 * Provides convenient properties and methods for theme management
 */
export function useThemeEnhanced(): UseThemeEnhancedReturn {
	const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = resolvedTheme === "dark";
	const isLight = resolvedTheme === "light";
	const isSystem = theme === "system";

	const toggleTheme = () => {
		if (theme === "dark") {
			setTheme("light");
		} else if (theme === "light") {
			setTheme("dark");
		} else {
			// If system, toggle to the opposite of current resolved theme
			setTheme(isDark ? "light" : "dark");
		}
	};

	const cycleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else if (theme === "dark") {
			setTheme("system");
		} else {
			setTheme("light");
		}
	};

	return {
		theme,
		setTheme,
		resolvedTheme,
		systemTheme,
		isDark,
		isLight,
		isSystem,
		mounted,
		toggleTheme,
		cycleTheme,
	};
}

/**
 * Hook to get theme-aware CSS classes
 */
export function useThemeClasses() {
	const { isDark, isLight, mounted } = useThemeEnhanced();

	if (!mounted) {
		return {
			isDark: false,
			isLight: true,
			mounted: false,
			getThemeClass: () => "",
		};
	}

	const getThemeClass = (lightClass: string, darkClass: string) => {
		return isDark ? darkClass : lightClass;
	};

	return {
		isDark,
		isLight,
		mounted,
		getThemeClass,
	};
}

/**
 * Hook for theme-aware colors
 */
export function useThemeColors() {
	const { isDark, mounted } = useThemeEnhanced();

	if (!mounted) {
		return {
			primary: "#000000",
			secondary: "#666666",
			background: "#ffffff",
			foreground: "#000000",
		};
	}

	// These would typically come from your CSS variables
	// but can be overridden for specific use cases
	return {
		primary: isDark ? "#ffffff" : "#000000",
		secondary: isDark ? "#a1a1aa" : "#71717a",
		background: isDark ? "#09090b" : "#ffffff",
		foreground: isDark ? "#fafafa" : "#09090b",
		muted: isDark ? "#27272a" : "#f4f4f5",
		accent: isDark ? "#27272a" : "#f4f4f5",
		border: isDark ? "#27272a" : "#e4e4e7",
	};
}

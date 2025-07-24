"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
	className?: string;
	/**
	 * The variant style of the theme toggle
	 * - "dropdown": Full dropdown with Light/Dark/System options (default)
	 * - "switch": Simple toggle between light and dark
	 * - "compact": Small button with current theme icon
	 * - "icon-only": Icon-only dropdown without text
	 */
	variant?: "dropdown" | "switch" | "compact" | "icon-only";
	/**
	 * Button size
	 */
	size?: "default" | "sm" | "lg" | "icon";
	/**
	 * Show text label alongside icon
	 */
	showLabel?: boolean;
	/**
	 * Button appearance variant
	 */
	appearance?: "default" | "outline" | "ghost" | "secondary";
	/**
	 * Enable cycling through all themes (Light -> Dark -> System)
	 */
	enableCycle?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
	className,
	variant = "dropdown",
	size = "icon",
	showLabel = false,
	appearance = "outline",
	enableCycle = false,
}) => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				variant={appearance}
				size={size}
				className={cn(size === "icon" ? "h-9 w-9" : "gap-2", className)}
				disabled>
				<Sun className="h-4 w-4" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	}

	const getThemeIcon = (currentTheme?: string) => {
		const themeToCheck = currentTheme || resolvedTheme;
		switch (themeToCheck) {
			case "dark":
				return <Moon className="h-4 w-4" />;
			case "light":
				return <Sun className="h-4 w-4" />;
			default:
				return <Monitor className="h-4 w-4" />;
		}
	};

	const getThemeLabel = () => {
		switch (theme) {
			case "dark":
				return "Dark";
			case "light":
				return "Light";
			case "system":
				return "System";
			default:
				return "Theme";
		}
	};

	const toggleTheme = () => {
		const isDark = resolvedTheme === "dark" || theme === "dark";
		setTheme(isDark ? "light" : "dark");
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

	const handleClick = () => {
		if (enableCycle) {
			cycleTheme();
		} else {
			toggleTheme();
		}
	};

	// Switch variant - simple toggle button
	if (variant === "switch") {
		return (
			<Button
				variant={appearance === "default" ? "ghost" : appearance}
				size={size}
				onClick={handleClick}
				className={cn(size === "icon" ? "h-9 w-9" : "gap-2", className)}>
				{resolvedTheme === "dark" ? (
					<Sun className="h-4 w-4" />
				) : (
					<Moon className="h-4 w-4" />
				)}
				{showLabel && size !== "icon" && (
					<span className="text-sm">
						{resolvedTheme === "dark" ? "Light" : "Dark"}
					</span>
				)}
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	}

	// Compact variant - shows current theme icon
	if (variant === "compact") {
		return (
			<Button
				variant={appearance}
				size={size}
				onClick={handleClick}
				className={cn(size === "icon" ? "h-9 w-9" : "gap-2", className)}>
				{getThemeIcon()}
				{showLabel && size !== "icon" && (
					<span className="text-sm">{getThemeLabel()}</span>
				)}
				<span className="sr-only">
					{enableCycle ? "Cycle theme" : "Toggle theme"}
				</span>
			</Button>
		);
	}

	// Icon-only variant - dropdown without text
	if (variant === "icon-only") {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={appearance}
						size={size}
						className={cn(size === "icon" ? "h-9 w-9" : "gap-2", className)}>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="mt-1">
					<DropdownMenuItem
						onClick={() => setTheme("light")}
						className="flex items-center gap-2">
						<Sun className="h-4 w-4" />
						Light
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setTheme("dark")}
						className="flex items-center gap-2">
						<Moon className="h-4 w-4" />
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setTheme("system")}
						className="flex items-center gap-2">
						<Monitor className="h-4 w-4" />
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	// Default dropdown variant
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={appearance}
					size={size}
					className={cn(size === "icon" ? "h-9 w-9" : "gap-2", className)}>
					{getThemeIcon()}
					{showLabel && size !== "icon" && <span>{getThemeLabel()}</span>}
					<span className="sr-only">Open theme menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="mt-1">
				<DropdownMenuItem
					onClick={() => setTheme("light")}
					className="flex items-center gap-2">
					<Sun className="h-4 w-4" />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("dark")}
					className="flex items-center gap-2">
					<Moon className="h-4 w-4" />
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("system")}
					className="flex items-center gap-2">
					<Monitor className="h-4 w-4" />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

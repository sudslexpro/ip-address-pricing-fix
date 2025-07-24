"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useThemeEnhanced } from "@/hooks/useThemeEnhanced";
import { cn } from "@/lib/utils";
import {
	Monitor,
	Moon,
	Sun,
	Palette,
	Settings,
	Eye,
	EyeOff,
} from "lucide-react";

interface ThemeControlPanelProps {
	className?: string;
	showAdvanced?: boolean;
}

export function ThemeControlPanel({
	className,
	showAdvanced = false,
}: ThemeControlPanelProps) {
	const {
		theme,
		resolvedTheme,
		isDark,
		isLight,
		isSystem,
		mounted,
		toggleTheme,
		cycleTheme,
	} = useThemeEnhanced();

	if (!mounted) {
		return (
			<Card className={cn("w-full max-w-md", className)}>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Palette className="h-5 w-5" />
						Theme Settings
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="animate-pulse space-y-2">
						<div className="h-4 bg-muted rounded" />
						<div className="h-8 bg-muted rounded" />
					</div>
				</CardContent>
			</Card>
		);
	}

	const getThemeIcon = () => {
		switch (theme) {
			case "dark":
				return <Moon className="h-4 w-4" />;
			case "light":
				return <Sun className="h-4 w-4" />;
			case "system":
				return <Monitor className="h-4 w-4" />;
			default:
				return <Settings className="h-4 w-4" />;
		}
	};

	const getThemeDescription = () => {
		switch (theme) {
			case "dark":
				return "Dark theme is active";
			case "light":
				return "Light theme is active";
			case "system":
				return `Following system preference (${resolvedTheme})`;
			default:
				return "Theme preference not set";
		}
	};

	return (
		<Card className={cn("w-full max-w-md", className)}>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Palette className="h-5 w-5" />
					Theme Settings
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Current Theme Status */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{getThemeIcon()}
						<span className="font-medium capitalize">{theme}</span>
					</div>
					<Badge variant={isDark ? "default" : "secondary"}>
						{resolvedTheme}
					</Badge>
				</div>

				<p className="text-sm text-muted-foreground">{getThemeDescription()}</p>

				{/* Theme Controls */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">Quick Toggle</span>
					</div>

					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={toggleTheme}
							className="flex-1">
							<Eye className="h-4 w-4 mr-2" />
							Toggle
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={cycleTheme}
							className="flex-1">
							<EyeOff className="h-4 w-4 mr-2" />
							Cycle
						</Button>
					</div>
				</div>

				{/* Advanced Options */}
				{showAdvanced && (
					<div className="pt-2 border-t border-border space-y-2">
						<h4 className="text-sm font-medium">Advanced</h4>
						<div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
							<div>System: {resolvedTheme}</div>
							<div>Stored: {theme}</div>
							<div>Dark: {isDark ? "Yes" : "No"}</div>
							<div>Light: {isLight ? "Yes" : "No"}</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default ThemeControlPanel;

"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeControlPanel } from "@/components/ui/theme-control-panel";
import {
	themeClasses,
	statusClasses,
	componentClasses,
	gradientClasses,
	shadowClasses,
} from "@/lib/theme-utils";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	CheckCircle2,
	Info,
	Lightbulb,
	Moon,
	Sun,
	Palette,
	Code,
	Eye,
} from "lucide-react";

export default function DarkModeDemo() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Header */}
			<div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Palette className="h-8 w-8 text-primary" />
							<div>
								<h1 className="text-2xl font-bold">Dark Mode Demo</h1>
								<p className="text-sm text-muted-foreground">
									Comprehensive dark mode theme showcase
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<ThemeToggle variant="dropdown" showLabel />
							<ThemeToggle variant="switch" />
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8 space-y-8">
				{/* Theme Toggle Variants */}
				<Card className={componentClasses.card}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Sun className="h-5 w-5" />
							Theme Toggle Components
						</CardTitle>
						<CardDescription>
							Different variants of theme toggle switches
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="space-y-3">
								<h4 className="font-medium">Dropdown Variants</h4>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<ThemeToggle variant="dropdown" />
										<span className="text-sm text-muted-foreground">
											Icon only
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle variant="dropdown" showLabel />
										<span className="text-sm text-muted-foreground">
											With label
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle variant="dropdown" size="sm" showLabel />
										<span className="text-sm text-muted-foreground">
											Small size
										</span>
									</div>
								</div>
							</div>
							<div className="space-y-3">
								<h4 className="font-medium">Switch Variants</h4>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<ThemeToggle variant="switch" />
										<span className="text-sm text-muted-foreground">
											Simple toggle
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle variant="switch" showLabel />
										<span className="text-sm text-muted-foreground">
											With label
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle
											variant="switch"
											appearance="ghost"
											showLabel
										/>
										<span className="text-sm text-muted-foreground">
											Ghost style
										</span>
									</div>
								</div>
							</div>
							<div className="space-y-3">
								<h4 className="font-medium">Compact Variants</h4>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<ThemeToggle variant="compact" />
										<span className="text-sm text-muted-foreground">
											Icon only
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle variant="compact" showLabel />
										<span className="text-sm text-muted-foreground">
											With label
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle variant="compact" enableCycle showLabel />
										<span className="text-sm text-muted-foreground">
											Cycling enabled
										</span>
									</div>
								</div>
							</div>
							<div className="space-y-3">
								<h4 className="font-medium">Icon-Only</h4>
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<ThemeToggle variant="icon-only" />
										<span className="text-sm text-muted-foreground">
											Animated icons
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle variant="icon-only" appearance="ghost" />
										<span className="text-sm text-muted-foreground">
											Ghost style
										</span>
									</div>
									<div className="flex items-center gap-2">
										<ThemeToggle variant="icon-only" appearance="secondary" />
										<span className="text-sm text-muted-foreground">
											Secondary style
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Usage Examples */}
						<div className="mt-8 p-4 bg-muted/50 rounded-lg">
							<h4 className="font-medium mb-4">Common Usage Patterns</h4>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<div>
									<h5 className="font-medium mb-2">Desktop Header</h5>
									<div className="flex items-center gap-2 p-2 bg-background rounded border">
										<span className="text-muted-foreground">Logo</span>
										<div className="flex-1"></div>
										<ThemeToggle variant="icon-only" />
									</div>
								</div>
								<div>
									<h5 className="font-medium mb-2">Mobile Navigation</h5>
									<div className="flex flex-col gap-2 p-2 bg-background rounded border">
										<div className="text-center">
											<ThemeToggle variant="compact" showLabel />
										</div>
									</div>
								</div>
								<div>
									<h5 className="font-medium mb-2">Settings Panel</h5>
									<div className="flex items-center justify-between p-2 bg-background rounded border">
										<span>Theme</span>
										<ThemeToggle variant="dropdown" showLabel />
									</div>
								</div>
								<div>
									<h5 className="font-medium mb-2">Toolbar</h5>
									<div className="flex items-center gap-1 p-2 bg-background rounded border">
										<Button size="sm" variant="ghost">
											Action 1
										</Button>
										<Button size="sm" variant="ghost">
											Action 2
										</Button>
										<Separator orientation="vertical" className="h-4" />
										<ThemeToggle variant="switch" />
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Color Palette */}
				<Card className={componentClasses.card}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Palette className="h-5 w-5" />
							Color System
						</CardTitle>
						<CardDescription>
							Theme-aware color variables and their usage
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{Object.entries(themeClasses.background).map(
								([key, className]) => (
									<div key={key} className="space-y-2">
										<div
											className={cn(
												className,
												"h-16 rounded border border-border"
											)}
										/>
										<div className="text-sm">
											<div className="font-medium capitalize">{key}</div>
											<div className="text-muted-foreground text-xs">
												{className}
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</CardContent>
				</Card>

				{/* Status Indicators */}
				<Card className={componentClasses.card}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<AlertCircle className="h-5 w-5" />
							Status Components
						</CardTitle>
						<CardDescription>
							Theme-aware status messages and indicators
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Alert
							className={cn(
								statusClasses.success.background,
								statusClasses.success.border
							)}>
							<CheckCircle2
								className={cn("h-4 w-4", statusClasses.success.text)}
							/>
							<AlertTitle className={statusClasses.success.text}>
								Success
							</AlertTitle>
							<AlertDescription className={statusClasses.success.text}>
								Your changes have been saved successfully.
							</AlertDescription>
						</Alert>

						<Alert
							className={cn(
								statusClasses.warning.background,
								statusClasses.warning.border
							)}>
							<Lightbulb
								className={cn("h-4 w-4", statusClasses.warning.text)}
							/>
							<AlertTitle className={statusClasses.warning.text}>
								Warning
							</AlertTitle>
							<AlertDescription className={statusClasses.warning.text}>
								This action cannot be undone. Please proceed with caution.
							</AlertDescription>
						</Alert>

						<Alert
							className={cn(
								statusClasses.error.background,
								statusClasses.error.border
							)}>
							<AlertCircle
								className={cn("h-4 w-4", statusClasses.error.text)}
							/>
							<AlertTitle className={statusClasses.error.text}>
								Error
							</AlertTitle>
							<AlertDescription className={statusClasses.error.text}>
								Something went wrong. Please try again later.
							</AlertDescription>
						</Alert>

						<Alert
							className={cn(
								statusClasses.info.background,
								statusClasses.info.border
							)}>
							<Info className={cn("h-4 w-4", statusClasses.info.text)} />
							<AlertTitle className={statusClasses.info.text}>
								Information
							</AlertTitle>
							<AlertDescription className={statusClasses.info.text}>
								Here's some helpful information about this feature.
							</AlertDescription>
						</Alert>
					</CardContent>
				</Card>

				{/* Button Variants */}
				<Card className={componentClasses.card}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Code className="h-5 w-5" />
							Interactive Components
						</CardTitle>
						<CardDescription>
							Buttons and interactive elements in different themes
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<div className="space-y-2">
								<h4 className="font-medium">Button Variants</h4>
								<div className="flex flex-wrap gap-2">
									<Button variant="default">Primary</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
									<Button variant="destructive">Destructive</Button>
								</div>
							</div>

							<Separator />

							<div className="space-y-2">
								<h4 className="font-medium">Badge Variants</h4>
								<div className="flex flex-wrap gap-2">
									<Badge variant="default">Default</Badge>
									<Badge variant="secondary">Secondary</Badge>
									<Badge variant="outline">Outline</Badge>
									<Badge variant="destructive">Destructive</Badge>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Gradient Backgrounds */}
				<Card className={componentClasses.card}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Eye className="h-5 w-5" />
							Visual Effects
						</CardTitle>
						<CardDescription>
							Gradients, shadows, and visual effects
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{Object.entries(gradientClasses).map(([key, className]) => (
								<div key={key} className="space-y-2">
									<div
										className={cn(
											className,
											"h-20 rounded-lg border border-border",
											shadowClasses.md
										)}
									/>
									<div className="text-sm">
										<div className="font-medium capitalize">{key}</div>
										<div className="text-muted-foreground text-xs">
											{className}
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Theme Control Panel */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<ThemeControlPanel showAdvanced />
					<ThemeControlPanel />
				</div>

				{/* Glass Morphism Example */}
				<div className="relative h-64 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg overflow-hidden">
					<div className="absolute inset-0 bg-black/20" />
					<div className="absolute inset-4 bg-background/80 backdrop-blur-md border border-border/20 rounded-lg p-6">
						<h3 className="text-xl font-bold mb-2">Glass Morphism Effect</h3>
						<p className="text-muted-foreground">
							This card demonstrates glass morphism effect that works well in
							both light and dark themes. The background adapts to the current
							theme while maintaining the translucent effect.
						</p>
						<div className="mt-4 flex gap-2">
							<Button size="sm">Get Started</Button>
							<Button size="sm" variant="outline">
								Learn More
							</Button>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center py-8 border-t border-border">
					<p className="text-muted-foreground">
						This demo showcases the comprehensive dark mode implementation for
						the Lex Protector Portal. All components automatically adapt to the
						selected theme.
					</p>
				</div>
			</div>
		</div>
	);
}

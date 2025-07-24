import { cn } from "@/lib/utils";

/**
 * Theme utility functions and classes for consistent dark mode styling
 */

// Common theme-aware color classes
export const themeClasses = {
	// Backgrounds
	background: {
		primary: "bg-background",
		secondary: "bg-secondary",
		muted: "bg-muted",
		card: "bg-card",
		popover: "bg-popover",
		accent: "bg-accent",
	},

	// Text colors
	text: {
		primary: "text-foreground",
		secondary: "text-muted-foreground",
		accent: "text-accent-foreground",
		card: "text-card-foreground",
		destructive: "text-destructive",
		success: "text-success",
	},

	// Borders
	border: {
		default: "border-border",
		input: "border-input",
		ring: "ring-ring",
		muted: "border-muted",
	},

	// Interactive states
	hover: {
		background: "hover:bg-accent/10 dark:hover:bg-accent/20",
		text: "hover:text-accent-foreground",
		border: "hover:border-accent",
	},

	// Focus states
	focus: {
		ring: "focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
		outline:
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
	},

	// Transitions
	transition: {
		colors: "transition-colors duration-200",
		all: "transition-all duration-200",
		smooth: "transition-all duration-300 ease-in-out",
	},
};

// Status-specific color combinations
export const statusClasses = {
	success: {
		background: "bg-success/10 dark:bg-success/20",
		text: "text-success",
		border: "border-success/20",
	},
	error: {
		background: "bg-destructive/10 dark:bg-destructive/20",
		text: "text-destructive",
		border: "border-destructive/20",
	},
	warning: {
		background: "bg-yellow-100 dark:bg-yellow-900/20",
		text: "text-yellow-800 dark:text-yellow-300",
		border: "border-yellow-200 dark:border-yellow-800",
	},
	info: {
		background: "bg-blue-100 dark:bg-blue-900/20",
		text: "text-blue-800 dark:text-blue-300",
		border: "border-blue-200 dark:border-blue-800",
	},
};

// Common component combinations
export const componentClasses = {
	card: cn(
		themeClasses.background.card,
		themeClasses.text.primary,
		themeClasses.border.default,
		"border rounded-lg shadow-sm",
		themeClasses.transition.colors
	),

	button: {
		primary: cn(
			"bg-primary text-primary-foreground",
			"hover:bg-primary/90",
			themeClasses.transition.colors,
			themeClasses.focus.ring
		),
		secondary: cn(
			themeClasses.background.secondary,
			"text-secondary-foreground",
			"hover:bg-secondary/80",
			themeClasses.transition.colors,
			themeClasses.focus.ring
		),
		ghost: cn(
			"hover:bg-accent hover:text-accent-foreground",
			themeClasses.transition.colors,
			themeClasses.focus.ring
		),
	},

	input: cn(
		"bg-background border border-input",
		"placeholder:text-muted-foreground",
		"focus:border-ring focus:ring-1 focus:ring-ring",
		themeClasses.transition.colors
	),

	nav: {
		link: cn(
			themeClasses.text.secondary,
			"hover:text-primary hover:bg-accent/10 dark:hover:bg-accent/20",
			themeClasses.transition.smooth,
			"rounded-md px-3 py-2"
		),
		active: cn("text-primary bg-accent/20 dark:bg-accent/30", "font-medium"),
	},

	modal: {
		overlay: "bg-black/50 dark:bg-black/70",
		content: cn(
			themeClasses.background.popover,
			themeClasses.text.primary,
			themeClasses.border.default,
			"border shadow-lg rounded-lg"
		),
	},
};

// Gradient classes for dark mode
export const gradientClasses = {
	primary: "bg-gradient-to-r from-primary to-primary/80",
	secondary: "bg-gradient-to-r from-secondary to-secondary/80",
	accent: "bg-gradient-to-r from-accent to-accent/80",
	rainbow: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
	sunset: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500",
	ocean: "bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400",
	night: "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700",
	dawn: "bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 dark:from-slate-900 dark:via-slate-700 dark:to-slate-600",
};

// Animation classes
export const animationClasses = {
	fadeIn: "animate-in fade-in duration-200",
	fadeOut: "animate-out fade-out duration-200",
	slideIn: "animate-in slide-in-from-bottom-4 duration-300",
	slideOut: "animate-out slide-out-to-bottom-4 duration-300",
	scaleIn: "animate-in zoom-in-95 duration-200",
	scaleOut: "animate-out zoom-out-95 duration-200",
};

// Helper function to create theme-aware styles
export function createThemeAwareClass(lightClass: string, darkClass: string) {
	return `${lightClass} dark:${darkClass}`;
}

// Helper function to combine theme classes
export function combineThemeClasses(...classes: (string | undefined)[]) {
	return cn(...classes.filter(Boolean));
}

// Glass morphism effect for modern UI
export const glassMorphismClasses = {
	light: "bg-white/80 backdrop-blur-md border border-white/20",
	dark: "bg-black/40 backdrop-blur-md border border-white/10",
	adaptive: "bg-background/80 backdrop-blur-md border border-border/20",
};

// Shadow classes that work well in both themes
export const shadowClasses = {
	sm: "shadow-sm dark:shadow-black/25",
	md: "shadow-md dark:shadow-black/25",
	lg: "shadow-lg dark:shadow-black/25",
	xl: "shadow-xl dark:shadow-black/25",
	glow: "shadow-lg shadow-primary/25 dark:shadow-primary/40",
};

const themeUtils = {
	themeClasses,
	statusClasses,
	componentClasses,
	gradientClasses,
	animationClasses,
	glassMorphismClasses,
	shadowClasses,
	createThemeAwareClass,
	combineThemeClasses,
};

export default themeUtils;

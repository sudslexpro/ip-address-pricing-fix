/**
 * Calendly Performance Monitor
 *
 * Utility to track and optimize Calendly loading performance
 */

interface PerformanceMetrics {
	scriptLoadStart?: number;
	scriptLoadEnd?: number;
	widgetInitStart?: number;
	widgetInitEnd?: number;
	totalLoadTime?: number;
}

class CalendlyPerformanceMonitor {
	private metrics: PerformanceMetrics = {};
	private static instance: CalendlyPerformanceMonitor;

	static getInstance(): CalendlyPerformanceMonitor {
		if (!CalendlyPerformanceMonitor.instance) {
			CalendlyPerformanceMonitor.instance = new CalendlyPerformanceMonitor();
		}
		return CalendlyPerformanceMonitor.instance;
	}

	markScriptLoadStart(): void {
		this.metrics.scriptLoadStart = performance.now();
	}

	markScriptLoadEnd(): void {
		this.metrics.scriptLoadEnd = performance.now();
		if (this.metrics.scriptLoadStart) {
			console.log(
				`Calendly script loaded in ${(
					this.metrics.scriptLoadEnd - this.metrics.scriptLoadStart
				).toFixed(2)}ms`
			);
		}
	}

	markWidgetInitStart(): void {
		this.metrics.widgetInitStart = performance.now();
	}

	markWidgetInitEnd(): void {
		this.metrics.widgetInitEnd = performance.now();
		if (this.metrics.widgetInitStart) {
			console.log(
				`Calendly widget initialized in ${(
					this.metrics.widgetInitEnd - this.metrics.widgetInitStart
				).toFixed(2)}ms`
			);
		}
		this.calculateTotalLoadTime();
	}

	private calculateTotalLoadTime(): void {
		if (this.metrics.scriptLoadStart && this.metrics.widgetInitEnd) {
			this.metrics.totalLoadTime =
				this.metrics.widgetInitEnd - this.metrics.scriptLoadStart;
			console.log(
				`Total Calendly load time: ${this.metrics.totalLoadTime.toFixed(2)}ms`
			);

			// Send analytics if needed
			this.sendAnalytics();
		}
	}

	private sendAnalytics(): void {
		// Implement analytics tracking here if needed
		// Example: Google Analytics, PostHog, etc.
		if (typeof window !== "undefined" && (window as any).gtag) {
			(window as any).gtag("event", "calendly_load_time", {
				event_category: "Performance",
				event_label: "Calendly Widget",
				value: Math.round(this.metrics.totalLoadTime || 0),
			});
		}
	}

	getMetrics(): PerformanceMetrics {
		return { ...this.metrics };
	}

	reset(): void {
		this.metrics = {};
	}
}

export const performanceMonitor = CalendlyPerformanceMonitor.getInstance();

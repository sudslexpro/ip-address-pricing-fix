"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import QuickAccessMenu from "@/components/cta/QuickAccessMenu";
import { CalendlyPreloader } from "@/components/scheduling";
import { CalendlyModalProvider } from "@/components/providers/CalendlyModalProvider";

interface LayoutClientProps {
	children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
	const pathname = usePathname();
	const isDashboardRoute = pathname?.startsWith("/dashboard");
	const isDevRoute = pathname === "/dev";

	return (
		<CalendlyModalProvider>
			{/* Show header on all routes except dashboard and dev (dev has its own header) */}
			{!isDashboardRoute && !isDevRoute && <Header isDevRoute={isDevRoute} />}

			{/* Only show floating elements if not on dashboard or dev route */}
			{!isDashboardRoute && !isDevRoute && (
				<>
					<FloatingCTA />
					<QuickAccessMenu />
				</>
			)}

			{/* Preload Calendly for better performance */}
			<CalendlyPreloader />

			{/* Main content with conditional padding */}
			<div className={isDashboardRoute || isDevRoute ? "" : "pt-16"}>
				{children}
			</div>

			{/* Only show footer if not on dashboard or dev route */}
			{!isDashboardRoute && !isDevRoute && <Footer />}
		</CalendlyModalProvider>
	);
}

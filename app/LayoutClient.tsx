"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import QuickAccessMenu from "@/components/cta/QuickAccessMenu";

interface LayoutClientProps {
	children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
	const pathname = usePathname();
	const isDashboardRoute = pathname?.startsWith("/dashboard");

	return (
		<>
			{/* Only show header if not on dashboard route */}
			{!isDashboardRoute && <Header />}

			{/* Only show floating elements if not on dashboard route */}
			{!isDashboardRoute && (
				<>
					<FloatingCTA />
					<QuickAccessMenu />
				</>
			)}

			{/* Main content with conditional padding */}
			<div className={isDashboardRoute ? "" : "pt-16"}>{children}</div>

			{/* Only show footer if not on dashboard route */}
			{!isDashboardRoute && <Footer />}
		</>
	);
}

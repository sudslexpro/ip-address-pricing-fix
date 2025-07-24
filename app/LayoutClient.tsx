"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import QuickAccessMenu from "@/components/cta/QuickAccessMenu";
import { ModalProvider, useModalContext } from "@/components/ui/modal";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

interface LayoutClientProps {
	children: React.ReactNode;
}

function LayoutContent({ children }: LayoutClientProps) {
	const pathname = usePathname();
	const { isAnyModalOpen } = useModalContext();
	const isDashboardRoute = pathname?.startsWith("/dashboard");
	const isAdminRoute = pathname === "/admin";

	// Hide floating elements when modals are open or on specific routes
	const shouldShowFloatingElements =
		!isDashboardRoute && !isAdminRoute && !isAnyModalOpen;

	return (
		<>
			{/* Show header on all routes except dashboard and admin (admin has its own header) */}
			{!isDashboardRoute && !isAdminRoute && (
				<Header isAdminRoute={isAdminRoute} />
			)}

			{/* Only show floating elements if not on dashboard, admin route, or when modal is open */}
			{shouldShowFloatingElements && (
				<>
					<FloatingCTA />
					<QuickAccessMenu />
				</>
			)}

			{/* Main content with conditional padding */}
			<div className={isDashboardRoute || isAdminRoute ? "" : "pt-16"}>
				{children}
			</div>

			{/* Only show footer if not on dashboard or admin route */}
			{!isDashboardRoute && !isAdminRoute && <Footer />}
		</>
	);
}

export default function LayoutClient({ children }: LayoutClientProps) {
	return (
		<ThemeProvider>
			<ModalProvider>
				<LayoutContent>{children}</LayoutContent>
				<Toaster />
			</ModalProvider>
		</ThemeProvider>
	);
}

"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import QuickAccessMenu from "@/components/cta/QuickAccessMenu";
import { ModalProvider, useModalContext } from "@/components/ui/modal";

interface LayoutClientProps {
	children: React.ReactNode;
}

function LayoutContent({ children }: LayoutClientProps) {
	const pathname = usePathname();
	const { isAnyModalOpen } = useModalContext();
	const isDashboardRoute = pathname?.startsWith("/dashboard");
	const isDevRoute = pathname === "/dev";

	// Hide floating elements when modals are open or on specific routes
	const shouldShowFloatingElements =
		!isDashboardRoute && !isDevRoute && !isAnyModalOpen;

	return (
		<>
			{/* Show header on all routes except dashboard and dev (dev has its own header) */}
			{!isDashboardRoute && !isDevRoute && <Header isDevRoute={isDevRoute} />}

			{/* Only show floating elements if not on dashboard, dev route, or when modal is open */}
			{shouldShowFloatingElements && (
				<>
					<FloatingCTA />
					<QuickAccessMenu />
				</>
			)}

			{/* Main content with conditional padding */}
			<div className={isDashboardRoute || isDevRoute ? "" : "pt-16"}>
				{children}
			</div>

			{/* Only show footer if not on dashboard or dev route */}
			{!isDashboardRoute && !isDevRoute && <Footer />}
		</>
	);
}

export default function LayoutClient({ children }: LayoutClientProps) {
	return (
		<ModalProvider>
			<LayoutContent>{children}</LayoutContent>
		</ModalProvider>
	);
}

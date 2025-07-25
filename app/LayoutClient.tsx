"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
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

	// Load Bitrix24 script
	useEffect(() => {
		if (shouldShowFloatingElements) {
			const script = document.createElement('script');
			script.async = true;
			script.src = `https://cdn.bitrix24.com/b3999627/crm/site_button/loader_9_dsfmdv.js?${Date.now()/60000|0}`;
			
			const firstScript = document.getElementsByTagName('script')[0];
			if (firstScript && firstScript.parentNode) {
				firstScript.parentNode.insertBefore(script, firstScript);
			}
		}
	}, [shouldShowFloatingElements]);

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

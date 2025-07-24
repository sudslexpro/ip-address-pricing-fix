import type { Metadata } from "next";
import DashboardLayoutClient from "@/components/pages-ui/dashboard/DashboardLayoutClient";

export const metadata: Metadata = {
	title: "Dashboard - Lex Protector Portal",
	description:
		"Lex Protector Dashboard - Manage your account and access administrative features",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-2 sm:p-4">
			<div className="h-full bg-background rounded-lg shadow-lg dark:shadow-black/25 border border-border overflow-hidden">
				<DashboardLayoutClient>{children}</DashboardLayoutClient>
			</div>
		</div>
	);
}

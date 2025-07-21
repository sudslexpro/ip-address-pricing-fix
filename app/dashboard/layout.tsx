import type { Metadata } from "next";

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
	return <div className="min-h-screen">{children}</div>;
}

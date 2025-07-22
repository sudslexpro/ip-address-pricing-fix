import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DashboardRoleLayoutClient from "@/components/pages-ui/dashboard/DashboardRoleLayoutClient";

export const metadata: Metadata = {
	title: "Dashboard - Lex Protector Portal",
	description:
		"Lex Protector Dashboard - Manage your account and access administrative features",
};

const validRoles = ["user", "admin", "super-admin"];

export default async function DashboardRoleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Validate the role parameter
	if (!validRoles.includes(role)) {
		notFound();
	}

	return (
		<DashboardRoleLayoutClient role={role}>
			{children}
		</DashboardRoleLayoutClient>
	);
}

export function generateStaticParams() {
	return [{ role: "user" }, { role: "admin" }, { role: "super-admin" }];
}

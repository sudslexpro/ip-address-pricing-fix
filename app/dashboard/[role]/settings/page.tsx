import UserSettingsPage from "@/components/pages-ui/dashboard/user/UserSettingsPage";
import AdminSettingsPage from "@/components/pages-ui/dashboard/admin/AdminSettingsPage";
import SuperAdminSettingsPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminSettingsPage";
import { notFound } from "next/navigation";

export default async function Settings({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	switch (role) {
		case "user":
			return <UserSettingsPage />;
		case "admin":
			return <AdminSettingsPage />;
		case "super-admin":
			return <SuperAdminSettingsPage />;
		default:
			notFound();
	}
}

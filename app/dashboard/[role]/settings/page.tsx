import UserSettingsPage from "@/components/pages-ui/dashboard/user/UserSettingsPage";
import AdminSettingsPage from "@/components/pages-ui/dashboard/admin/AdminSettingsPage";
import SuperAdminSettingsPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminSettingsPage";
import { notFound } from "next/navigation";

interface SettingsPageProps {
	params: {
		role: string;
	};
}

export default function Settings({ params }: SettingsPageProps) {
	const { role } = params;

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

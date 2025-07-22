import AdminUserManagementPage from "@/components/pages-ui/dashboard/admin/AdminUserManagementPage";
import { notFound } from "next/navigation";

export default async function UserManagement({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Only admin and super-admin have user management
	switch (role) {
		case "admin":
		case "super-admin":
			return <AdminUserManagementPage />;
		default:
			notFound();
	}
}

import AdminUserManagementPage from "@/components/pages-ui/dashboard/admin/AdminUserManagementPage";
import { notFound } from "next/navigation";

interface UserManagementPageProps {
	params: {
		role: string;
	};
}

export default function UserManagement({ params }: UserManagementPageProps) {
	const { role } = params;

	// Only admin and super-admin have user management
	switch (role) {
		case "admin":
		case "super-admin":
			return <AdminUserManagementPage />;
		default:
			notFound();
	}
}

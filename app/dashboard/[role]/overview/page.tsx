import UserOverviewPage from "@/components/pages-ui/dashboard/user/UserOverviewPage";
import AdminOverviewPage from "@/components/pages-ui/dashboard/admin/AdminOverviewPage";
import SuperAdminOverviewPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminOverviewPage";
import { notFound } from "next/navigation";

interface OverviewPageProps {
	params: {
		role: string;
	};
}

export default function Overview({ params }: OverviewPageProps) {
	const { role } = params;

	switch (role) {
		case "user":
			return <UserOverviewPage />;
		case "admin":
			return <AdminOverviewPage />;
		case "super-admin":
			return <SuperAdminOverviewPage />;
		default:
			notFound();
	}
}

import UserOverviewPage from "@/components/pages-ui/dashboard/user/UserOverviewPage";
import AdminOverviewPage from "@/components/pages-ui/dashboard/admin/AdminOverviewPage";
import SuperAdminOverviewPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminOverviewPage";
import { notFound } from "next/navigation";

export default async function Overview({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

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

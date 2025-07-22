import SuperAdminSystemPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminSystemPage";
import { notFound } from "next/navigation";

export default async function System({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Only super-admin has system management
	if (role !== "super-admin") {
		notFound();
	}

	return <SuperAdminSystemPage />;
}

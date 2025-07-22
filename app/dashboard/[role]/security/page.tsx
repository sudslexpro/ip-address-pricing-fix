import SuperAdminSecurityPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminSecurityPage";
import { notFound } from "next/navigation";

export default async function Security({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Only super-admin has security management
	if (role !== "super-admin") {
		notFound();
	}

	return <SuperAdminSecurityPage />;
}

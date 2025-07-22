import SuperAdminMonitoringPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminMonitoringPage";
import { notFound } from "next/navigation";

export default async function Monitoring({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Only super-admin has monitoring access
	if (role !== "super-admin") {
		notFound();
	}

	return <SuperAdminMonitoringPage />;
}

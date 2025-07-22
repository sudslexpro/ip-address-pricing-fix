import SuperAdminMonitoringPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminMonitoringPage";
import { notFound } from "next/navigation";

interface MonitoringPageProps {
	params: {
		role: string;
	};
}

export default function Monitoring({ params }: MonitoringPageProps) {
	const { role } = params;

	// Only super-admin has monitoring access
	if (role !== "super-admin") {
		notFound();
	}

	return <SuperAdminMonitoringPage />;
}

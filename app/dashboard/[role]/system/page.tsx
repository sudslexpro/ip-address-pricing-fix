import SuperAdminSystemPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminSystemPage";
import { notFound } from "next/navigation";

interface SystemPageProps {
	params: {
		role: string;
	};
}

export default function System({ params }: SystemPageProps) {
	const { role } = params;

	// Only super-admin has system management
	if (role !== "super-admin") {
		notFound();
	}

	return <SuperAdminSystemPage />;
}

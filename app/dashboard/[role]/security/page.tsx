import SuperAdminSecurityPage from "@/components/pages-ui/dashboard/super-admin/SuperAdminSecurityPage";
import { notFound } from "next/navigation";

interface SecurityPageProps {
	params: {
		role: string;
	};
}

export default function Security({ params }: SecurityPageProps) {
	const { role } = params;

	// Only super-admin has security management
	if (role !== "super-admin") {
		notFound();
	}

	return <SuperAdminSecurityPage />;
}

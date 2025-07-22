import { redirect } from "next/navigation";

interface DashboardRolePageProps {
	params: {
		role: string;
	};
}

export default function DashboardRolePage({ params }: DashboardRolePageProps) {
	const { role } = params;

	// Redirect to overview for the specific role
	redirect(`/dashboard/${role}/overview`);
}

export function generateStaticParams() {
	return [{ role: "user" }, { role: "admin" }, { role: "super-admin" }];
}

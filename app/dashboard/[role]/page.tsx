import { redirect } from "next/navigation";

export default async function DashboardRolePage({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Redirect to overview for the specific role
	redirect(`/dashboard/${role}/overview`);
}

export function generateStaticParams() {
	return [{ role: "user" }, { role: "admin" }, { role: "super-admin" }];
}

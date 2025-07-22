import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.role) {
		redirect("/auth/signin");
	}

	// Redirect to role-specific dashboard
	const role = session.user.role.toLowerCase().replace("_", "-");
	redirect(`/dashboard/${role}/overview`);
}

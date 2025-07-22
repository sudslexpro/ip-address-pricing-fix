import UserQuotesPage from "@/components/pages-ui/dashboard/user/UserQuotesPage";
import { notFound } from "next/navigation";

export default async function Quotes({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Only user role has quotes functionality in this implementation
	switch (role) {
		case "user":
		case "admin":
		case "super-admin":
			return <UserQuotesPage />;
		default:
			notFound();
	}
}

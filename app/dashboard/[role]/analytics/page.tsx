import AdminAnalyticsPage from "@/components/pages-ui/dashboard/admin/AdminAnalyticsPage";
import { notFound } from "next/navigation";

export default async function Analytics({
	params,
}: {
	params: Promise<{ role: string }>;
}) {
	const { role } = await params;

	// Only admin and super-admin have analytics
	switch (role) {
		case "admin":
		case "super-admin":
			return <AdminAnalyticsPage />;
		default:
			notFound();
	}
}

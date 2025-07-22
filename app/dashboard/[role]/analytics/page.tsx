import AdminAnalyticsPage from "@/components/pages-ui/dashboard/admin/AdminAnalyticsPage";
import { notFound } from "next/navigation";

interface AnalyticsPageProps {
	params: {
		role: string;
	};
}

export default function Analytics({ params }: AnalyticsPageProps) {
	const { role } = params;

	// Only admin and super-admin have analytics
	switch (role) {
		case "admin":
		case "super-admin":
			return <AdminAnalyticsPage />;
		default:
			notFound();
	}
}

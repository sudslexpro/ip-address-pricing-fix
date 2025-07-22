import UserQuotesPage from "@/components/pages-ui/dashboard/user/UserQuotesPage";
import { notFound } from "next/navigation";

interface QuotesPageProps {
	params: {
		role: string;
	};
}

export default function Quotes({ params }: QuotesPageProps) {
	const { role } = params;

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

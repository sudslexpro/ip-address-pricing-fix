import CookiePolicyPage from "@/components/pages-ui/cookie-policy/CookiePolicyPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cookie Policy | Lex Quotes",
	description:
		"Learn about how Lex Quotes uses cookies and similar technologies to enhance your experience on our trademark quotation platform.",
	keywords: [
		"cookie policy",
		"cookies",
		"web technologies",
		"privacy",
		"data collection",
	],
	openGraph: {
		title: "Cookie Policy | Lex Quotes",
		description:
			"Learn about how we use cookies and similar technologies to enhance your experience.",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function Page() {
	return <CookiePolicyPage />;
}

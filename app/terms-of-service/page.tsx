import TermsOfServicePage from "@/components/pages-ui/terms-of-service/TermsOfServicePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service | Lex Quotes",
	description:
		"Read our Terms of Service to understand the legal agreement between you and Lex Quotes for using our trademark quotation platform.",
	keywords: [
		"terms of service",
		"legal agreement",
		"platform terms",
		"user agreement",
		"trademark platform",
	],
	openGraph: {
		title: "Terms of Service | Lex Quotes",
		description:
			"Read our Terms of Service to understand the legal agreement for using our trademark quotation platform.",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function Page() {
	return <TermsOfServicePage />;
}

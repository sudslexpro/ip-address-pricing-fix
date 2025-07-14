import PrivacyPolicyPage from "@/components/pages-ui/privacy-policy/PrivacyPolicyPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy | Lex Quotes",
	description:
		"Learn how Lex Quotes collects, uses, and protects your personal information. Our comprehensive privacy policy explains our data practices and your privacy rights.",
	keywords: [
		"privacy policy",
		"data protection",
		"personal information",
		"legal platform",
		"trademark quotes",
	],
	openGraph: {
		title: "Privacy Policy | Lex Quotes",
		description:
			"Learn how Lex Quotes collects, uses, and protects your personal information.",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function Page() {
	return <PrivacyPolicyPage />;
}

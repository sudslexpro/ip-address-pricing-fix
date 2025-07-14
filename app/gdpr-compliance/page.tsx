import GDPRCompliancePage from "@/components/pages-ui/gdpr-compliance/GDPRCompliancePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "GDPR Compliance | Lex Quotes",
	description:
		"Learn about our GDPR compliance measures and your data protection rights under the General Data Protection Regulation.",
	keywords: [
		"GDPR",
		"data protection",
		"privacy rights",
		"compliance",
		"European law",
		"personal data",
	],
	openGraph: {
		title: "GDPR Compliance | Lex Quotes",
		description:
			"Learn about our GDPR compliance measures and your data protection rights.",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function Page() {
	return <GDPRCompliancePage />;
}

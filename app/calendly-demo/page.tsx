import type { Metadata } from "next";
import { InlineCalendlyDemo } from "@/components/pages-ui/calendly-demo";

export const metadata: Metadata = {
	title: "Calendly Demo - Lex Protector Portal",
	description:
		"Demo of Calendly scheduler components with inline and modal modes",
};

export default function CalendlyDemoPage() {
	return <InlineCalendlyDemo />;
}

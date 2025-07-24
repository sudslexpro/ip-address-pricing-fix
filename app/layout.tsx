import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import LayoutClient from "./LayoutClient";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Lex Protector Partner Portal",
	description: "Lex Protector Partner Portal, powered by Lex Protector",
	keywords: ["Lex Protector", "Trademark Quotes", "Trademark Protection"],
	authors: [{ name: "Aurobinda Panda" }],
	creator: "Sudeepta Sarkar <sudsarkar13@gmail.com>",
	publisher: "Lex Protector LLP",
	robots: {
		index: true,
		follow: true,
	},
	metadataBase: new URL("https://lex-protector-partner-portal.vercel.app"),
	openGraph: {
		title: "Lex Protector Partner Portal",
		description: "Lex Protector Partner Portal, powered by Lex Protector",
		url: "https://lex-protector-partner-portal.vercel.app",
		siteName: "Lex Protector Partner Portal",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} antialiased`}
				suppressHydrationWarning>
				<AuthProvider>
					<LayoutClient>{children}</LayoutClient>
				</AuthProvider>
			</body>
		</html>
	);
}

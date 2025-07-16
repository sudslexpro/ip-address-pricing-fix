import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";
import QuickAccessMenu from "@/components/cta/QuickAccessMenu";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Lex Protector Quotation Portal",
	description: "Lex Protector Quotation Portal, powered by Lex Protector",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`}>
				<AuthProvider>
					<Header />
					{/* Floating Elements */}
					<FloatingCTA />
					<QuickAccessMenu />
					<div className={`pt-16`}>{children}</div>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}

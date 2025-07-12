import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import FloatingCTA from "@/components/cta/FloatingCTA";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
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
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header />
				{/* Floating Elements */}
				{/* <FloatingCTA /> */}
				<div className={`pt-16`}>{children}</div>
				<Footer />
			</body>
		</html>
	);
}

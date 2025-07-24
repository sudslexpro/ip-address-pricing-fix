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
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`} suppressHydrationWarning>
				<AuthProvider>
					<LayoutClient>{children}</LayoutClient>
				</AuthProvider>
			</body>
		</html>
	);
}

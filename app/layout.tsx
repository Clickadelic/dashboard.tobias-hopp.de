import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { siteConfig } from "@/config";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	icons: [
		{
			url: "/favicon.svg",
			href: "/favicon.svg"
		}
	]
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="de">
				<body className={inter.className}>{children}</body>
			</html>
		</SessionProvider>
	);
}

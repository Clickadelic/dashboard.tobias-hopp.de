import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config";
import { Toaster } from "@/components/ui/sonner";

// import { auth } from "@/auth";
// import { SessionProvider } from "next-auth/react";
// Temp
import { Session } from "next-auth";
import { headers } from "next/headers";
import AuthContext from "@/components/auth/auth-context-provider";

const inter = Inter({ subsets: ["latin"] });

async function getSession(cookie: string): Promise<Session> {
	const response = await fetch(`${process.env.LOCAL_AUTH_URL}/api/auth/session`, {
		headers: {
			cookie
		}
	});

	const session = await response.json();

	return Object.keys(session).length > 0 ? session : null;
}

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
	// const session = await auth();
	const session = await getSession(headers().get("cookie") ?? "");
	return (
		<AuthContext session={session}>
			<html lang="de">
				<body className={inter.className}>
					<Toaster />
					{children}
				</body>
			</html>
		</AuthContext>
	);
}

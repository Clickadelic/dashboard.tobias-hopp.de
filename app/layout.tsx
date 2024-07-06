import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { siteConfig } from "@/config";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { AppProvider } from "@/context/app-context";

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

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = async ({ children }: RootLayoutProps) => {
	const session = await auth();
	return (
		<html lang="de">
			<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
			<link rel="manifest" href="/images/favicon/site.webmanifest" />
			<link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
			<meta name="msapplication-TileColor" content="#da532c" />
			<meta name="theme-color" content="#ffffff"></meta>
			<body className={inter.className}>
				<SessionProvider session={session}>
					<AppProvider>
						<Toaster />
						{children}
					</AppProvider>
				</SessionProvider>
			</body>
		</html>
	);
};

export default RootLayout;

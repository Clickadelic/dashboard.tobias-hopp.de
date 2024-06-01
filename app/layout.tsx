import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { siteConfig } from "@/config";
import { Toaster } from "@/components/ui/sonner";

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
	session: any;
}

const RootLayout = async ({ children, session }: RootLayoutProps) => {
	return (
		<html lang="de">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<Toaster />
					{children}
				</SessionProvider>
			</body>
		</html>
	);
};

export default RootLayout;

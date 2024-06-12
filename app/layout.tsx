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

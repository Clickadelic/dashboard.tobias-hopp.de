import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
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

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="de">
				<body className={inter.className}>
					<Toaster />
					{children}
				</body>
			</html>
		</SessionProvider>
	);
};

export default RootLayout;

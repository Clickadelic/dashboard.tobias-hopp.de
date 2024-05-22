"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";

const Navbar = () => {
	const pathname = usePathname();

	return (
		<header className="flex justify-between p-2 bg-white mb-4">
			<h1 className="text-2xl">Logo</h1>
			<nav className="space-x-2">
				<span className="space-x-3">
					<Button asChild variant={pathname === "/server" ? "default" : "outline"}>
						<Link href="/server" className="p-2">
							Server
						</Link>
					</Button>
					<Button asChild variant={pathname === "/client" ? "default" : "outline"}>
						<Link href="/client" className="p-2">
							Client
						</Link>
					</Button>
					<Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
						<Link href="/admin" className="p-2">
							Admin
						</Link>
					</Button>
					<Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
						<Link href="/settings" className="p-2">
							Settings
						</Link>
					</Button>
				</span>
				<UserButton />
			</nav>
		</header>
	);
};

export default Navbar;

"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Navbar = () => {
	const pathname = usePathname();

	return (
		<>
			<header className="flex justify-between p-2 bg-white mb-4">
				<h1 className="text-2xl">
					<Link href={DEFAULT_LOGIN_REDIRECT} title="Startseite">
						App Name
					</Link>
				</h1>
				<nav className="flex justify-between">
					<ul className="space-x-3">
						<li>
							<Link href="/">Link</Link>
						</li>
					</ul>
					<UserButton />
				</nav>
			</header>
		</>
	);
};

export default Navbar;

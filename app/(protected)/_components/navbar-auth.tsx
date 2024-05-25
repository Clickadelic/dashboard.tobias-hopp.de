"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const NavbarAuth = () => {
	const pathname = usePathname();

	return (
		<>
			<header className="flex justify-between p-2 bg-white mb-4">
				<h1 className="text-2xl mt-1">
					<Link href={DEFAULT_LOGIN_REDIRECT} title="Startseite">
						App Name
					</Link>
				</h1>
				<nav className="flex justify-between">
					<ul className="flex justify-between space-x-3 mr-3 mt-2">
						<li>
							<Link href="/admin/users">Users</Link>
						</li>
						<li>
							<Link href="/server">Server</Link>
						</li>
						<li>
							<Link href="/client">Client</Link>
						</li>
						<li>
							<Link href="/admin">Admin</Link>
						</li>
						<li>
							<Link href="/settings">Settings</Link>
						</li>
					</ul>
					<UserButton />
				</nav>
			</header>
		</>
	);
};

export default NavbarAuth;

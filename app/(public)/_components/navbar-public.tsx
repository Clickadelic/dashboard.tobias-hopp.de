"use client";
import Link from "next/link";
import Logo from "@/components/layout/logo";

const NavbarPublic = () => {
	return (
		<>
			<header className="flex justify-between p-2 bg-white mb-4">
				<Logo />
				<nav className="flex justify-between">
					<ul className="flex justify-between space-x-3 mr-3 mt-2">
						<li>
							<Link href="/about">About</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default NavbarPublic;

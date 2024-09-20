"use client";
import Link from "next/link";
import Logo from "@/components/layout/logo";

const NavbarPublic = () => {
	return (
		<>
			<header className="p-2 bg-white mb-4">
				<div className="container-md m-auto flex justify-between">
					<Logo />
					<nav className="flex justify-between">
						<ul className="flex justify-between space-x-3 mr-3 mt-2">
							<li>
								<Link href="/auth/login">Login</Link>
							</li>
							<li>
								<Link href="/auth/register">Register</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default NavbarPublic;

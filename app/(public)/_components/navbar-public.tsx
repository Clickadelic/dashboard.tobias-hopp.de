"use client"
import Link from "next/link"

const NavbarPublic = () => {
	return (
		<>
			<header className="flex justify-between p-2 bg-white mb-4">
				<h1 className="text-2xl">
					<Link href={process.env.NEXT_PUBLIC_APP_URL as string} title="Startseite">
						App Name
					</Link>
				</h1>
				<nav className="flex justify-between">
					<ul className="flex justify-between space-x-3 mr-3 mt-2">
						<li>
							<Link href="/about">About</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}

export default NavbarPublic

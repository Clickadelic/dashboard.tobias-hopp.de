"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";

import { clsx } from "clsx";

import Image from "next/image";

const Navbar = () => {
	const pathname = usePathname();

	return (
		<>
			<aside className="App-sidebar hidden fixed md:block top-0 left-0 w-64 min-h-screen border-r bg-white" id="main-sidebar">
				<div className="App-sidebar-logo hidden md:flex justify-center px-2 py-3">
					<h1>
						<a href="/" className="flex justify-between mt-2 text-slate-900 hover:opacity-75">
							<Image src="/favicon.svg" width="32" height="32" className="logo inline -mt-1 h-8 w-8" alt="Tailwind Dashboard" />
							<span id="tailwind-dashboard" className="ml-2">
								<span className="font-medium mr-1">Toby&apos;s</span>
								<span className="font-bold">Dashboard</span>
							</span>
						</a>
					</h1>
				</div>
				<section className="sidebar-section mt-10 mb-6">
					<ul className="ml-3 space-y-3">
						<li>
							<Button asChild variant={pathname === "/server" ? "default" : "outline"}>
								<Link href="/server" className="p-2">
									Server
								</Link>
							</Button>
						</li>
						<li>
							<Button asChild variant={pathname === "/client" ? "default" : "outline"}>
								<Link href="/client" className="p-2">
									Client
								</Link>
							</Button>
						</li>
						<li>
							<Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
								<Link href="/admin" className="p-2">
									Admin
								</Link>
							</Button>
						</li>
						<li>
							<Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
								<Link href="/settings" className="p-2">
									Settings
								</Link>
							</Button>
						</li>
					</ul>
				</section>
				<div className="fixed left-0 bottom-5 w-64 p-4 flex bg-white" id="avatar-box">
					<Image src="" className="w-8 h-8 mr-2 rounded-full border border-slate-400" alt="Placekitten" />
					<div className="text-toggle">
						<h4 className="text-base text-neutral-600">JWT User</h4>
						<span className="text-xs text-neutral-600">Administrator</span>
					</div>
				</div>
			</aside>

			<header className="App-header flex fixed top-0 md:ml-64 w-screen p-2 border-b bg-white" id="header">
				<nav className="flex justify-between w-max">
					<span className="p-0">
						<a href="/" className="border rounded w-8 h-8 p-2 md:hidden">
							<Image src="./favicon.svg" width={32} height={32} className="logo w-6 h-6 inline -mt-1" alt="Tailwind Dashboard" />
							<span className="text-base hidden">
								<span className="font-medium">Tailwind</span>
								<span>Dashboard</span>
							</span>
						</a>
						<button className="hidden md:inline hover:bg-slate-100 ml-3 mr-1 rounded p-2 pt-1" id="btn-sidebar-toggle">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-indent-right" viewBox="0 0 16 16">
								<path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
							</svg>
						</button>
						<input type="search" name="search" className="search-input-mobile md:hidden p-2 border rounded-md ml-3 mt-1" placeholder="Search" />
						<input type="search" name="search" className="search-input-desktop hidden md:inline p-2 border rounded-md ml-3 mt-1" placeholder="Search / CTRL + K" />
					</span>
					<button className="fixed right-5 md:hidden bg-slate-100 rounded p-2 mt-1" id="sidebar-toggle">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-indent-right" viewBox="0 0 16 16">
							<path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
						</svg>
					</button>
					<ul className="hidden fixed right-5 md:inline-flex md:mt-1 p-3 md:p-0 md:pl-3">
						<li>
							<div className="group cursor-pointer relative">
								<div>
									<button className="mx-1 inline-flex p-3 rounded cursor-pointer group-hover:bg-slate-200">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-windows" viewBox="0 0 16 16">
											<path d="M6.555 1.375 0 2.237v5.45h6.555zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16z" />
										</svg>
									</button>
								</div>
								<div className="absolute w-[960px] h-80 top-10 right-[-362px] z-50 invisible group-hover:visible grid grid-cols-4 rounded-md overflow-hidden bg-white shadow-md border">
									<div className="gradient bg-waves p-8 flex flex-col">
										<h2 className="text-white text-2xl font-medium mb-6">Explore your Data</h2>
										<p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quod.</p>
										<a className="text-slate-600 bg-slate-50 p-2 mt-5 rounded-md">View</a>
									</div>
									<div className="p-8">
										<span className="block font-medium mb-4">Authentication</span>
										<ul className="list-disc ml-5">
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Login
												</a>
											</li>
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Register
												</a>
											</li>
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Forgot Password
												</a>
											</li>
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Delete Account
												</a>
											</li>
										</ul>
									</div>
									<div className="p-8">
										<span className="block font-medium mb-4">Dashboard</span>
										<ul className="list-disc ml-5">
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Overview
												</a>
											</li>
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Data Sets
												</a>
											</li>
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Administration
												</a>
											</li>
										</ul>
									</div>
									<div className="p-8">
										<span className="block font-medium mb-4">Dashboard</span>
										<ul className="list-disc ml-5">
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Overview
												</a>
											</li>
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Data Sets
												</a>
											</li>
											<li>
												<a className="mb-2 block hover:text-slate-500" href="/">
													Administration
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
						<li>
							<button className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-translate" viewBox="0 0 16 16">
									<path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
									<path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
								</svg>
							</button>
						</li>
						<li>
							<button className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
									<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
								</svg>
								<span className="sr-only">Notifications</span>
							</button>
						</li>
						<li>
							<button className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
									<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
								</svg>
							</button>
						</li>
						<li>
							<button className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
									<path
										fill-rule="evenodd"
										d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"
									/>
								</svg>
							</button>
						</li>
						<li>
							<button className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
									<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
									<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
								</svg>
							</button>
						</li>
						<li>
							<UserButton />
						</li>
					</ul>
				</nav>
			</header>
			<div>
				<h2>Temp</h2>
				<div>
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
				</div>
			</div>
		</>
	);
};

export default Navbar;

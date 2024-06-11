"use client";

import { La_Belle_Aurore } from "next/font/google";

import { useAppContext } from "@/context/app-context";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import logoSrc from "@/public/favicon.svg";

import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { LogoutButton } from "@/components/auth/logout-button";
import { cn } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { MdOutlineChecklistRtl } from "react-icons/md";
import { AiOutlineWindows } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GoLink } from "react-icons/go";
import { LuUser2 } from "react-icons/lu";
import { HiChevronRight } from "react-icons/hi2";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { BsBuildings } from "react-icons/bs";
import { FullscreenButton } from "./fullscreen-button";
import { BsTextIndentRight } from "react-icons/bs";
import { BsTextIndentLeft } from "react-icons/bs";
import { GiOrganigram } from "react-icons/gi";
import { GrAppsRounded } from "react-icons/gr";

import SidebarSheet from "./sidebar-sheet";

const laBelleAurore = La_Belle_Aurore({ subsets: ["latin"], weight: ["400"] });

export const SidebarNavbar = () => {
	const { status } = useSession({ required: true });
	const user = useCurrentUser();
	const role = useCurrentRole();
	const path = usePathname();

	const { isToggled, setToggle } = useAppContext();

	return (
		<>
			<aside className={cn("App-sidebar hidden fixed md:block top-0 left-0 min-h-screen border-r bg-white", isToggled ? "w-16" : "w-64")}>
				<div className="sidebar-logo hidden md:flex justify-center px-2 py-3">
					<h1>
						<Link href={DEFAULT_LOGIN_REDIRECT} className="flex justify-between mt-2 text-slate-900 hover:opacity-75">
							<Image src={logoSrc} width={16} height={16} className="logo inline -mt-1 size-8" alt="Tailwind Dashboard" />
							{!isToggled && (
								<span className="ml-2">
									<span className={cn("md:inline-block font-medium mr-1 text-2xl", laBelleAurore.className)}>Toby&apos;s</span>
									<span className="md:inline-block font-bold">Dashboard</span>
								</span>
							)}
						</Link>
					</h1>
				</div>
				<section className="sidebar-accordion mt-[18px] mb-6">
					<Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
						<AccordionItem value="item-1">
							<span className={cn("text-xs text-neutral-400 ml-4 inline-block mt-4", isToggled && "hidden")}>Dashboard</span>
							<AccordionTrigger>
								<span className="flex justify-between">
									<IoSpeedometerOutline className="mt-1 mr-2" />
									{!isToggled && "Dashboard"}
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul className="space-y-1">
									<li>
										<Link
											href="/dashboard"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/dashboard" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
											title="Zur Übersicht"
										>
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											{!isToggled && "Dashboard"}
										</Link>
									</li>
									<li>
										<Link
											href="/reports"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/reports" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
											title="Zu den Reports"
										>
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											{!isToggled && "Reports"}
										</Link>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>
								<span className="flex justify-between">
									<BsBuildings className="mt-1 mr-2" />
									{!isToggled && "Projekte"}
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul>
									<li>
										<Link
											href="/projekte"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/projekte" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
											title="Zur Projektübersicht"
										>
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											{!isToggled && "Projektübersicht"}
										</Link>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>
								<span className="flex justify-between">
									<MdOutlineChecklistRtl className="mt-1 mr-2" />
									{!isToggled && "Todo's"}
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul>
									<li>
										<Link
											href="/todos"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/todos" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
											title="Zu den Todo's"
										>
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											{!isToggled && "ToDo-Übersicht"}
										</Link>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger>
								<span className="flex justify-between">
									<GoLink className="mt-1 mr-2" />
									{!isToggled && "Links"}
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul>
									<li>
										<Link
											href="/links"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/links" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
											title="Zur Projektübersicht"
										>
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											{!isToggled && "Link-Übersicht"}
										</Link>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						{role === UserRole.ADMIN && (
							<AccordionItem value="item-5">
								<span className={cn("text-xs text-neutral-400 ml-4 inline-block mt-4", isToggled && "hidden")}>Admin</span>
								<AccordionTrigger>
									<span className="flex justify-between">
										<PiEye className="mt-1 mr-2" />
										{!isToggled && "Admin"}
									</span>
								</AccordionTrigger>
								<AccordionContent>
									<ul>
										<li>
											<Link
												href="/admin"
												className={cn(
													"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
													path === "/admin" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
												)}
												title="Zur Übersicht"
											>
												<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
												{!isToggled && "Übersicht"}
											</Link>
										</li>
										<li>
											<Link
												href="/admin/benutzer"
												className={cn(
													"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
													path === "/admin/benutzer" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
												)}
												title="Zur Benutzerübersicht"
											>
												<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
												{!isToggled && "Benutzer"}
											</Link>
										</li>
										<li>
											<Link
												href="/admin/system"
												className={cn(
													"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
													path === "/admin/system" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
												)}
												title="Zu den Systemeinstellungen"
											>
												<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
												{!isToggled && "Systemeinstellungen"}
											</Link>
										</li>
									</ul>
								</AccordionContent>
							</AccordionItem>
						)}
					</Accordion>
				</section>
				{status === "loading" ? (
					<div className="fixed left-0 bottom-5 w-64 p-4 flex bg-white" id="avatar-box">
						<Avatar className="size-8 mt-1 mr-3">
							<Skeleton className="size-12" />
						</Avatar>
						<div className="text-toggle">
							<Skeleton className="w-[100px] h-[20px] rounded mb-1" />
							<Skeleton className="w-[60px] h-[16px] rounded" />
						</div>
					</div>
				) : (
					<>
						<div className={cn("fixed left-[-1px] bottom-5 w-64 p-4 flex bg-white mr-[1px]", isToggled ? "w-16" : "w-64")}>
							<Avatar className="size-8 mt-1 mr-3">
								<AvatarImage className="border border-slate-200" src={user?.image || ""} alt="User Avatar" />
								<AvatarFallback className="bg-slate-200 border border-slate-300">
									<FaUser className="text-slate-400" />
								</AvatarFallback>
							</Avatar>
							{!isToggled && (
								<div className="text-toggle">
									<h4 className="text-base text-neutral-600">{user?.name}</h4>
									<span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{user?.role}</span>
								</div>
							)}
						</div>
					</>
				)}
			</aside>
			<header className={cn("App-header flex fixed top-0 md:ml-64 w-screen p-2 border-b bg-white", isToggled ? "md:ml-16" : "md:ml-64")} id="header">
				<nav className="header-navflex justify-between w-max">
					<span className="h-[40px]">
						{/* TODO: Mobile Button toggle */}
						<button className="ml-3 mr-2 md:hidden">
							<Image src={logoSrc} width={32} height={32} className="logo size-8 inline -mt-1" alt="Tailwind Dashboard" />
						</button>
						<button onClick={() => setToggle(prev => !prev)} className="hidden md:inline hover:bg-slate-100 mt-1 ml-3 white rounded p-2">
							{isToggled ? <BsTextIndentLeft className="size-5" /> : <BsTextIndentRight className="size-5" />}
						</button>
						<input
							type="search"
							name="search"
							className="relative top-[-.25rem] md:inline p-2 text-sm w-64 focus:border-mantis-primary focus:outline-none focus-within:border-mantis-primary border-2 rounded-sm ml-3"
							placeholder="Suche / STRG + K"
						/>
					</span>
					<button className="fixed right-5 md:hidden bg-slate-100 rounded p-2 mt-1">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-text-indent-right" viewBox="0 0 16 16">
							<path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
						</svg>
					</button>
					<ul className="hidden fixed right-5 md:inline-flex md:mt-1 p-3 md:p-0 md:pl-3">
						<li>
							<div className="group cursor-pointer relative">
								<div>
									{/* TODO: In ShadCN Komponente umbauen */}
									<button className="mx-1 inline-flex p-3 rounded cursor-pointer group-hover:bg-slate-200">
										<AiOutlineWindows />
									</button>
								</div>
								{/* TODO: In ShadCN Komponente umbauen */}
								<div className="absolute w-[960px] h-80 top-10 right-[-220px] z-50 invisible group-hover:visible grid grid-cols-4 rounded-md overflow-hidden bg-white shadow-md border">
									<div className="gradient bg-wave-pattern p-8 flex flex-col">
										<h2 className="text-white text-2xl font-medium mb-6">Dashboard</h2>
										<p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quod.</p>
										<a className="text-slate-600 bg-slate-50 p-2 mt-5 rounded-md">View</a>
									</div>
									<div className="p-8">
										<span className="block font-medium mb-4">Empty Column</span>
										<ul className="list-disc ml-5">
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
										</ul>
									</div>
									<div className="p-8">
										<span className="block font-medium mb-4">Empty Column</span>
										<ul className="list-disc ml-5">
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
										</ul>
									</div>
									<div className="p-8">
										<span className="block font-medium mb-4">Empty Column</span>
										<ul className="list-disc ml-5">
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
											</li>
											<li>
												<Link href="#" className="mb-2 block hover:text-slate-500" target="_blank">
													Empty Slot
												</Link>
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
							<FullscreenButton />
						</li>
						<li>
							<SidebarSheet />
						</li>
						<li>
							{status === "loading" ? (
								<div className="flex justify-between w-[130px] mt-1">
									<Skeleton className="size-6 mt-1 mr-1 rounded-full" />
									<Skeleton className="w-[100px] h-6 mt-1" />
								</div>
							) : (
								<DropdownMenu>
									<DropdownMenuTrigger className="flex justify-between">
										<Avatar>
											<AvatarImage className="size-6" src={user?.image || ""} alt="User Avatar" />
											<AvatarFallback>
												<FaUser className="text-neutral-400" />
											</AvatarFallback>
										</Avatar>
										<span className="mt-2 ml-2 hover:text-slate-700">{user?.name}</span>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="mr-3">
										<DropdownMenuLabel>Mein Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Link href="/profil" title="Zum Profil">
												<LuUser2 className="size-4 inline-block mr-2 mt-[-2px]" />
												Mein Profil
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Link href="/apps" title="Zum Profil">
												<GrAppsRounded className="size-4 inline-block mr-2 mt-[-2px]" />
												Meine Apps
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Link href="/organisationen" title="Zum Profil">
												<GiOrganigram className="size-4 inline-block mr-2 mt-[-2px]" />
												Organisationen
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<LogoutButton>Logout</LogoutButton>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							)}
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

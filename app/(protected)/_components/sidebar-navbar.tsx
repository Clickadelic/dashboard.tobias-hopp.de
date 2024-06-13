"use client"

import { La_Belle_Aurore } from "next/font/google"

import { useAppContext } from "@/context/app-context"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCurrentRole } from "@/hooks/use-current-role"
import { useCurrentUser } from "@/hooks/use-current-user"
import { UserRole } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"
import logoSrc from "@/public/favicon.svg"

import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { MdOutlineChecklistRtl } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import { GoLink } from "react-icons/go"
import { HiChevronRight } from "react-icons/hi2"
import { IoSpeedometerOutline } from "react-icons/io5"
import { PiEye } from "react-icons/pi"
import { BsBuildings } from "react-icons/bs"
import { BsTextIndentRight } from "react-icons/bs"
import { BsTextIndentLeft } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

// TODO: Imports korrigieren
import { MegaMenu } from "./mega-menu"
import { InboxButton } from "./inbox-button"
import { NotificationsButton } from "./notifications-button"
import { FullscreenButton } from "./fullscreen-button"
import { SidebarSheet } from "./sidebar-sheet"
import { ProfileDropdown } from "./profile-drowndown"
import { LanguagesButton } from "./languages-button"

const laBelleAurore = La_Belle_Aurore({ subsets: ["latin"], weight: ["400"] })

export const SidebarNavbar = () => {
	const { status } = useSession({ required: true })
	const user = useCurrentUser()
	const role = useCurrentRole()
	const path = usePathname()
	const { isToggled, setToggle } = useAppContext()

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
											title="Zur Übersicht">
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
											title="Zu den Reports">
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
											title="Zur Projektübersicht">
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
											title="Zu den Todo's">
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
											title="Zur Projektübersicht">
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
												title="Zur Übersicht">
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
												title="Zur Benutzerübersicht">
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
												title="Zu den Systemeinstellungen">
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
			<header className={cn("App-header flex fixed top-0 md:ml-64 w-screen p-2 border-b bg-white", isToggled ? "md:ml-16" : "md:ml-64")}>
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
							<MegaMenu />
						</li>
						<li>
							<LanguagesButton />
						</li>
						<li>
							<NotificationsButton />
						</li>
						<li>
							<InboxButton />
						</li>
						<li>
							<FullscreenButton />
						</li>
						<li>
							<SidebarSheet />
						</li>
						<li>
							<ProfileDropdown />
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}

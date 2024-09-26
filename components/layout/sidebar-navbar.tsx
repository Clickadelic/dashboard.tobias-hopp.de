"use client"

import { La_Belle_Aurore } from "next/font/google"

import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useMediaQuery } from "@/hooks/use-media-query"

import Image from "next/image"
import Link from "next/link"
import logoSrc from "@/public/favicon.svg"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { MenuLeft } from "./menu-left"

import { FaUser } from "react-icons/fa"
import { BsTextIndentRight } from "react-icons/bs"
import { BsTextIndentLeft } from "react-icons/bs"
import { HiMenuAlt3 } from "react-icons/hi"

import { cn } from "@/lib/utils"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import { MegaMenu } from "./dropdown-menus/mega-menu"
import { LanguagesButton } from "./dropdown-menus/languages-button"
import { InboxButton } from "./dropdown-menus/inbox-button"
import { NotificationsButton } from "./dropdown-menus/notifications-button"
import { FullscreenButton } from "./dropdown-menus/fullscreen-button"
import { SidebarSheet } from "./dropdown-menus/sidebar-sheet"
import { ProfileDropdown } from "./dropdown-menus/profile-drowndown"

import { FullStackSearch } from "./full-stack-search"
import { useAppContext } from "@/context/app-context"

const laBelleAurore = La_Belle_Aurore({ subsets: ["latin"], weight: ["400"] })

export const SidebarNavbar = () => {
	const { status } = useSession({ required: true })
	const user = useCurrentUser()
	const isDesktop = useMediaQuery("(min-width: 768px)")

	const { isSidebarOpen, setSidebarOpen } = useAppContext()

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen)
	}

	return (
		<>
			<aside className={cn("App-sidebar hidden fixed md:block top-0 left-0 min-h-screen border-r bg-white", isSidebarOpen ? "w-16" : "w-64")}>
				<div className="sidebar-logo hidden md:flex justify-center px-2 py-3">
					<h1>
						<Link href={DEFAULT_LOGIN_REDIRECT} className="flex justify-between pt-2 text-slate-900 hover:opacity-75">
							<Image src={logoSrc} width={16} height={16} className="logo inline  size-8" alt="Tailwind Dashboard" />
							{!isSidebarOpen && (
								<span className="ml-2">
									<span className={cn("md:inline-block font-medium mr-1 text-2xl", laBelleAurore.className)}>Toby&apos;s</span>
									<span className="md:inline-block font-bold">Dashboard</span>
								</span>
							)}
						</Link>
					</h1>
				</div>
				<section className="sidebar-accordion mt-[18px] mb-6 overflow-y-auto">
					<MenuLeft />
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
						<div className={cn("fixed left-[-1px] bottom-5 w-64 p-4 flex bg-white mr-[1px]", isSidebarOpen ? "w-16" : "w-64")}>
							<Avatar className="size-8 mt-1 mr-3">
								<AvatarImage src={user?.profileImage || ""} alt={`${user?.name} Profilbild`} />
								<AvatarFallback className="bg-slate-200 border border-slate-300">
									<FaUser className="text-slate-400" />
								</AvatarFallback>
							</Avatar>
							{!isSidebarOpen && (
								<div className="text-toggle">
									<h4 className="text-base text-neutral-600">{user?.name}</h4>
									<span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{user?.role}</span>
								</div>
							)}
						</div>
					</>
				)}
			</aside>
			<header className={cn("App-header flex fixed top-0 md:ml-64 w-screen p-3 border-b bg-white z-50", isSidebarOpen ? "md:ml-16" : "md:ml-64")}>
				<nav className="header-nav flex justify-between w-max">
					<div className="inline-flex gap-3">
						{!isDesktop && (
							<Sheet>
								<SheetTrigger className="md:hidden">
									<Image src={logoSrc} width={32} height={32} className="logo size-8 inline-block md:mt-[-8px]" alt="Tailwind Dashboard" />
								</SheetTrigger>
								<SheetContent side="left" aria-describedby={undefined}>
									<SheetHeader>
										<SheetTitle>
											<Link href={DEFAULT_LOGIN_REDIRECT} className="flex justify-start mt-2 text-slate-900 hover:opacity-75">
												<Image src={logoSrc} width={16} height={16} className="logo inline -mt-1 size-8" alt="Tailwind Dashboard" />
												{!isSidebarOpen && (
													<span className="ml-2">
														<span className={cn("md:inline-block font-medium mr-1 text-2xl", laBelleAurore.className)}>Toby&apos;s</span>
														<span className="md:inline-block font-bold">Dashboard</span>
													</span>
												)}
											</Link>
										</SheetTitle>
										{/* BUG: Fix Warning */}
										{/* <SheetDescription>Description goes here</SheetDescription> */}
									</SheetHeader>
									<MenuLeft />
								</SheetContent>
							</Sheet>
						)}
						<button onClick={() => toggleSidebar()} className="hidden md:inline hover:bg-slate-100 white rounded p-2">
							{isSidebarOpen ? <BsTextIndentLeft className="size-5" /> : <BsTextIndentRight className="size-5" />}
						</button>
						<FullStackSearch classNames="inline-flex" />
						{!isDesktop && (
							<Sheet>
								<SheetTrigger className="ml-2 md:hidden">
									<HiMenuAlt3 />
								</SheetTrigger>
								<SheetContent side="right">
									<SheetHeader className="text-left">
										<SheetTitle>
											<h1>
												<Link href={DEFAULT_LOGIN_REDIRECT} className="flex justify-start mt-2 text-slate-900 hover:opacity-75">
													<Image src={logoSrc} width={16} height={16} className="logo inline -mt-1 size-8" alt="Tailwind Dashboard" />
													<span className="ml-2">
														<span className={cn("md:inline-block font-medium mr-1 text-2xl", laBelleAurore.className)}>Toby&apos;s</span>
														<span className="md:inline-block font-bold">Dashboard</span>
													</span>
												</Link>
											</h1>
										</SheetTitle>
										<SheetDescription>Mobile Sidebar rechts</SheetDescription>
									</SheetHeader>
								</SheetContent>
							</Sheet>
						)}
					</div>
					<ul className="hidden md:space-x-1 md:fixed md:right-5 md:mt-[-2px] md:inline-flex md:mr-1 mb-1">
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

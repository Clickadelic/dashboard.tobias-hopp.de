"use client"

import { La_Belle_Aurore } from "next/font/google"

import { useAppContext } from "@/context/app-context"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

import Image from "next/image"
import Link from "next/link"
import logoSrc from "@/public/favicon.svg"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { NavSidebarSimple } from "./sidebar-simple"

import { FaUser } from "react-icons/fa"
import { BsTextIndentRight } from "react-icons/bs"
import { BsTextIndentLeft } from "react-icons/bs"
import { HiMenuAlt3 } from "react-icons/hi"

import { cn } from "@/lib/utils"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import { MegaMenu } from "./navbar-menu/mega-menu"
import { InboxButton } from "./navbar-menu/inbox-button"
import { NotificationsButton } from "./navbar-menu/notifications-button"
import { FullscreenButton } from "./navbar-menu/fullscreen-button"
import { SidebarSheet } from "./navbar-menu/sidebar-sheet"
import { ProfileDropdown } from "./navbar-menu/profile-drowndown"
import { LanguagesButton } from "./navbar-menu/languages-button"

import { FullStackSearch } from "./full-stack-search"

const laBelleAurore = La_Belle_Aurore({ subsets: ["latin"], weight: ["400"] })

export const SidebarNavbar = () => {
	const { status } = useSession({ required: true })
	const user = useCurrentUser()
	const { isToggled, setToggle } = useAppContext()
	// const searchParams = useSearchParams()
	// const router = useRouter()

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
					<NavSidebarSimple />
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
								<AvatarImage src={user?.profileImage || ""} alt={`${user?.name} Profilbild`} />
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
			<header className={cn("App-header flex fixed top-0 md:ml-64 w-screen p-3 border-b bg-white z-50", isToggled ? "md:ml-16" : "md:ml-64")}>
				<nav className="header-nav flex justify-between w-max">
					<div className="inline-flex md:mb-.5">
						{/* TODO: useMediaQuery() */}
						<Sheet>
							<SheetTrigger className="ml-2 md:hidden">
								<Image src={logoSrc} width={32} height={32} className="logo size-8 inline-block md:mt-[-8px]" alt="Tailwind Dashboard" />
							</SheetTrigger>
							<SheetContent side="left">
								<SheetHeader>
									<SheetTitle>
										<h1>
											<Link href={DEFAULT_LOGIN_REDIRECT} className="flex justify-start mt-2 text-slate-900 hover:opacity-75">
												<Image src={logoSrc} width={16} height={16} className="logo inline -mt-1 size-8" alt="Tailwind Dashboard" />
												{!isToggled && (
													<span className="ml-2">
														<span className={cn("md:inline-block font-medium mr-1 text-2xl", laBelleAurore.className)}>Toby&apos;s</span>
														<span className="md:inline-block font-bold">Dashboard</span>
													</span>
												)}
											</Link>
										</h1>
									</SheetTitle>
									<SheetDescription>Mobile Sidebar links</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>
						<button onClick={() => setToggle(prev => !prev)} className="hidden md:inline hover:bg-slate-100 ml-2 white rounded p-2">
							{isToggled ? <BsTextIndentLeft className="size-5" /> : <BsTextIndentRight className="size-5" />}
						</button>
						<FullStackSearch classNames="inline-flex relative mx-3" />
					</div>
					{/* TODO: rechter Mobile Button, umbauen auf Media Query */}
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
					<ul className="hidden space-x-1 fixed right-5 md:inline-flex md:mr-1">
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

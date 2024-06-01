"use client";

import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import Logo from "./logo";

import { MdOutlineChecklistRtl } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { AiOutlineWindows } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { LuUser2 } from "react-icons/lu";
import { ExitIcon } from "@radix-ui/react-icons";

import { HiChevronRight } from "react-icons/hi2";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { BsArrowsFullscreen } from "react-icons/bs";
import { GoLink } from "react-icons/go";

export const SidebarNavbar = () => {
	const { status } = useSession({ required: true });
	const user = useCurrentUser();
	const role = useCurrentRole();

	return (
		<>
			<aside className="App-sidebar hidden fixed md:block top-0 left-0 w-64 min-h-screen border-r bg-white" id="main-sidebar">
				<div className="App-sidebar-logo hidden md:flex justify-center px-2 py-3">
					<Logo />
				</div>
				<section className="sidebar-section mt-[18px] mb-6">
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1" className="px-5">
							<span className="text-xs text-neutral-400 inline-block mb-2">Dashboard</span>
							<AccordionTrigger>
								<span className="flex justify-between">
									<IoSpeedometerOutline className="mt-1 mr-2" />
									Dashboard
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul className="space-y-1">
									<li>
										<Link href="/dashboard" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zur Übersicht">
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											Dashboard
										</Link>
									</li>
									<li>
										<Link href="/reports" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zu den Reports">
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											Reports
										</Link>
									</li>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2" className="px-5">
							<AccordionTrigger>
								<span className="flex justify-between">
									<BsBuildings className="mt-1 mr-2" />
									Projekte
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul className="list-disc space-y-1">
									<Link href="/projekte" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zur Projektübersicht">
										<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
										Projekt&uuml;bersicht
									</Link>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3" className="px-5">
							<AccordionTrigger>
								<span className="flex justify-between">
									<MdOutlineChecklistRtl className="mt-1 mr-2" />
									ToDo&apos;s
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul className="list-disc space-y-1">
									<Link href="/todos" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zu den Todo's">
										<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
										ToDo-&Uuml;bersicht
									</Link>
								</ul>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4" className="px-5">
							<AccordionTrigger>
								<span className="flex justify-between">
									<GoLink className="mt-1 mr-2" />
									Links
								</span>
							</AccordionTrigger>
							<AccordionContent>
								<ul className="list-disc space-y-1">
									<Link href="/links" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zur Projektübersicht">
										<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
										Link-&Uuml;bersicht
									</Link>
								</ul>
							</AccordionContent>
						</AccordionItem>
						{role === UserRole.ADMIN && (
							<AccordionItem value="item-5" className="px-5">
								<span className="text-xs text-neutral-400 ml-.5 inline-block mt-4 mb-2">Admin</span>
								<AccordionTrigger>
									<span className="flex justify-between">
										<PiEye className="mt-1 mr-2" />
										Admin
									</span>
								</AccordionTrigger>
								<AccordionContent>
									<ul className="list-disc space-y-1">
										<Link href="/admin" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zur Übersicht">
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											Admintest
										</Link>
										<Link href="/admin/users" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zur Übersicht">
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											Benutzerübersicht
										</Link>
										<Link href="/admin/system" className="block p-3 rounded-sm hover:bg-blue-600 hover:text-white" title="Zur Übersicht">
											<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
											Systemeinstellungen
										</Link>
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
						<div className="fixed left-0 bottom-5 w-64 p-4 flex bg-white" id="avatar-box">
							<Avatar className="size-8 mt-1 mr-3">
								<AvatarImage className="size-8 mt-3" src={user?.image || ""} alt="User Avatar" />
								<AvatarFallback className="bg-slate-200 border border-slate-300">
									<FaUser className="text-slate-400" />
								</AvatarFallback>
							</Avatar>
							<div className="text-toggle">
								<h4 className="text-base text-neutral-600">{user?.name}</h4>
								<span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{user?.role}</span>
							</div>
						</div>
					</>
				)}
			</aside>
			<header className="App-header flex fixed top-0 md:ml-64 w-screen p-2 border-b bg-white" id="header">
				<nav className="flex justify-between w-max">
					<span className="p-0">
						{/* TODO: Mobile Button toggle */}
						<button className="border rounded w-8 h-8 p-2 md:hidden active">
							<Image src="./favicon.svg" width={16} height={16} className="logo size-6 inline -mt-1" alt="Tailwind Dashboard" />
							<span className="text-base hidden">
								<span className="font-medium">Toby&apos;s</span>
								<span>Dashboard</span>
							</span>
						</button>
						<button className="hidden md:inline hover:bg-blue-600 ml-3 white rounded p-2 pt-1" id="btn-sidebar-toggle">
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
									{/* TODO: In ShadCN Komponente umbauen */}
									<button className="mx-1 inline-flex p-3 rounded cursor-pointer group-hover:bg-slate-200">
										<AiOutlineWindows />
									</button>
								</div>
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
							<button className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
								<BsArrowsFullscreen />
							</button>
						</li>
						<li>
							<Link href="/settings" className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded mr-2">
								<GoGear />
							</Link>
						</li>
						<li>
							{status === "loading" ? (
								<div className="flex justify-between w-[130px] mt-1">
									<Skeleton className="size-6 mt-1 mr-1 rounded-full" />
									<Skeleton className="w-[100px] h-6 mt-1" />
								</div>
							) : (
								<DropdownMenu>
									<DropdownMenuTrigger className="flex justify-between mt-1.5">
										<Avatar className="size-8">
											<AvatarImage className="size-8" src={user?.image || ""} alt="User Avatar" />
											<AvatarFallback className="bg-slate-200 border border-slate-400">
												<FaUser className="text-neutral-400" />
											</AvatarFallback>
										</Avatar>
										<span className="mt-1 ml-2">{user?.name}</span>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="mr-3">
										<DropdownMenuLabel>Mein Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<Link href="/profil" title="Zum Profil">
												<LuUser2 className="size-4 inline-block mr-2 mt-[-2px]" />
												Profil
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>Empty Slot</DropdownMenuItem>
										<DropdownMenuItem>Empty Slot</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<ExitIcon className="size-4 mr-2" />
											Log out
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

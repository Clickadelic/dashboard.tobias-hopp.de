"use client";

import { useAppContext } from "@/context/app-context";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HiChevronRight } from "react-icons/hi2";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { BsBuildings } from "react-icons/bs";
import { RiToolsFill } from "react-icons/ri";


import { cn } from "@/lib/utils";

export const SidebarAccordeon = () => {
	const { status } = useSession({ required: true });
	const user = useCurrentUser();
	const role = useCurrentRole();
	const path = usePathname();
	const { isToggled, setToggle } = useAppContext();
	return (
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
					<ul>
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
				<span className={cn("text-xs text-neutral-400 ml-4 inline-block mt-4", isToggled && "hidden")}>Management</span>
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
								href="/projekte/neues-projekt"
								className={cn(
									"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
									path === "/projekte/neues-projekt" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
								)}
								title="Projekt anlegen"
							>
								<HiChevronRight className="inline-block mr-2 mt-[-3px]" />
								{!isToggled && "neues Projekt"}
							</Link>
						</li>
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
				<span className={cn("text-xs text-neutral-400 ml-4 inline-block mt-4", isToggled && "hidden")}>Tools</span>
				<AccordionTrigger>
					<span className="flex justify-between">
						<RiToolsFill className="mt-1 mr-2" />
						{!isToggled && "Tools"}
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
								title="Zur Todo-Übersicht"
							>
								<HiChevronRight className="inline-block mr-2" />
								{!isToggled && "Todo's"}
							</Link>
						</li>
						<li>
							<Link
								href="/notizen"
								className={cn(
									"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
									path === "/notizen" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
								)}
								title="Zur Notiz-Übersicht"
							>
								<HiChevronRight className="inline-block mr-2" />
								{!isToggled && "Notizen"}
							</Link>
						</li>
						<li>
							<Link
								href="/links"
								className={cn(
									"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
									path === "/links" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
								)}
								title="Zur Link-Übersicht"
							>
								<HiChevronRight className="inline-block mr-2" />
								{!isToggled && "Links"}
							</Link>
						</li>
					</ul>
				</AccordionContent>
			</AccordionItem>
			{role === UserRole.ADMIN && (
				<AccordionItem value="item-4">
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
	);
};

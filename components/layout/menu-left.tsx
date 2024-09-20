"use client";

import { useSidebarStore } from "@/hooks/use-sidebar-store";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";

import { UserRole } from "@prisma/client";

import Link from "next/link";

import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { PiEye } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";
import { BsHouseGear } from "react-icons/bs";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipArrow } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

export const MenuLeft = () => {
	const { status } = useSession({ required: true });
	const user = useCurrentUser();
	const role = useCurrentRole();
	const path = usePathname();

	const sidebarOpen = useSidebarStore(state => state.sidebarOpen);

	return (
		<nav aria-label="Sidebar-Menü">
			<ul className={sidebarOpen ? "mt-12" : ""}>
				<li>
					<span className={cn("text-xs text-neutral-400 ml-4 inline-block my-4", sidebarOpen && "hidden")}>Dashboard</span>
				</li>
				{/* // TODO: Responsive Menu Items mit ToolTip erstellen */}
				<li>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild data-state="instant-open">
								<Link
									href="/dashboard"
									className={cn(
										"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
										path === "/dashboard" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
									)}
								>
									<IoSpeedometerOutline className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
									<span className={cn("ml-2", sidebarOpen && "hidden")}>Dashboard</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>Dashboard</p>
								<TooltipArrow className="arrow-mantis-primary" />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</li>
				<li>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild data-state="instant-open">
								<Link
									href="/projekte"
									className={cn(
										"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
										path === "/projekte" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
									)}
								>
									<BsBuildings className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
									<span className={cn("ml-2", sidebarOpen && "hidden")}>Projekte</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>Projekte</p>
								<TooltipArrow className="arrow-mantis-primary" />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</li>
				<li>
					<span className={cn("text-xs text-neutral-400 ml-4 inline-block my-4", sidebarOpen && "hidden")}>Widgets</span>
				</li>
				<li>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild data-state="instant-open">
								<Link
									href="/todos"
									className={cn(
										"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
										path === "/todos" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
									)}
								>
									<BsListCheck className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
									<span className={cn("ml-2", sidebarOpen && "hidden")}>Todos</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>Todos</p>
								<TooltipArrow className="arrow-mantis-primary" />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</li>
				<li>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild data-state="instant-open">
								<Link
									href="/notizen"
									className={cn(
										"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
										path === "/notizen" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
									)}
								>
									<CiEdit className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
									<span className={cn("ml-2", sidebarOpen && "hidden")}>Notizen</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>Notizen</p>
								<TooltipArrow className="arrow-mantis-primary" />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</li>
				<li>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild data-state="instant-open">
								<Link
									href="/links"
									className={cn(
										"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
										path === "/links" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
									)}
								>
									<GoLink className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
									<span className={cn("ml-2", sidebarOpen && "hidden")}>Links</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">
								<p>Links</p>
								<TooltipArrow className="arrow-mantis-primary" />
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</li>
				{role === UserRole.ADMIN && (
					<>
						<li>
							<span className={cn("text-xs text-neutral-400 ml-4 inline-block my-4", sidebarOpen && "hidden")}>Admin</span>
						</li>
						<li>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild data-state="instant-open">
										<Link
											href="/admin"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/admin" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
										>
											<PiEye className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
											<span className={cn("ml-2", sidebarOpen && "hidden")}>Admin</span>
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>Admin</p>
										<TooltipArrow className="arrow-mantis-primary" />
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
						<li>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild data-state="instant-open">
										<Link
											href="/admin/benutzer"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/admin/benutzer" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
										>
											<FiUsers className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
											<span className={cn("ml-2", sidebarOpen && "hidden")}>Benutzer</span>
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>Benutzer</p>
										<TooltipArrow className="arrow-mantis-primary" />
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
						<li>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild data-state="instant-open">
										<Link
											href="/admin/uploads"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/admin/uploads" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
										>
											<FiUploadCloud className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
											<span className={cn("ml-2", sidebarOpen && "hidden")}>Uploads</span>
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>Uploads</p>
										<TooltipArrow className="arrow-mantis-primary" />
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
						<li>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild data-state="instant-open">
										<Link
											href="/admin/system"
											className={cn(
												"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
												path === "/admin/system" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
											)}
										>
											<BsHouseGear className={cn("inline-block mt-[-3px]", sidebarOpen && "block mx-auto mt-[-3px]")} />
											<span className={cn("ml-2", sidebarOpen && "hidden")}>System</span>
										</Link>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>System</p>
										<TooltipArrow className="arrow-mantis-primary" />
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

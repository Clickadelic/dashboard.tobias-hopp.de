"use client";

import { useAppContext } from "@/context/app-context";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

import Link from "next/link";

import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsListCheck } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { PiEye } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { FiUploadCloud } from "react-icons/fi";
import { BsHouseGear } from "react-icons/bs";

import { cn } from "@/lib/utils";

export const MenuLeft = () => {
	const { status } = useSession({ required: true });
	const user = useCurrentUser();
	const role = useCurrentRole();
	const path = usePathname();
	const { isToggled, setToggle } = useAppContext();

	return (
		<nav aria-label="Sidebar-Menü">
			<ul className={isToggled ? "mt-12" : ""}>
				<li>
					<span className={cn("text-xs text-neutral-400 ml-4 inline-block my-4", isToggled && "hidden")}>Dashboard</span>
				</li>
				<li>
					<Link
						href="/dashboard"
						className={cn("block p-3 hover:bg-mantis-hover hover:text-mantis-primary", path === "/dashboard" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover")}
					>
						<IoSpeedometerOutline className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
						<span className={cn("ml-2", isToggled && "hidden")}>Dashboard</span>
					</Link>
				</li>
				<li>
					<Link
						href="/projekte"
						className={cn("block p-3 hover:bg-mantis-hover hover:text-mantis-primary", path === "/projekte" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover")}
					>
						<BsBuildings className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
						<span className={cn("ml-2", isToggled && "hidden")}>Projekte</span>
					</Link>
				</li>
				<li>
					<span className={cn("text-xs text-neutral-400 ml-4 inline-block my-4", isToggled && "hidden")}>Widgets</span>
				</li>
				<li>
					<Link
						href="/todos"
						className={cn("block p-3 hover:bg-mantis-hover hover:text-mantis-primary", path === "/todos" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover")}
					>
						<BsListCheck className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
						<span className={cn("ml-2", isToggled && "hidden")}>Todos</span>
					</Link>
				</li>
				<li>
					<Link
						href="/notizen"
						className={cn("block p-3 hover:bg-mantis-hover hover:text-mantis-primary", path === "/notizen" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover")}
					>
						<CiEdit className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
						<span className={cn("ml-2", isToggled && "hidden")}>Notizen</span>
					</Link>
				</li>
				<li>
					<Link
						href="/links"
						className={cn("block p-3 hover:bg-mantis-hover hover:text-mantis-primary", path === "/links" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover")}
					>
						<GoLink className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
						<span className={cn("ml-2", isToggled && "hidden")}>Links</span>
					</Link>
				</li>
				{role === UserRole.ADMIN && (
					<>
						<li>
							<span className={cn("text-xs text-neutral-400 ml-4 inline-block my-4", isToggled && "hidden")}>Admin</span>
						</li>
						<li>
							<Link
								href="/admin"
								className={cn(
									"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
									path === "/admin" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
								)}
							>
								<PiEye className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
								<span className={cn("ml-2", isToggled && "hidden")}>Admin</span>
							</Link>
						</li>
						<li>
							<Link
								href="/admin/benutzer"
								className={cn(
									"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
									path === "/admin/benutzer" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
								)}
							>
								<FiUsers className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
								<span className={cn("ml-2", isToggled && "hidden")}>Benutzer</span>
							</Link>
						</li>
						<li>
							<Link
								href="/admin/uploads"
								className={cn(
									"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
									path === "/admin/uploads" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
								)}
							>
								<FiUploadCloud className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
								<span className={cn("ml-2", isToggled && "hidden")}>Uploads</span>
							</Link>
						</li>
						<li>
							<Link
								href="/admin/system"
								className={cn(
									"block p-3 hover:bg-mantis-hover hover:text-mantis-primary",
									path === "/admin/system" && "text-mantis-primary border-r-2 border-r-mantis-primary bg-mantis-hover"
								)}
							>
								<BsHouseGear className={cn("inline-block mt-[-3px]", isToggled && "block mx-auto mt-[-3px]")} />
								<span className={cn("ml-2", isToggled && "hidden")}>System</span>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

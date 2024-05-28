"use client";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BiHomeAlt2 } from "react-icons/bi";

import { usePathname } from "next/navigation";

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const BreadcrumbNav = () => {
	// TODO: Improve Breadcrumb logic
	let path = usePathname();
	let cleanedPath = path.replace("/", "");
	let capitalizedPath = capitalizeFirstLetter(cleanedPath);
	return (
		<div className="mb-5">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href={DEFAULT_LOGIN_REDIRECT}>
							<BiHomeAlt2 />
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href={path}>{capitalizedPath}</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

export default BreadcrumbNav;

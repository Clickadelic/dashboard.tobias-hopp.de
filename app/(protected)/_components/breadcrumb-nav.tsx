"use client"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BiHomeAlt2 } from "react-icons/bi"

import { usePathname } from "next/navigation"

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

const BreadcrumbNav = () => {
	// TODO: Improve Breadcrumb logic
	let path = usePathname()
	let cleanedPath = path.replace("/", "")
	let capitalizedPath = capitalizeFirstLetter(cleanedPath)
	return (
		<Breadcrumb className="mb-2 md:mb-4">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href={DEFAULT_LOGIN_REDIRECT}>
						<BiHomeAlt2 />
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem className="cursor-default">{capitalizedPath}</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default BreadcrumbNav

"use client";

import { usePathname } from "next/navigation";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BiHomeAlt2 } from "react-icons/bi";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const BreadcrumbNav = () => {
	const paths = usePathname();
	const pathNames = paths.split("/").filter(path => path);
	return (
		<Breadcrumb className="mb-4">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href={DEFAULT_LOGIN_REDIRECT}>
						<BiHomeAlt2 />
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{pathNames.map((link, index) => {
					let href = `/${pathNames.slice(0, index + 1).join("/")}`;
					let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
					return (
						<BreadcrumbItem key={index}>
							<BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
							{pathNames.length !== index + 1 && <BreadcrumbSeparator />}
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadcrumbNav;

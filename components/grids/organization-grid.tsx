"use client";

import { useTransition, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Link from "next/link";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { OrganizationSchema } from "@/schemas";
import { Organization } from "@prisma/client";
import { getOrganizationsByUserId, deleteOrganization } from "@/actions/organization";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { FormOrganization } from "../forms/form-organization";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsFillTrash3Fill } from "react-icons/bs";

// TODO: Straighten Grid Architecture
export const OrganizationGrid = () => {
	const { status } = useSession({ required: true });
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [organizations, setOrganizations] = useState<Organization[]>([]);
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

	const fetchOrganizations = async () => {
		setIsLoading(true);
		try {
			const response = await getOrganizationsByUserId();
			setOrganizations(response);
		} catch (error) {
			toast.error("Fehler beim Laden der Organisationen");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchOrganizations();
	}, []);

	const onDelete = async (organizationId: string) => {
		const result = await deleteOrganization(organizationId);
		if (result.error) {
			toast.error(result.error);
		} else if (result.success) {
			toast.success(result.success);
			fetchOrganizations();
		}
	};
	return (
		<>
			{organizations.length > 0 && (
				<ul className="grid grid-cols-4 gap-4">
					{organizations.map(organization => (
						<li key={organization.id} className="relative p-4 border border-slate-200 rounded-lg flex flex-col">
							<h3 className="font-semibold mb-3">{organization.name}</h3>
							<p className="h-12 truncate text-ellipsis overflow-hidden">{organization.description}</p>
							<Link href={`/organisationen/${organization.id}`} title="Zur Organisation">
								Zur Organisation
							</Link>
							<div className="absolute right-3 top-3 z-10">
								<span>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
												<HiOutlineDotsHorizontal />
												<span className="sr-only">Open menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-[160px] z-50">
											<DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
												<button
													onClick={() => {
														setIsEditOpen(true);
													}}
													className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
												>
													SVG
												</button>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
												<button
													onClick={() => {
														onDelete(organization.id);
													}}
													className="w-full justify-start flex text-red-500 rounded-sm p-2 transition-all duration-75 hover:bg-neutral-100"
												>
													<BsFillTrash3Fill className="mr-2" /> <span>löschen</span>
												</button>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</>
	);
};

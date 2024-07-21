"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"

import Link from "next/link"

import { Input } from "@/components/ui/input"

import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"

import { OrganizationSchema } from "@/schemas"
import { Organization } from "@prisma/client"
import { addOrganization, getOrganizationsByUserId } from "@/actions/organization"

import { cn } from "@/lib/utils"

interface OrganisationGridProps {
	formClasses?: string
	organization?: Organization
}

export const OrganisationGrid = ({ formClasses, organization }: OrganisationGridProps = {}) => {
	const { status } = useSession({ required: true })
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [organizations, setOrganizations] = useState<Organization[]>([])
	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof OrganizationSchema>>({
		resolver: zodResolver(OrganizationSchema),
		defaultValues: { name: "", url: "", description: "" }
	})

	const fetchOrganizations = async () => {
		setIsLoading(true)
		try {
			const response = await getOrganizationsByUserId()
			setOrganizations(response)
		} catch (error) {
			toast.error("Fehler beim Laden der Organisationen.")
		} finally {
			setIsLoading(false)
		}
	}

	const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
		startTransition(async () => {
			const result = await addOrganization(values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				form.reset()
				setIsDialogOpen(false)
				fetchOrganizations()
			}
		})
	}

	useEffect(() => {
		if (status === "authenticated") {
			fetchOrganizations()
		}
	}, [status])

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-2 w-50", formClasses)}>
					<FormField
						control={form.control}
						name="name"
						disabled={isPending}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input {...field} placeholder="Titel" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="url"
						disabled={isPending}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input type="url" {...field} placeholder="Url" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						disabled={isPending}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea {...field} placeholder="Beschreibung" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button disabled={isPending} variant="primary" type="submit" className="w-full">
						<FiPlus className="inline text-white mr-2" />
						Organisation hinzufügen
					</Button>
				</form>
			</Form>
			<hr className="my-3" />
			{organizations.length > 0 && (
				<ul className="grid grid-cols-4 gap-4">
					{organizations.map(organization => (
						<li key={organization.id} className="p-4 border border-slate-200 rounded-lg flex flex-col">
							<h3 className="font-semibold mb-3">{organization.name}</h3>
							<p className="h-12 truncate text-ellipsis overflow-hidden">{organization.description}</p>

							<Link href={`/organisationen/${organization.id}`} title="Zur Organisation">
								Zur Organisation
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	)
}

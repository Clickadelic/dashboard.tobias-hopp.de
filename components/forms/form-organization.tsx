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

interface FormOrganizationProps {
	formClasses?: string
	organization?: Organization
}

export const FormOrganization = ({ formClasses, organization }: FormOrganizationProps = {}) => {
	const { status } = useSession({ required: true })
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [organizations, setOrganizations] = useState<Organization[]>([])
	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof OrganizationSchema>>({
		resolver: zodResolver(OrganizationSchema),
		defaultValues: { name: organization?.name || "", url: organization?.url || "", description: organization?.description || "" }
	})

	const onEdit = () => {
		console.log("Things..")
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onEdit)} className={cn("space-y-2 w-50", formClasses)}>
				<FormField
					control={form.control}
					name="name"
					disabled={isPending}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} placeholder="Name" />
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
	)
}

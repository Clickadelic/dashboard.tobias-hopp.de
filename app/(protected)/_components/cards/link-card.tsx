"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"

import { LinkSchema } from "@/schemas"
import { addLink } from "@/actions/link"

export const LinkCard = () => {
	const { status } = useSession({ required: true })
	const userId = useCurrentUser()?.id

	const [isPending, startTransition] = useTransition()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [links, setLinks] = useState<any[]>([])

	const fetchLinks = async () => {
		setIsLoading(true)
		try {
			const res = await fetch(`/api/links/${userId}`)
			const response = await res.json()
			setLinks(response)
		} catch (error) {
			toast.error("Fehler beim Laden der Links.")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchLinks()
		setIsLoading(false)
	}, [])

	const form = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "" }
	})

	const onSubmit = async (values: z.infer<typeof LinkSchema>) => {
		startTransition(async () => {
			const result = await addLink(values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				form.reset()
				fetchLinks()
			}
		})
	}

	return (
		<div className="bg-white rounded-xl shadow border p-2 md:p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<span>Links</span>
				<Link href="/links" className="hover:text-slate-900">
					zur Übersicht
				</Link>
			</h2>
			<h3 className="text-md font-semibold mb-4">{status === "loading" || isLoading ? <Skeleton className="mt-3 mb-5 w-8 h-4 bg-primary/10 animate-pulse" /> : links.length}</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-200 text-xs md:text-base rounded-sm">
					<FiPlus className="mt-[.125rem] md:mt-1 mr-2" />
					Link hinzufügen
				</PopoverTrigger>
				<PopoverContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
							<FormField
								control={form.control}
								name="title"
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
											<Input {...field} placeholder="Url" />
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
											<Textarea {...field} placeholder="Beschreibung..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button disabled={isPending} variant="outline" type="submit" className="w-full">
								Hinzufügen
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	)
}

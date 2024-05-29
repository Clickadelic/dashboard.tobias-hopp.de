"use client"

import * as z from "zod"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useForm } from "react-hook-form"
import { useState, useTransition, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { LinkSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FiPlus } from "react-icons/fi"

import { addLink } from "@/actions/links/add-link"

export const LinkCard = () => {
	const [isPending, startTransiton] = useTransition()

	const form = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "" }
	})

	const onSubmit = async (values: z.infer<typeof LinkSchema>) => {
		const validatedFields = LinkSchema.safeParse(values)
		startTransiton(() => {
			addLink(values).then(data => {
				if (data.error) {
					toast.error(data.error)
				}

				if (data.success) {
					toast.success(data.success)
				}
			})
			form.reset()
		})
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border px-3 py-2">
			<h2 className="text-sm border-bottom mb-3">Links</h2>
			<ul></ul>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full px-3 py-2 bg-slate-100">
					<FiPlus className="mt-1 mr-2" /> Link hinzufügen
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
											<Input {...field} placeholder="https://example.com" />
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

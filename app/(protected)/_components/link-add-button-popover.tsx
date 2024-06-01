"use client"

import * as z from "zod"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useForm } from "react-hook-form"
import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LinkSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FiPlus } from "react-icons/fi"

import { addLink } from "@/actions/links/add-link"

export const AddLinkButtonPopover = () => {
	const [isPending, startTransiton] = useTransition()

	const form = useForm<z.infer<typeof LinkSchema>>({
		resolver: zodResolver(LinkSchema),
		defaultValues: { title: "", url: "", description: "" }
	})

	/**
	 * Handles the form submission for adding a link.
	 *
	 * @param {z.infer<typeof LinkSchema>} values - The form values to be submitted.
	 * @return {Promise<void>} A promise that resolves when the submission is complete.
	 */
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
		<>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full px-3 py-2 bg-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-200 text-xs md:text-base rounded-sm mb-1">
					<FiPlus className="mt-[.125rem] md:mt-1 mr-2" /> Link hinzufügen
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
											<Textarea {...field} placeholder="Beschreibung" />
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
		</>
	)
}

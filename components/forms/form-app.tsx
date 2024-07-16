"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState, useEffect, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"

import { AppSchema } from "@/schemas"
import { addApp } from "@/actions/app"

export const AppBar = () => {
	const { status } = useSession({ required: true })
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: { title: "", url: "" }
	})

	const onAdd = async (values: z.infer<typeof AppSchema>) => {
		startTransition(async () => {
			const result = await addApp(values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				form.reset()
				setIsDialogOpen(false)
			}
		})
		setIsDialogOpen(false)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onAdd)} className="space-y-2">
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
								<Input {...field} className="mb-3" placeholder="Url" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} aria-label="App hinzufügen" type="submit" className="w-full rounded-sm">
					hinzufügen
				</Button>
			</form>
		</Form>
	)
}

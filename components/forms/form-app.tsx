"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { useAppsStore } from "@/hooks/use-apps-store"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"

import { AppSchema } from "@/schemas"
import { addApp, getAppsByUserId } from "@/actions/app"
import { FiPlus } from "react-icons/fi"

export const FormApp = () => {
	const [isPending, startTransition] = useTransition()

	const apps = useAppsStore(state => state.apps)
	const setApps = useAppsStore(state => state.setApps)
	const isAppDialogOpen = useAppsStore(state => state.isAppDialogOpen)
	const toggleAppDialog = useAppsStore(state => state.toggleAppDialog)

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
				toggleAppDialog()
				const newApps = await getAppsByUserId()
				setApps(newApps)
			}
		})
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
				<Button disabled={isPending} variant="primary" aria-label="App hinzufügen" type="submit" className="w-full rounded-sm">
					<FiPlus className="inline text-white mr-2" />
					App hinzufügen
				</Button>
			</form>
		</Form>
	)
}

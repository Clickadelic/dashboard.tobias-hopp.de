import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState, useEffect, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

import Image from "next/image"
import Link from "next/link"

import { AppSchema } from "@/schemas"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { toast } from "sonner"

import { BsBuildings } from "react-icons/bs"
import { BsListCheck } from "react-icons/bs"
import { CiEdit } from "react-icons/ci"
import { GoLink } from "react-icons/go"
import { FiPlus } from "react-icons/fi"

import { cn } from "@/lib/utils"
export const CircularMenu = () => {
	const { status } = useSession({ required: true })
	const [show, setShow] = useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof AppSchema>>({
		resolver: zodResolver(AppSchema),
		defaultValues: { title: "", url: "" }
	})

	const onAdd = async (values: z.infer<typeof AppSchema>) => {
		startTransition(async () => {
			// const result = await addApp(values)
			// if (result.error) {
			// 	toast.error(result.error)
			// } else if (result.success) {
			// 	toast.success(result.success)
			// 	form.reset()
			// 	fetchApps()
			// }
		})
		setIsDialogOpen(false)
	}

	return (
		<div className="fixed bottom-8 right-8 max-w-12">
			<div className={cn("absolute -top-48 left-1 flex justify-center space-y-2", show ? "block" : "hidden")}>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
						<BsBuildings />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>App-Link hinzufügen</DialogTitle>
							<DialogDescription>Quick-Links für Deine Startseite</DialogDescription>
						</DialogHeader>
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
								<Button disabled={isPending} type="submit" className="w-full">
									hinzufügen
								</Button>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
				<button className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
					<BsListCheck />
				</button>
				<button className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
					<CiEdit />
				</button>
				<button className="relative bg-mantis-primary hover:bg-mantis-primary/90 p-3 text-white rounded-full">
					<GoLink />
				</button>
			</div>
			<button className="bg-mantis-primary hover:bg-mantis-primary/90 text-white p-4 text-lg rounded-full" onClick={() => setShow(!show)}>
				{show ? <FiPlus className="rotate-45 transition-all" /> : <FiPlus className="transition-all" />}
			</button>
		</div>
	)
}

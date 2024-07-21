"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"

import Link from "next/link"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"

import { ProjectSchema } from "@/schemas"
import { Project } from "@prisma/client"

import { addProject, getProjectsByUserId } from "@/actions/project"
import { BsBuildings } from "react-icons/bs"

export const ProjectCard = () => {
	const { status } = useSession({ required: true })
	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [projects, setProjects] = useState<any[]>([])
	const [latestProject, setLatestProject] = useState<Project | null>(null)
	const fetchProjects = async () => {
		setIsLoading(true)
		try {
			const response = await getProjectsByUserId()
			setProjects(response)
			setLatestProject(response[0])
		} catch (error) {
			console.error("Error fetching links:", error)
			toast.error("Failed to fetch links.")
		}
		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoading(true)
		fetchProjects()
		setIsLoading(false)
	}, [])

	const form = useForm<z.infer<typeof ProjectSchema>>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: { title: "", url: "", description: "" }
	})

	const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
		const validatedFields = ProjectSchema.safeParse(values)
		startTransition(async () => {
			const result = await addProject(values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				form.reset()
				fetchProjects()
			}
		})
	}

	return (
		<div className="bg-white rounded-xl shadow-sm border p-4">
			<h2 className="flex justify-between text-xs md:text-sm mb-2">
				<Link href="/projekte" className="text-slate-900 hover:text-slate-700 hover:underline" title="Zur Projektübersicht">
					Projekte
				</Link>
				<span>neuestes Projekt</span>
			</h2>
			<h3 className="flex justify-between mb-4">
				<span className="font-bold">
					{status === "loading" || isLoading ? (
						<Skeleton className="mt-[-3px] w-8 h-4 bg-primary/10 animate-pulse" />
					) : (
						<>
							<BsBuildings className="inline-block mr-2 mt-[-3px]" />
							{projects.length}
						</>
					)}
				</span>
				<span className="text-sm font-normal mt-1">{status === "loading" || isLoading ? <Skeleton className="mt-[-3px] w-12 h-4 bg-primary/10 animate-pulse" /> : latestProject?.title}</span>
			</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-white text-mantis-primary border border-mantis-primary hover:text-white hover:bg-mantis-primary text-sm rounded-sm">
					<FiPlus className="mt-[3px] mr-2" /> Projekt hinzufügen
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
											<Input {...field} placeholder="Projekt-Titel" />
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
											<Input {...field} placeholder="Projekt-URL" />
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
											<Textarea {...field} placeholder="Projekt-Beschreibung..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button disabled={isPending} variant="primary" size="sm" type="submit" className="w-full">
								hinzufügen
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	)
}

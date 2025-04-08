"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useProjectsStore } from "@/hooks/use-projects-store"

import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Project } from "@prisma/client"

import { getProjectsByUserId } from "@/actions/project"
import { BsBuildings } from "react-icons/bs"

export const ProjectCard = () => {
	const { status } = useSession({ required: true })
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const projects = useProjectsStore<Project[]>(state => state.projects)
	const latestProject = useProjectsStore<Project>(state => state.projects[0])
	const setProjects = useProjectsStore(state => state.setProjects)

	useEffect(() => {
		const fetchProjects = async () => {
			setIsLoading(true)
			try {
				const response = await getProjectsByUserId()
				setProjects(response)
			} catch (error) {
				console.error("Error fetching links:", error)
				toast.error("Failed to fetch links.")
			}
			setIsLoading(false)
		}
		fetchProjects()
	}, [setProjects])

	return (
		<div className="bg-white rounded-xl shadow-sm border p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<Link href="/projekte" className="text-slate-900 hover:text-slate-700 hover:underline" title="Zur Projektübersicht">
					Projekte
				</Link>
				<span>neuestes Projekt</span>
			</h2>
			<h3 className="flex justify-between">
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
				<span className="mt-1 text-sm font-normal">{status === "loading" || isLoading ? <Skeleton className="mt-[-3px] w-12 h-4 bg-primary/10 animate-pulse" /> : latestProject?.title}</span>
			</h3>
		</div>
	)
}

"use client"

import Image from "next/image"
import Link from "next/link"

import { useState, useEffect, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useAppsStore } from "@/hooks/use-apps-store"
import { useAppContext } from "@/context/app-context"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

import { toast } from "sonner"

import { HiOutlineDotsVertical } from "react-icons/hi"
import { BsTrash } from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai"
import { BsApp } from "react-icons/bs"

import { ResponsiveDialog } from "./responsive-dialog"

import { getAppsByUserId, deleteAppById, editAppById } from "@/actions/app"
import { getFavicon } from "@/lib/utils"
import { FormApp } from "./forms/form-app"

export const AppBar = () => {
	const { status } = useSession({ required: true })

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [myDialog, setMyDialog] = useState<boolean>(false)

	const apps = useAppsStore(state => state.apps)
	const setApps = useAppsStore(state => state.setApps)

	const fetchApps = async () => {
		try {
			const response = await getAppsByUserId()
			setApps(response)
		} catch (error) {
			toast.error("Fehler beim Laden der Apps.")
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchApps()
		setIsLoading(false)
	}, [])

	const onDelete = async (id: string) => {
		startTransition(async () => {
			const result = await deleteAppById(id)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				fetchApps()
			}
		})
	}

	return (
		<div className="w-full mb-8">
			<div className="grid grid-cols-6 gap-3 overflow-x-auto md:flex md:items-start md:justify-start md:space-x-3">
				{apps.length === 0 && status !== "loading" && <AppBar.Skeleton />}
				{apps.map(app => (
					<div
						key={app.id}
						className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl"
					>
						<Link href={app.url} className="w-full h-full flex flex-col items-center justify-center pt-1.5" target="_blank">
							<Image src={getFavicon(app.url, 24) || ""} alt={app.title} width={24} height={24} className="mb-2 rounded-full" />
							<span className="hidden text-xs md:inline-block text-slate-900">{app.title}</span>
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="absolute top-1 right-[2px] text-slate-500 hover:text-slate-900">
									<HiOutlineDotsVertical className="size-5" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="right" align="start">
								<DropdownMenuItem>
									<button onClick={() => setMyDialog(true)} className="flex justify-between">
										<AiOutlineEdit className="mt-1 mr-2" />
										bearbeiten
									</button>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<button onClick={() => onDelete(app.id)} className="flex justify-between text-red-500 hover:text-red-700">
										<BsTrash className="mt-1 mr-2" /> löschen
									</button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<ResponsiveDialog isOpen={myDialog} setIsOpen={setMyDialog} title="App bearbeiten" description="Bearbeite die App" icon={<BsApp />}>
							<FormApp />
						</ResponsiveDialog>
					</div>
				))}
			</div>
		</div>
	)
}

AppBar.Skeleton = function AppBarSkeleton() {
	return (
		<>
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
			<Skeleton className="size-[36px] md:size-[72px] relative flex flex-col justify-center place-content-center bg-white shadow-sm border backdrop-blur hover:bg-white/30 rounded-xl" />
		</>
	)
}

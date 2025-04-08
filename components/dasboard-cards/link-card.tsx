"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useLinksStore } from "@/hooks/use-links-store"

import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { GoLink } from "react-icons/go"

import { getLinksByUserId } from "@/actions/link"

export const LinkCard = () => {
	const { status } = useSession({ required: true })
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const links = useLinksStore(state => state.links)
	const setLinks = useLinksStore(state => state.setLinks)
	const latestLink = useLinksStore(state => state.links[0])

	useEffect(() => {
		const fetchLinks = async () => {
			setIsLoading(true)
			try {
				const response = await getLinksByUserId()
				setLinks(response)
			} catch (error) {
				toast.error("Fehler beim Laden der Links.")
			} finally {
				setIsLoading(false)
			}
		}
		fetchLinks()
	}, [setLinks])

	return (
		<div className="bg-white rounded-xl shadow-sm border p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<Link href="/links" className="hover:text-slate-700 hover:underline" title="Zur Link-Übersicht">
					Links
				</Link>
				<span>neuester Link</span>
			</h2>
			<h3 className="flex justify-between">
				<span className="font-bold">
					<GoLink className="inline-block mr-2 mt-[-3px]" />
					{links.length}
				</span>
				<span className="text-sm font-normal mt-1">
					{status === "loading" || isLoading ? (
						<Skeleton className="w-12 h-4 bg-primary/10 animate-pulse" />
					) : (
						<Link href={latestLink?.url || "#"} className="hover:text-mantis-primary max-w-[260px] md:max-w-52 inline-flex overflow-hidden text-sm truncate ellipsis" target="_blank">
							{latestLink?.url}
						</Link>
					)}
				</span>
			</h3>
		</div>
	)
}

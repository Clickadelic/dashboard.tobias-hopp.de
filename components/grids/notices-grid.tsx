"use client"

import { useState, useEffect } from "react"

import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { Notice } from "@prisma/client"
import { getNoticesByUserId } from "@/actions/notice"

export const NoticesGrid = () => {
	const { status } = useSession({ required: true })
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [notices, setNotices] = useState<Notice[]>([])

	const fetchNotices = async () => {
		setIsLoading(true)
		try {
			const response = await getNoticesByUserId()
			setNotices(response)
		} catch (error) {
			toast.error("Fehler beim Laden der Notizen")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchNotices()
		setIsLoading(false)
	}, [])

	// TODO: Skeleton Loading
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
			{notices.map(notice => {
				return (
					<Card key={notice.id} className="bg-white border text-sm p-2 note relative">
						<CardContent>{notice.noticetext}</CardContent>
					</Card>
				)
			})}
		</div>
	)
}

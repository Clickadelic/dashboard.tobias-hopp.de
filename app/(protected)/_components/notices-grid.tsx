"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

import { getNoticesByUserId } from "@/actions/notice"

export const NoticesGrid = () => {
	const { status } = useSession({ required: true })
	const userId = useCurrentUser()?.id

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [notices, setNotices] = useState<any[]>([])

	const fetchNotices = async () => {
		setIsLoading(true)
		const response = await getNoticesByUserId()
		setNotices(response)
		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoading(true)
		fetchNotices()
		setIsLoading(false)
	}, [])
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
				{notices.map(notice => {
					return <div key={notice.id}>{notice.noticetext}</div>
				})}
			</div>
		</div>
	)
}

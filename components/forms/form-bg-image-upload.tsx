"use client"

import * as z from "zod"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTransition, useEffect } from "react"

import Image from "next/image"
import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"

import { UserSchema } from "@/schemas"
import { addBackgroundImage, getUserBackground } from "@/actions/upload"
import { cn } from "@/lib/utils"

interface FormBackgroundImageUploadProps {
	classNames?: string
}

export const FormBackgroundImageUpload = ({ classNames }: FormBackgroundImageUploadProps) => {
	const user = useCurrentUser()
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const [inProgress, setInProgress] = useState<boolean>(false)
	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const fetchUserBackground = async () => {
		setIsLoading(true)
		const userBg = await getUserBackground()
		setIsLoading(false)
	}

	const handleSubmit = async (event: React.FormEvent) => {
		setInProgress(true)
		event.preventDefault()

		if (!file) return

		const formData = new FormData()
		formData.append("file", file as Blob)

		const response = await fetch(`/api/upload/background-image/${user?.id}`, {
			method: "POST",
			body: formData
		})

		const data = await response.json()
		setPreview(data.blob.url)
		setInProgress(false)
	}

	useEffect(() => {
		fetchUserBackground()
	}, [])

	return (
		<div>
			<form onSubmit={handleSubmit} className={cn("mb-3", classNames)}>
				<input id="dropzone-file" onChange={event => setFile(event.target.files?.[0] || null)} type="file" />
				<button type="submit" className="w-full bg-mantis-primary rounded-sm p-2 text-white mt-3 text-sm text-center">
					{inProgress ? "...uploading" : "Hintergrundbild hochladen"}
				</button>
			</form>
			{preview && (
				<div className="border flex items-center rounded-xl p-2 bg-slate-200">
					<Image src={preview} width={240} height={160} className="w-full rounded-lg" alt="Upload Vorschau" />
				</div>
			)}
			{user?.backgroundImage && (
				<div className="border flex items-center rounded-xl p-2 bg-slate-200">
					<button>asd</button>
					<Image src={user?.backgroundImage || ""} width={240} height={160} className="w-full rounded-xl" alt="Aktuelles Hintergrundbild" />
				</div>
			)}
		</div>
	)
}

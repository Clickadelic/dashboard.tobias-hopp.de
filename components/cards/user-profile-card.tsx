"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserSchema } from "@/schemas"
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"

import { useState, useEffect, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { settings } from "@/actions/settings"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

import Image from "next/image"

import { FaUser } from "react-icons/fa"
import { cn } from "@/lib/utils"

interface UserProfileCardProps {
	classNames?: string
}

export const UserProfileCard = ({ classNames }: UserProfileCardProps) => {
	const user = useCurrentUser()
	// const { status } = useSession({ required: true });
	const [isPending, startTransition] = useTransition()
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [links, setLinks] = useState<any[]>([]);

	// const [inProgress, setInProgress] = useState<boolean>(false);
	// const [file, setFile] = useState<File | null>(null);
	// const [preview, setPreview] = useState<string | null>(null);

	// const fetchLinks = async () => {
	// 	setIsLoading(true);
	// 	// try {
	// 	// 	const response = await getUserById();
	// 	// 	setLinks(response);
	// 	// } catch (error) {
	// 	// 	toast.error("Fehler beim Laden der Links.");
	// 	// } finally {
	// 	// 	setIsLoading(false);
	// 	// }
	// };

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	fetchLinks();
	// 	setIsLoading(false);
	// }, []);

	// const form = useForm<z.infer<typeof UserSchema>>({
	// 	resolver: zodResolver(UserSchema),
	// 	defaultValues: { title: "", url: "", description: "" }
	// });

	// const onSubmit = async (values: z.infer<typeof UserSchema>) => {
	// 	startTransition(async () => {
	// 		const result = await addLink(values);
	// 		if (result.error) {
	// 			toast.error(result.error);
	// 		} else if (result.success) {
	// 			toast.success(result.success);
	// 			form.reset();
	// 			fetchLinks();
	// 		}
	// 	});
	// };

	// const handleSubmit = async (event: React.FormEvent) => {
	// 	setInProgress(true)
	// 	event.preventDefault()

	// 	if (!file) return

	// 	const formData = new FormData()
	// 	formData.append("file", file as Blob)

	// 	const response = await fetch(`/api/upload/profile-image/${user?.id}`, {
	// 		method: "POST",
	// 		body: formData
	// 	})

	// 	const data = await response.json()
	// 	setPreview(data.blob.url)
	// 	setInProgress(false)
	// }

	const onClick = () => {
		startTransition(() => {
			settings({
				name: "New Username",
				role: "ADMIN"
			})
		})
	}

	return (
		<div className={classNames}>
			<div className="bg-white rounded-lg pb-12">
				<div className="rounded-tl rounded-tr bg-slate-200 h-24">{/* Ghost Div */}</div>
				<div className="bg-white rounded-full border border-slate-200 size-28 mx-auto -translate-y-1/2">{/* Avatar Div */}</div>
				<h1 className="text-2xl font-medium text-center">{user?.name}</h1>
				<h1 className="text-xl font-light text-center">{user?.email}</h1>
			</div>
			{/* <form onSubmit={handleSubmit} className={classNames}>
				<input id="dropzone-file" className="flex" onChange={event => setFile(event.target.files?.[0] || null)} type="file" />
				<Button type="submit" variant="default">
					{inProgress ? "...in Bearbeitung" : "Profilbild hochladen"}
				</Button>
			</form>
			{preview && <Image width={200} height={160} src={preview} alt="Preview" />} */}
			<button disabled={isPending} onClick={onClick}>
				New Username
			</button>
		</div>
	)
}

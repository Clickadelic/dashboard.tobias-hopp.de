"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"

import { Input } from "@/components/ui/input"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"

import { NoticeSchema } from "@/schemas"
import { Notice } from "@prisma/client"
import { addNotice } from "@/actions/notice"

import { cn } from "@/lib/utils"

interface FormNoticeProps {
	formClasses?: string
	notice?: Notice
}

export const FormNotice = ({ formClasses, notice }: FormNoticeProps = {}) => {
	console.log("Child notice: ", notice)
	const { status } = useSession({ required: true })
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const [isPending, startTransition] = useTransition()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const form = useForm<z.infer<typeof NoticeSchema>>({
		resolver: zodResolver(NoticeSchema),
		defaultValues: { noticetext: "" }
	})

	const onSubmit = async (values: z.infer<typeof NoticeSchema>) => {
		startTransition(async () => {
			const result = await addNotice(values)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success) {
				toast.success(result.success)
				form.reset()
				setIsDialogOpen(false)
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-2 mb-3", formClasses)}>
				<FormField
					control={form.control}
					name="noticetext"
					disabled={isPending}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea rows={6} {...field} placeholder="Notiz" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isPending} variant="primary" type="submit" className="w-full">
					<FiPlus className="inline text-white mr-2" />
					Notiz hinzufügen
				</Button>
			</form>
		</Form>
	)
}

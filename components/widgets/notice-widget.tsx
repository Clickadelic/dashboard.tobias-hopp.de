"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { NoticeSchema } from "@/schemas";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { LiaEdit } from "react-icons/lia";

import { addNotice, deleteNoticeById, getNoticesByUserId } from "@/actions/notice";
import { Notice } from "@prisma/client";

export const NoticeWidget = () => {
	const { status } = useSession({ required: true });

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [notices, setNotices] = useState<Notice[]>([]);

	const fetchNotices = async () => {
		setIsLoading(true);
		try {
			const response = await getNoticesByUserId();
			setNotices(response);
		} catch (error) {
			toast.error("Fehler beim Laden der Notizen.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchNotices();
		setIsLoading(false);
	}, []);

	const form = useForm<z.infer<typeof NoticeSchema>>({
		resolver: zodResolver(NoticeSchema),
		defaultValues: { noticetext: "" }
	});

	const onSubmit = async (values: z.infer<typeof NoticeSchema>) => {
		const validatedFields = NoticeSchema.safeParse(values);
		startTransition(async () => {
			const result = await addNotice(values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset();
				fetchNotices();
			}
		});
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="noticetext"
						disabled={isPending}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea rows={4} {...field} className="mb-3" placeholder="Notiztext..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} variant="primary" type="submit" className="w-full">
						<FiPlus className="mr-2" />
						Notiz hinzufügen
					</Button>
				</form>
			</Form>
			<hr />
			<ul className="ml-2">
				{status === "loading" ? (
					<>
						<Skeleton className="mt-3 mb-5 w-full h-4 bg-black/10 animate-pulse" />
						<Skeleton className="mt-3 mb-5 w-full h-4 bg-black/10 animate-pulse" />
						<Skeleton className="mt-3 mb-5 w-75 h-4 bg-black/10 animate-pulse" />
						<Skeleton className="mt-3 mb-5 w-50 h-4 bg-black/10 animate-pulse" />
					</>
				) : (
					notices.map(notice => (
						<li key={notice.id} className="flex justify-between mb-2 px-3 py-1 hover:bg-mantis-hover rounded-sm">
							<span>
								<p className="text-sm">{notice.noticetext}</p>
							</span>
							<span className="space-x-3 flex">
								<button>
									<LiaEdit />
								</button>
								<button>
									<GoTrash />
								</button>
							</span>
						</li>
					))
				)}
			</ul>
		</>
	);
};

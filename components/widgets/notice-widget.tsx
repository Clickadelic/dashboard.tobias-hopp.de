"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { LiaEdit } from "react-icons/lia";

import { Notice } from "@prisma/client";
import { NoticeSchema } from "@/schemas";
import { addNotice, deleteNoticeById, editNoticeById, getNoticesByUserId } from "@/actions/notice";

export const NoticeWidget = () => {
	const { status } = useSession({ required: true });
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editNoticeId, setEditNoticeId] = useState<string | null>(null);

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

	const setEditValues = (noticeId: string) => {
		const notice = notices.find(notice => notice.id === noticeId);
		if (notice) {
			form.reset({
				noticetext: notice.noticetext
			});
			setEditNoticeId(noticeId); // Set the current editing Todo ID
		}
		setIsEditing(true);
	};

	const onEdit = async (values: z.infer<typeof NoticeSchema>) => {
		if (!editNoticeId) return; // Ensure there's an ID to edit
		startTransition(async () => {
			const result = await editNoticeById(editNoticeId, values);
			if (result.error) {
				toast.error(result.error);
			} else if (result.success) {
				toast.success(result.success);
				form.reset({
					noticetext: ""
				});
				setIsEditing(false);
				setEditNoticeId(null);
				fetchNotices();
			}
		});
	};

	const onDelete = async (id: string) => {
		startTransition(async () => {
			const result = await deleteNoticeById(id);
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
				<form onSubmit={form.handleSubmit(isEditing ? onEdit : onSubmit)} className="space-y-2">
					<FormField
						control={form.control}
						name="noticetext"
						disabled={isPending}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea rows={6} {...field} placeholder="Notiztext..." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} variant="primary" type="submit" className="w-full rounded-sm">
						{isEditing ? (
							<>
								<LiaEdit className="mr-2" />
								Aktualisieren
							</>
						) : (
							<>
								<FiPlus className="mr-2" />
								Notiz hinzufügen
							</>
						)}
					</Button>
				</form>
			</Form>
			<hr className="my-3" />
			<ul>
				{notices.map(notice => (
					<li key={notice.id} className="flex justify-between mb-2 px-3 py-1 hover:bg-mantis-hover rounded-sm">
						<p>{notice.noticetext}</p>
						<span className="space-x-3 flex">
							<button onClick={() => setEditValues(notice.id)}>
								<LiaEdit />
							</button>
							<button onClick={() => onDelete(notice.id)} className="text-rose-500 hover:text-rose-600">
								<GoTrash className="size-4 mx-auto" />
							</button>
						</span>
					</li>
				))}
				{notices.length === 0 && status !== "loading" && <li className="text-md text-neutral-400 text-center mt-12">Lege Deine erste Notiz an.</li>}
			</ul>
		</>
	);
};

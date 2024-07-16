"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import Link from "next/link";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NoticeSchema } from "@/schemas";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";

import { addNotice, getNoticesByUserId, getLatestNotice } from "@/actions/notice";
import { Notice } from "@prisma/client";

export const NoticeCard = () => {
	const { status } = useSession({ required: true });

	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [notices, setNotices] = useState<Notice[]>([]);
	const [latestNotice, setLatestNotice] = useState<Notice | null>(null);
	const fetchNotices = async () => {
		setIsLoading(true);
		try {
			const response = await getNoticesByUserId();
			const latest = await getLatestNotice();
			setNotices(response);
			setLatestNotice(latest[0]);
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
		<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<Link href="/notizen" className="hover:text-slate-700 hover:underline" title="Zur Notizübersicht">
					Notizen
				</Link>
				<span>neueste Notiz</span>
			</h2>
			<h3 className="flex justify-between mb-4">
				<span className="font-bold">
					{status === "loading" || isLoading ? (
						<Skeleton className="mt-[-3px] w-8 h-4 bg-primary/10 animate-pulse" />
					) : (
						<>
							<CiEdit className="inline-block mr-2 mt-[-3px]" />
							{notices.length}
						</>
					)}
				</span>
				<span className="text-md font-normal">{status === "loading" || isLoading ? <Skeleton className="mt-3 mb-5 w-12 h-4 bg-primary/10 animate-pulse" /> : latestNotice?.noticetext}</span>
			</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-white text-mantis-primary border border-mantis-primary hover:text-white hover:bg-mantis-primary text-sm rounded-sm">
					<FiPlus className="mt-[3px] mr-2" /> Notiz hinzufügen
				</PopoverTrigger>
				<PopoverContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
							<FormField
								control={form.control}
								name="noticetext"
								disabled={isPending}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea {...field} placeholder="Notiztext..." />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button disabled={isPending} variant="primary" size="sm" type="submit" className="w-full">
								hinzufügen
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	);
};

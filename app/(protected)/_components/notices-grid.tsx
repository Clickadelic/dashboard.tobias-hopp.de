"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import { NoticeSchema } from "@/schemas";
import { Notice } from "@prisma/client";
import { addNotice, getNoticesByUserId } from "@/actions/notice";

export const NoticesGrid = () => {
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
			toast.error("Fehler beim Laden der Notizen");
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

	// TODO: Skeleton Loading
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
					<Button disabled={isPending} variant="primary" type="submit" className="w-full">
						<FiPlus className="inline mr-2" /> Notiz hinzufügen
					</Button>
				</form>
			</Form>
			{notices.map(notice => {
				return (
					<div key={notice.id} className="bg-white border text-sm p-2 note relative">
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
								<Button disabled={isPending} variant="default" size="sm" type="submit" className="w-full">
									hinzufügen
								</Button>
							</form>
						</Form>
					</div>
				);
			})}
		</div>
	);
};

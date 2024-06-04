"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { revalidatePath } from "next/cache";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NoticeSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { MdOutlineInfo } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

import { addNotice } from "@/actions/notice/add-notice";

const NoticeCard = () => {
	const [isPending, startTransiton] = useTransition();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [notices, setNotices] = useState<any[]>([]);

	const fetchNotices = async () => {
		await fetch("/api/notices/").then(async res => {
			setIsLoading(true);
			const response = await res.json();
			setNotices(response);
			setIsLoading(false);
		});
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
		startTransiton(() => {
			addNotice(values).then(data => {
				if (data.error) {
					toast.error(data.error);
				}

				if (data.success) {
					toast.success(data.success);
				}
			});
			form.reset();
		});
	};

	return (
		<div className="bg-white rounded shadow-sm border p-3">
			<h2 className="text-sm border-bottom text-neutral-500 flex justify-between">
				<span>Notizen</span>
				<span>
					<MdOutlineInfo />
				</span>
			</h2>
			<h3 className="text-md font-semibold mt-2 mb-4">{isLoading ? "0" : notices.length}</h3>
			<Popover>
				<PopoverTrigger className="flex justify-center w-full p-3 py-2 bg-slate-100 text-slate-700 hover:text-slate-800 hover:bg-slate-200 text-xs md:text-base rounded-sm">
					<FiPlus className="mt-[.125rem] md:mt-1 mr-2" /> Notiz hinzufügen
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

							<Button disabled={isPending} variant="outline" type="submit" className="w-full">
								Hinzufügen
							</Button>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default NoticeCard;

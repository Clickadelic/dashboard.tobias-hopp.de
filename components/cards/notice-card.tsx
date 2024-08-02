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

import { addNotice, getNoticesByUserId } from "@/actions/notice";
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
			setNotices(response);
			setLatestNotice(response[0]);
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

	return (
		<div className="bg-white rounded-xl shadow-sm border p-4">
			<h2 className="text-xs md:text-sm border-bottom text-slate-900 flex justify-between mb-2">
				<Link href="/notizen" className="hover:text-slate-700 hover:underline" title="Zur Notizübersicht">
					Notizen
				</Link>
				<span>neueste Notiz</span>
			</h2>
			<h3 className="flex justify-between">
				<span className="font-bold">
					<CiEdit className="inline-block mr-2 mt-[-3px]" />
					{notices.length}
				</span>
				<span className="text-sm font-normal mt-1">{status === "loading" || isLoading ? <Skeleton className="w-12 h-4 bg-primary/10 animate-pulse" /> : latestNotice?.noticetext}</span>
			</h3>
		</div>
	);
};

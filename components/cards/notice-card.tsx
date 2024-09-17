"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useNoticesStore } from "@/hooks/use-notices-store";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import { CiEdit } from "react-icons/ci";

import { getNoticesByUserId } from "@/actions/notice";

export const NoticeCard = () => {
	const { status } = useSession({ required: true });

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const notices = useNoticesStore(state => state.notices);
	const setNotices = useNoticesStore(state => state.setNotices);
	const latestNotice = useNoticesStore(state => state.notices[0]);

	const fetchNotices = async () => {
		setIsLoading(true);
		try {
			const notices = await getNoticesByUserId();
			setNotices(notices);
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

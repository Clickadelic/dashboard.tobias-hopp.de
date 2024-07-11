"use client";

import * as z from "zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition, useEffect } from "react";

import Image from "next/image";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";

interface FormProfileImageUploadProps {
	classNames?: string;
}

export const FormProfileImageUpload = ({ classNames }: FormProfileImageUploadProps) => {
	const user = useCurrentUser();
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [inProgress, setInProgress] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (event: React.FormEvent) => {
		setInProgress(true);
		event.preventDefault();

		if (!file) return;

		const formData = new FormData();
		formData.append("file", file as Blob);

		const response = await fetch(`/api/upload/profile-image/${user?.id}`, {
			method: "POST",
			body: formData
		});

		const data = await response.json();
		setPreview(data.blob.url);
		setInProgress(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={classNames}>
				<input id="dropzone-file" className="flex" onChange={event => setFile(event.target.files?.[0] || null)} type="file" />
				<Button type="submit" variant="default">
					{inProgress ? "...in Bearbeitung" : "Profilbild hochladen"}
				</Button>
			</form>
			{preview && <Image width={200} height={160} src={preview} alt="Preview" />}
		</>
	);
};

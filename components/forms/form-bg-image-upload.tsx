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

import { UserSchema } from "@/schemas";
import { addBackgroundImage } from "@/actions/upload";

interface FormBackgroundImageUploadProps {
	classNames?: string;
}

export const FormBackgroundImageUpload = ({ classNames }: FormBackgroundImageUploadProps) => {
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

		const response = await fetch(`/api/upload/background-image/${user?.id}`, {
			method: "POST",
			body: formData
		});

		const data = await response.json();
		setPreview(data.blob.url);
		setInProgress(false);
	};

	console.log("User BG", user?.backgroundImage);

	return (
		<>
			<form onSubmit={handleSubmit} className={classNames}>
				<input id="dropzone-file" onChange={event => setFile(event.target.files?.[0] || null)} type="file" />
				<button type="submit" className="mt-3 text-slate-500 text-center">
					{inProgress ? "...in Bearbeitung" : "Hintergrundbild hochladen"}
				</button>
			</form>
			{preview && <Image width={200} height={160} src={preview} alt="Preview" />}
			{user?.backgroundImage && <Image width={200} height={160} src={user?.backgroundImage} alt="Current Background" />}
		</>
	);
};

"use client";

import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export const DeleteBackgroundImageButton = ({ url: string }: { url: string }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleClick = async () => {
		setIsLoading(true);
		try {
			await fetch(`/api/upload`, {
				method: "DELETE",
				body: JSON.stringify({ URL })
			});
			router.refresh();
		} catch (error) {
			toast.error("Fehler beim Laden der Bild-Datei.");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<button onClick={handleClick} disabled={isLoading} title="Bild Löschen" className="absolute top-2 right-2 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full">
			<IoCloseOutline />
		</button>
	);
};

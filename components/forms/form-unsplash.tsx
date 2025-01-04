"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Skeleton } from "../ui/skeleton";

import Link from "next/link";
import Image from "next/image";
import { Loader2, Check } from "lucide-react";

// TODO: Implement correctly
import { defaultImages } from "@/config/images";
import { Form } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

export default function FormUnsplash() {
	const { pending } = useFormStatus();
	const [isLoading, setIsLoading] = useState(true);

	const [images, setImages] = useState<Array<Record<string, any>>>([]);
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

	useEffect(() => {
		const fetchImages = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(`/api/unsplash`);

				if (response.ok) {
					const data = await response.json();
					const allImages = Array.isArray(data) ? data : [];
					// Nur Querformat-Bilder filtern
					const filteredimages = allImages.filter((image: any) => image.width / image.height > 1);
					setImages(filteredimages);
				}

				if (!response.ok) {
					throw new Error(`Unsplash API error: ${response.status}`);
					setImages(defaultImages);
				}
			} catch (error) {
				console.error(error);
				setImages(defaultImages);
			} finally {
				setIsLoading(false);
			}
		};

		fetchImages();
	}, []);

	if (isLoading) {
		return (
			<div className="relative">
				<div className="grid grid-cols-3 gap-2 mb-2">
					{Array(9)
						.fill(0)
						.map((_, index) => (
							<Skeleton key={index} className="aspect-video relative flex flex-col justify-center items-center" />
						))}
				</div>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="grid grid-cols-3 gap-2 mb-2">
				{images.map(image => (
					<div
						key={image.id}
						className={cn("cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted", pending && "opacity-50 hover:opacity-50 cursor-auto")}
						onClick={() => {
							if (pending) return;
							setSelectedImageId(image.id);
						}}
					>
						<input
							type="radio"
							id={image.id}
							name={image.id}
							className="hidden"
							checked={selectedImageId === image.id}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
						/>
						<Image src={image.urls.thumb} alt={image.alt_description} width={200} height={160} className="relative aspect-video rounded-sm" />
						{selectedImageId === image.id && (
							<div className="absolute inset-y-0 w-full h-full bg-black/30 flex items-center justify-center">
								<Check className="w-4 h-4 text-white" />
							</div>
						)}
						<Link
							href={image.links.html}
							target="_blank"
							className="absolute bottom-0 opacity-0 group-hover:opacity-100 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
						>
							{image.user.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

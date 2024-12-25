import { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

// TODO: Implement correctly
import { defaultImages } from "@/config/images";
import { Form } from "react-hook-form";

const FormUnsplash = () => {
	const [images, setImages] = useState<Array<Record<string, any>>>([]);
	const [isLoading, setIsLoading] = useState(true);
	const fetchImages = async () => {
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
			}

			// const data = await response.json();
			// setImages(data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<div className="relative">
			<div className="grid grid-cols-3 gap-2 mb-2">
				{isLoading ? (
					<FormUnsplash.Skeleton />
				) : (
					images.map((image, index) => (
						<div key={index}>
							<Image src={image.urls.thumb} alt={image.alt_description} width={100} height={100} className="w-full h-full object-cover" />
						</div>
					))
				)}
			</div>
		</div>
	);
};

FormUnsplash.displayName = "FormUnsplash";

FormUnsplash.Skeleton = function () {
	return (
		<>
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
			<Skeleton className="w-[106px] h-[74px] relative flex flex-col justify-center items-center" />
		</>
	);
};

export default FormUnsplash;

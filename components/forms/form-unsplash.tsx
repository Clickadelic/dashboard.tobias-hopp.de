import { useState, useEffect } from "react";
import Image from "next/image";
import { defaultImages } from "@/config/images";

export const FormUnsplash = () => {
	const [images, setImages] = useState<Array<Record<string, any>>>([]);
	const [isLoading, setIsLoading] = useState(true);
	const fetchImages = async () => {
		try {
			const response = await fetch(`/api/unsplash`);

			if (!response.ok) {
				throw new Error(`Unsplash API error: ${response.status}`);
			}

			const data = await response.json();
			setImages(data);
		} catch (error) {
			console.error(error);
			setImages([defaultImages]);
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
					<div className="col-span-3 flex justify-center items-center h-32">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
					</div>
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

import { unsplash } from "@/lib/unsplash";
import { useState, useEffect } from "react";
import Image from "next/image";
import { defaultImages } from "@/config/images";

export const FormUnsplash = () => {
	const [images, setImages] = useState<Array<Record<string, any>>>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchImages = async () => {
		try {
			const result = await unsplash.photos.getRandom({
				collectionIds: ["317099"],
				count: 9
			});
			if (result && result.response) {
				const newImages = result.response as Array<Record<string, any>>;
				setImages(newImages);
			} else {
				console.error("Error: failed to load images");
			}
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
				{images.map(image => (
					<div key={image.id} className="relative w-full h-0 pb-[100%] overflow-hidden">
						<Image src={image.urls.regular} alt={image.description} />
					</div>
				))}
			</div>
		</div>
	);
};

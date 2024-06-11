import { BsArrowsFullscreen } from "react-icons/bs";

export const FullscreenButton = () => {
	const goFullscreen = () => {
		document.body.requestFullscreen();
		console.log("goFullscreen");
	};

	return (
		<button onClick={() => {}} className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
			<BsArrowsFullscreen />
		</button>
	);
};

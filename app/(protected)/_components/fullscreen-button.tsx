"use client";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";

export const FullscreenButton = () => {
	let isFullscreen = false;

	function requestFullscreen() {
		if (document.fullscreenElement) {
			isFullscreen = false;
			document.exitFullscreen().catch(err => console.error(err));
		} else {
			isFullscreen = true;
			document.documentElement.requestFullscreen();
		}
	}

	return (
		<li>
			<button
				onClick={() => {
					requestFullscreen();
				}}
				className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded"
			>
				{isFullscreen ? <AiOutlineFullscreenExit /> : <BsArrowsFullscreen />}
			</button>
		</li>
	);
};

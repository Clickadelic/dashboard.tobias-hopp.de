import { BsArrowsFullscreen } from "react-icons/bs";

export const FullscreenButton = () => {
	function requestFullscreen() {
		document.onclick = event => {
			if (document.fullscreenElement) {
				document.exitFullscreen().catch(err => console.error(err));
			} else {
				document.documentElement.requestFullscreen();
			}
		};
	}

	return (
		<button
			onClick={() => {
				requestFullscreen();
			}}
			className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded"
		>
			<BsArrowsFullscreen />
		</button>
	);
};

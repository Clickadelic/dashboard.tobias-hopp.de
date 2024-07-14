import { BsDownload } from "react-icons/bs";

interface DownloadJSONButtonProps {
	data: object;
	fileName: string;
	btnClasses?: string;
}

export const DownloadJSONButton = ({ data, fileName, btnClasses }: DownloadJSONButtonProps) => {
	const downloadJSON = () => {
		const jsonData = new Blob([JSON.stringify(data)], { type: "application/json" });
		const jsonURL = URL.createObjectURL(jsonData);
		const link = document.createElement("a");
		link.href = jsonURL;
		link.download = `${fileName}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<button onClick={downloadJSON} className={btnClasses}>
			<BsDownload className="inline -mt-1.5 mx-2" /> Download JSON
		</button>
	);
};

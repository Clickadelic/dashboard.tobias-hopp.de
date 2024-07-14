import { BsDownload } from "react-icons/bs";

interface DownloadCSVButtonProps {
	data: string;
	fileName: string;
	btnClasses?: string;
}

export const DownloadCSVButton = ({ data, fileName, btnClasses }: DownloadCSVButtonProps) => {
	const convertToCSV = (objArray: Array<Record<string, any>> | string): string => {
		const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
		let str = "";

		for (let i = 0; i < array.length; i++) {
			let line = "";
			for (let index in array[i]) {
				if (line !== "") line += ",";

				line += array[i][index];
			}
			str += line + "\r\n";
		}
		return str;
	};

	const downloadCSV = () => {
		const csvData = new Blob([convertToCSV(data)], { type: "text/csv" });
		const csvURL = URL.createObjectURL(csvData);
		const link = document.createElement("a");
		link.href = csvURL;
		link.download = `${fileName}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<button onClick={downloadCSV} className={btnClasses}>
			<BsDownload className="inline -mt-1.5 mx-2" /> Download .csv
		</button>
	);
};

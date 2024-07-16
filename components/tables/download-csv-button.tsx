import { BsDownload } from "react-icons/bs"
import React from "react"
import { toast } from "sonner"

interface DownloadCSVButtonProps {
	data: Array<Record<string, any>> | string
	fileName: string
	btnClasses?: string
}

export const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ data, fileName, btnClasses }) => {
	const convertToCSV = (objArray: Array<Record<string, any>> | string): string => {
		let array: Array<Record<string, any>>

		if (typeof objArray === "string") {
			try {
				array = JSON.parse(objArray)
			} catch (error) {
				toast.error("Ungültiger JSON-String: `${objArray}`")
				return ""
			}
		} else {
			array = objArray
		}

		if (!Array.isArray(array)) {
			toast.error("Angebene Daten sind kein Array")
			return ""
		}

		if (array.length === 0) {
			return ""
		}

		const keys = Object.keys(array[0])
		const csvRows = array.map(obj =>
			keys
				.map(key => {
					const value = obj[key] === null || obj[key] === undefined ? "" : String(obj[key])
					return `"${value.replace(/"/g, '""')}"` // Escape double quotes
				})
				.join(",")
		)

		return [keys.join(","), ...csvRows].join("\r\n")
	}

	const downloadCSV = () => {
		const csvString = convertToCSV(data)
		if (csvString === "") {
			console.error("CSV data is empty or invalid")
			return
		}

		const csvData = new Blob([csvString], { type: "text/csv" })
		const csvURL = URL.createObjectURL(csvData)
		const link = document.createElement("a")
		link.href = csvURL
		link.download = `${fileName}.csv`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<button onClick={downloadCSV} className={btnClasses}>
			<BsDownload className="inline -mt-1.5 mx-2" /> Download .csv
		</button>
	)
}

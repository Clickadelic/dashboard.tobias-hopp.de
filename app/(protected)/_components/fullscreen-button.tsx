"use client"
import { useState, useEffect } from "react"
import { BsArrowsFullscreen } from "react-icons/bs"
import { AiOutlineFullscreenExit } from "react-icons/ai"

export const FullscreenButton = () => {
	const [isFullscreen, setIsFullscreen] = useState(false)

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement)
		}

		document.addEventListener("fullscreenchange", handleFullscreenChange)

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange)
		}
	}, [])

	const requestFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen().catch(err => console.error(err))
		} else {
			document.documentElement.requestFullscreen().catch(err => console.error(err))
		}
	}

	return (
		<button onClick={requestFullscreen} className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded">
			{isFullscreen ? <AiOutlineFullscreenExit /> : <BsArrowsFullscreen />}
		</button>
	)
}

"use client"

import { useAppContext } from "@/context/app-context"

export const ContextComponent = () => {
	const { isToggled } = useAppContext()

	return (
		<div>
			<h2>Child Context-Test Component</h2>
			<p>The toggle is: {isToggled ? "On" : "Off"}</p>
		</div>
	)
}

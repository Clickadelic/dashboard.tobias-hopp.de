"use client";

import { useAppContext } from "@/context/app-context";

/**
 * 	<ContextComponent />
 *  @description
 *  Child Context-Test Component
 *  Hier können alle AppContext-Daten getestet
 *  werden, die im Child-Context genutzt werden.
 */

export const ContextComponent = () => {
	const { isToggled } = useAppContext();

	return (
		<div>
			<h2>Child Context-Test Component</h2>
			<p>The toggle is: {isToggled ? "On" : "Off"}</p>
		</div>
	);
};

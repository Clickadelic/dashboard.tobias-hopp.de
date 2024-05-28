"use client"

import { FiPlus } from "react-icons/fi"

export const LinkCard = () => {
	const addLink = () => {
		console.log("Link added ;D")
	}
	return (
		<div className="bg-white rounded-lg shadow-sm border px-3 py-2">
			<h2 className="text-sm border-bottom mb-3">Link</h2>
			<form onSubmit={addLink}>
				<button type="submit" className="flex justify-center w-full px-1 py-2 rounded-md bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 hover:border-slate-300">
					<FiPlus />
				</button>
			</form>
		</div>
	)
}

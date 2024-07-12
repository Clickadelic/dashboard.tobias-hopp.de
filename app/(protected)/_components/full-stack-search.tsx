"use client"

import { AiOutlineSearch } from "react-icons/ai"

export const FullStackSearch = () => {
	return (
		// TODO: Warum ist das Suchfeld nach unten versetzt? Pesticide
		<div className="inline-block relative -top-1">
			<div className="flex flex-1 flex-shrink-0">
				<input type="search" name="search" className="peer block w-full border border-r-0 rounded-tl-lg rounded-bl-lg border-slate-200 px-3 text-sm" placeholder="Suche / STRG + K" />
				<button
					className="border border-l-0 rounded-tr-lg rounded-br-lg px-4 py-2 hover:bg-mantis-hover hover:text-mantis-primary"
					onClick={() => {
						alert("asd")
					}}>
					<AiOutlineSearch className="inline -mt-1" />
				</button>
			</div>
		</div>
	)
}

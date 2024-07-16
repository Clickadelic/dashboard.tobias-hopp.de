"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { AiOutlineSearch } from "react-icons/ai";

interface FullStackSearchProps {
	classNames?: string;
}
// TODO: Finish functionality LOL
export const FullStackSearch = ({ classNames }: FullStackSearchProps) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = (term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("q", term);
		} else {
			params.delete("q");
		}
		replace(`${pathname}?${params.toString()}`);
	};

	return (
		// TODO: Warum ist das Suchfeld nach unten versetzt? Pesticide
		<div className={classNames}>
			<div className="flex flex-1 flex-shrink-0">
				<input
					onChange={e => handleSearch(e.target.value)}
					type="search"
					name="search"
					defaultValue={searchParams.get("q")?.toString()}
					className="peer block w-full border border-r-0 rounded-tl-lg rounded-bl-lg border-slate-200 px-3 text-sm"
					placeholder="Suche / STRG + K"
				/>
				<button className="border border-l-0 rounded-tr-lg rounded-br-lg px-3 py-1 hover:bg-mantis-hover hover:text-mantis-primary">
					<AiOutlineSearch className="inline -mt-1" />
				</button>
			</div>
		</div>
	);
};

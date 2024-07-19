"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";
import { AiOutlineSearch } from "react-icons/ai";

interface FullStackSearchProps {
	classNames?: string;
}

export const FullStackSearch = ({ classNames }: FullStackSearchProps) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("q")?.toString() || "");
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	useEffect(() => {
		if (debouncedSearchTerm.length >= 4 || debouncedSearchTerm.length === 0) {
			const params = new URLSearchParams(searchParams);
			if (debouncedSearchTerm) {
				params.set("q", debouncedSearchTerm);
			} else {
				params.delete("q");
			}
			replace(`${pathname}?${params.toString()}`);
		}
	}, [debouncedSearchTerm, searchParams, pathname, replace]);

	return (
		<div className={classNames}>
			<div className="flex flex-1 flex-shrink-0">
				<input
					onChange={e => handleSearch(e.target.value)}
					type="search"
					name="search"
					defaultValue={searchParams.get("q")?.toString()}
					className="peer block w-full border border-r-0 rounded-tl-lg rounded-bl-lg border-slate-200 pl-3 py-1 text-sm"
					placeholder="Suche / STRG + K"
				/>
				<button className="border border-l-0 rounded-tr-lg rounded-br-lg px-3 py-1 hover:bg-mantis-hover hover:text-mantis-primary">
					<AiOutlineSearch className="inline -mt-1" />
				</button>
			</div>
		</div>
	);
};

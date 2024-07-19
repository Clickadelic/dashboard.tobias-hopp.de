"use client";

import { useAppContext } from "@/context/app-context";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { useDebounce } from "use-debounce";

import { SidebarNavbar } from "./_components/sidebar-navbar";
import { Cockpit } from "./_components/cockpit";
import { CircularMenu } from "./_components/circular-menu";

import { getFullStackSearchResults } from "@/actions/search";
import { cn } from "@/lib/utils";

interface LayoutContextProps {
	children: React.ReactNode;
}

const LayoutContext = ({ children }: LayoutContextProps) => {
	const { isToggled } = useAppContext();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [results, setResults] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);
	const q = searchParams.get("q") || "";

	const findQuery = async (query: string) => {
		try {
			const searchResults = await getFullStackSearchResults(query);
			setResults(searchResults);
			console.log("Ergebnis der Suche:", searchResults);
		} catch (err) {
			console.error("Fehler bei der Suche:", err);
			setError("Es gab ein Problem bei der Suche. Bitte versuche es später erneut.");
		}
	};

	useEffect(() => {
		if (q) {
			setIsLoading(true);
			findQuery(q).finally(() => setIsLoading(false));
		} else {
			setResults([]);
		}
	}, [q]);

	return (
		<>
			<SidebarNavbar />
			<main className={cn("flex-1 transition-all duration-300 ease-in-out", isToggled ? "md:ml-16" : "md:ml-64")}>
				<div className="container pt-20">
					{q ? (
						<div className="page-wrapper pb-16">
							<h2 className="text-md font-bold text-slate-900 mb-5">Suchergebnisse</h2>
							{error && <p className="text-red-500">{error}</p>}
							{isLoading && <p>Lade Ergebnisse...</p>}
							{!isLoading && results.length === 0 && !error && <p>Keine Ergebnisse gefunden</p>}
							{!isLoading && results.length > 0 && (
								<ul className="space-y-4">
									{results.map((resultArray, outerIndex) => (
										<div key={outerIndex}>
											{resultArray.map((result: any, innerIndex: number) => (
												<li key={innerIndex} className="p-4 border border-gray-200 rounded shadow-sm">
													<h3 className="text-lg font-semibold">{result.title || result.noticetext}</h3>
													<p>{result.description || ""}</p>
													<p>Erstellt am: {new Date(result.createdAt).toLocaleString()}</p>
													<p>Aktualisiert am: {new Date(result.updatedAt).toLocaleString()}</p>
												</li>
											))}
										</div>
									))}
								</ul>
							)}
						</div>
					) : (
						<>{children}</>
					)}
				</div>
			</main>
			<Cockpit />
			<CircularMenu />
		</>
	);
};

export default LayoutContext;

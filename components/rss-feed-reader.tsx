"use client";

import { useState, useEffect } from "react";

interface FeedItem {
	title: string;
	link: string;
	contentSnippet: string;
	pubDate?: string;
	creator?: string;
}

export const RSSFeedReader = () => {
	const [items, setItems] = useState<FeedItem[]>([]); // Typisierung des State

	useEffect(() => {
		const loadFeeds = async () => {
			try {
				const response = await fetch("/api/rss-feed"); // Abruf der serverseitigen API
				const data: FeedItem[] = await response.json();
				data.length = 5;
				setItems(data);
			} catch (error) {
				console.error("Fehler beim Laden der Feeds:", error);
			}
		};

		loadFeeds();
	}, []);

	return (
		<div className="pl-4">
			<ol className="list-decimal">
				{items.map((item, index) => (
					<li key={index}>
						<a href={item.link} className="text-slate-700 text-md hover:cursor-pointer hover:text-mantis-primary" target="_blank" rel="noopener noreferrer">
							{item.title}
						</a>
						<p>{item.contentSnippet}</p>
					</li>
				))}
			</ol>
		</div>
	);
};

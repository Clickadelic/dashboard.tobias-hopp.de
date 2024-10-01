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
				const response = await fetch("/api/rss"); // Abruf der serverseitigen API
				const data: FeedItem[] = await response.json();
				setItems(data);
			} catch (error) {
				console.error("Fehler beim Laden der Feeds:", error);
			}
		};

		loadFeeds();
	}, []);

	return (
		<div>
			<h1>Web-Entwicklung RSS-Feeds</h1>
			<ul>
				{items.map((item, index) => (
					<li key={index}>
						<a href={item.link} target="_blank" rel="noopener noreferrer">
							{item.title}
						</a>
						<p>{item.contentSnippet}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

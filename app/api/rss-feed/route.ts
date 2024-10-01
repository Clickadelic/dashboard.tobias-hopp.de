import { NextResponse } from "next/server";
import Parser from "rss-parser";

// Typ für RSS Items (falls erforderlich)
interface FeedItem {
	title: string;
	link: string;
	// contentSnippet: string;
	pubDate?: string;
	creator?: string;
}

export async function GET() {
	const parser = new Parser();
	const feedUrls: string[] = ["https://feeds.feedburner.com/TechCrunch/", "https://www.smashingmagazine.com/feed/", "https://css-tricks.com/feed/"];

	let feedItems: FeedItem[] = [];
	try {
		for (const feedUrl of feedUrls) {
			// Abruf erfolgt serverseitig, keine CORS-Probleme
			const feed = await parser.parseURL(feedUrl);
			const parsedItems = feed.items.map(item => ({
				title: item.title || "Kein Titel",
				link: item.link || "#",
				// contentSnippet: item.contentSnippet || "",
				pubDate: item.pubDate,
				creator: item.creator
			}));
			feedItems = [...feedItems, ...parsedItems];
		}
	} catch (error) {
		return NextResponse.json({ error: "Fehler beim Laden der Feeds" }, { status: 500 });
	}

	return NextResponse.json(feedItems, { status: 200 });
}

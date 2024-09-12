"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { BsChatRightText } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { useState } from "react";
import OpenAI from "openai";

// OpenAI-Instanz erstellen
const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY // Stelle sicher, dass der API-Schlüssel korrekt geladen wird
});

export const Cockpit = () => {
	const [query, setQuery] = useState<string>("");
	const [response, setResponse] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!query) return;

		try {
			// Anfrage an OpenAI API senden
			const completion = await openai.chat.completions.create({
				model: "gpt-4", // oder "gpt-3.5-turbo", je nach verfügbarem Modell
				messages: [
					{ role: "system", content: "You are a helpful assistant." },
					{ role: "user", content: query }
				]
			});

			// Antwort speichern und anzeigen
			setResponse(completion.choices[0].message.content || "Keine Antwort erhalten.");
		} catch (error) {
			console.error("Fehler bei der Anfrage:", error);
			setResponse("Fehler bei der Anfrage.");
		}
	};

	return (
		<Drawer>
			<DrawerTrigger asChild className="fixed bottom-[-26px] mx-auto left-0 right-0 hover:bottom-0 transition-all w-32">
				<button className="w-32 bg-mantis-primary hover:bg-mantis-primary/90 text-white text-sm p-1 py-2 rounded-tl-lg rounded-tr-lg mx-auto">
					<BsChatRightText className="inline-block mr-2 mt-[-1px]" /> Ai-Cockpit
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerClose asChild>
					<Button variant="subtle" className="absolute top-3 right-3">
						<IoMdClose />
					</Button>
				</DrawerClose>
				<DrawerHeader className="container mx-auto">
					<DrawerTitle>
						<BsChatRightText className="inline-block mr-2 mt-[-3px]" /> Chat GPT
					</DrawerTitle>
					<DrawerDescription>Frag&apos; die k&uuml;nstliche Intelligenz</DrawerDescription>
				</DrawerHeader>
				<div className="min-h-[500px] container mx-auto">
					<div className="flex items-center justify-between space-x-2">{response ? <p>{response}</p> : <p>ChatGPTs Antwort wird hier angezeigt...</p>}</div>
				</div>
				<DrawerFooter className="container mx-auto mb-12">
					<form className="w-full flex justify-between" onSubmit={handleSubmit}>
						<span className="rounded-tl-full rounded-bl-full border border-r-0 p-2">
							<BsChatRightText className="mt-2 ml-3 inline-block text-slate-500" />
						</span>
						<input type="text" placeholder="Deine Frage an ChatGPT..." className="border-l-0 border-r-0 w-full border p-3" value={query} onChange={handleChange} />
						<button type="submit" aria-label="ChatGPT öffnen" className="rounded-tr-full rounded-br-full border border-l-0 p-2">
							<BsSend className="inline-block mx-3" />
						</button>
					</form>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

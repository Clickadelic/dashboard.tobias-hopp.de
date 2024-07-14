"use client";

import { LiaClipboard } from "react-icons/lia";
import { toast } from "sonner";

interface ClipboardButtonProps {
	title?: string;
	classNames?: string;
	textToCopy: string;
}

export const copyToClipboard = async (textToCopy: string) => {
	try {
		await navigator.clipboard.writeText(textToCopy);
		toast.success("Url in Zwischenablage kopiert.");
	} catch (error) {
		toast.error("Fehler beim kopieren in die Zwischenablage.");
	}
};

export const ClipboardButton = ({ classNames, textToCopy }: ClipboardButtonProps) => {
	return (
		<button aria-label="In Zwischenablage kopieren" className={classNames} onClick={() => copyToClipboard(textToCopy)}>
			<LiaClipboard className="size-4" />
		</button>
	);
};

"use client";

import { LiaClipboard } from "react-icons/lia";
import { toast } from "sonner";

interface ClipboardButtonProps {
	label: string;
	classNames?: string;
	stringToCopy: string;
}

export const copyToClipboard = async (stringToCopy: string) => {
	try {
		await navigator.clipboard.writeText(stringToCopy);
		toast.success("Url in Zwischenablage kopiert");
	} catch (error) {
		toast.error("Fehler beim kopieren in die Zwischenablage");
	}
};

export const ClipboardButton = ({ label, classNames, stringToCopy }: ClipboardButtonProps) => {
	return (
		<button aria-label={label} className={classNames} onClick={() => copyToClipboard(stringToCopy)}>
			<LiaClipboard className="size-4" />
			<span className="sr-only">{label}</span>
		</button>
	);
};

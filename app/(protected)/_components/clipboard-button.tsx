"use client";
import { LiaClipboard } from "react-icons/lia";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ClipboardButtonProps {
	classNames?: string;
	title?: string;
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
		<Button asChild variant="default">
			<button className={classNames} onClick={() => copyToClipboard(textToCopy)}>
				<LiaClipboard className="size-4" />
			</button>
		</Button>
	);
};

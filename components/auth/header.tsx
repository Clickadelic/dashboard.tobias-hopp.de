import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
});

interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className="w-full flex flex-col gap-y-4 items-center justify-center">
			<h1 className={cn("text-2xl font-semibold", font.className)}>
				<Image src="/favicon.svg" width={48} height={48} className="mt-[-5px] inline mr-3" alt="Dashboard Icon" />
				Dashboard
			</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</div>
	);
};

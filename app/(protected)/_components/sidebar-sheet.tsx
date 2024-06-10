import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { GoGear } from "react-icons/go";

const SidebarSheet = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="hover:bg-slate-200 mx-1 inline-flex p-3 rounded mx-2">
					<GoGear className="size-4" />
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Dashboard-Einstellungen</SheetTitle>
					<SheetDescription>Hintergrundbild, Logo und andere Einstellungen.</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SidebarSheet;

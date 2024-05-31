import { AddLinkButtonPopover } from "./link-add-button-popover";
import { LinkCounter } from "./link-counter";
export const LinkCard = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm border px-3 py-2">
			<LinkCounter />
			<AddLinkButtonPopover />
		</div>
	);
};

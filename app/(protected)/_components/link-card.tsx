import { AddLinkButtonPopover } from "./link-add-button-popover"
import { LinkCounter } from "./link-counter"
export const LinkCard = () => {
	return (
		<div className="bg-white rounded shadow-sm border px-3 py-2">
			<LinkCounter />
			<AddLinkButtonPopover />
		</div>
	)
}

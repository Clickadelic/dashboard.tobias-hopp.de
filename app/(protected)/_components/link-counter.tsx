import { countLinks } from "@/data/links"

export const LinkCounter = () => {
	const links = countLinks()
	return links
}

import { countLinks } from "@/data/links"

export const LinkCounter = () => {
	const links = countLinks()
	return <h3 className="text-sm mb-2">{links} Links</h3>
}

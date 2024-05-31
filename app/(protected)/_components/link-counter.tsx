import { countLinks } from "@/data/links";

// TODO:
export const LinkCounter = () => {
	const links = countLinks();
	console.log(links);
	return <h3 className="text-sm mb-2">{links} Links</h3>;
};

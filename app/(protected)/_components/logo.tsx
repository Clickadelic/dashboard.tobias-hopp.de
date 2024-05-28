import Image from "next/image";
import Link from "next/link";
import logoSrc from "@/public/favicon.svg";

const Logo = () => {
	return (
		<h1>
			<Link href="/overview" className="flex justify-between mt-2 text-slate-900 hover:opacity-75">
				<Image src={logoSrc} width={16} height={16} className="logo inline -mt-1 h-8 w-8" alt="Tailwind Dashboard" />
				<span id="tailwind-dashboard" className="ml-2">
					<span className="md:inline-block font-medium mr-1">Toby&apos;s</span>
					<span className="md:inline-block font-bold">Dashboard</span>
				</span>
			</Link>
		</h1>
	);
};

export default Logo;

"use client";
import { BsApp } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export const AppBar = (links: any) => {
	return (
		<div className="w-full">
			<div className="flex items-start justify-start space-x-3">
				{/* {links.forEach(link => (
					<Link key={link.id} href={link.url} className="bg-white border shadow-sm hover:shadow-lg flex justify-center items-center rounded-lg w-16 h-16">
						{link.title.charAt(0).toUpperCase()}
					</Link>
				))} */}
				<div className="bg-white border shadow-sm hover:shadow-lg flex justify-center items-center rounded-lg w-16 h-16">Link</div>
				<div>Link</div>
				<div>Link</div>
				<div>Link</div>
				<div>Link</div>
			</div>
		</div>
	);
};

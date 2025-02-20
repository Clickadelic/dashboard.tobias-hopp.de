import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IoArrowForward } from "react-icons/io5";

interface ClickableCardProps {
	href: string;
	target?: string;
	icon: React.ReactNode;
	label: string;
	description: string;
}

export const ClickableCard = ({ href, target, icon, label, description }: ClickableCardProps) => {
	return (
		<Card className="border-transparent hover:border-mantis-primary transition-all">
			<Link href={href} target={target ? target : "_self"}>
				<CardHeader>
					<CardTitle>
						<span className="size-10 mb-3">{icon}</span>
						<span>{label}</span>
					</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-start">
					<IoArrowForward className="mt-1 mr-2" />
					{label}
				</CardContent>
			</Link>
		</Card>
	);
};

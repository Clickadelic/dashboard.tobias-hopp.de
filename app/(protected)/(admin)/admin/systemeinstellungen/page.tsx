import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

import { TbBackground } from "react-icons/tb";
import { IoArrowForward } from "react-icons/io5";

const SystemSettingsPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Systemeinstellungen</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				<Card>
					<CardHeader>
						<CardTitle>
							<TbBackground className="size-10 mb-3" />
							Login Background
						</CardTitle>
						<CardDescription>Lege das Login-Hintergrundbild fest</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href={"/admin/systemeinstellungen/login-background"} className="flex justify-start hover:text-mantis-primary">
							<IoArrowForward className="mt-1 mr-2" />
							Login Background
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default SystemSettingsPage;

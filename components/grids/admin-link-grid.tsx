import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

import { FiUploadCloud } from "react-icons/fi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsListCheck } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { PiEye } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { BsHouseGear } from "react-icons/bs";

interface AdminLinkGridProps {
	classNames?: string;
}

export const AdminLinkGrid = ({ classNames }: AdminLinkGridProps) => {
	return (
		<div className={`bg-white rounded-xl shadow-sm border p-2 md:p-4 space-y-3 ${classNames}`}>
			<div className="grid grid-cols-4 gap-4">
				<Card className="hover:shadow-lg hover:border-mantis-primary">
					<Link href="/admin/benutzer" title="Zur Benutzerübersicht">
						<CardHeader>
							<CardTitle>
								<FiUsers className="inline size-4 mt-[-3px] mr-2" />
								Benutzer
							</CardTitle>
							<CardDescription>Liste aller angemeldeten Benutzer</CardDescription>
						</CardHeader>

						<CardContent>
							<p>
								<LuMoveRight className="inline mr-2" />
								Zur Benutzerübersicht
							</p>
						</CardContent>
					</Link>
				</Card>
				<Card className="hover:shadow-lg hover:border-mantis-primary">
					<Link href="/admin/uploads" title="Zu den Uploads">
						<CardHeader>
							<CardTitle>
								<FiUploadCloud className="inline size-4 mt-[-3px] mr-2" />
								Uploads
							</CardTitle>
							<CardDescription>Liste aller Dateien</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								<LuMoveRight className="inline mr-2" />
								Zu den Uploads
							</p>
						</CardContent>
					</Link>
				</Card>
				<Card className="hover:shadow-lg hover:border-mantis-primary">
					<Link href="/admin/system" title="Zu den Uploads">
						<CardHeader>
							<CardTitle>
								<BsHouseGear className="inline size-4 mt-[-3px] mr-2" />
								System
							</CardTitle>
							<CardDescription>Login Background</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								<LuMoveRight className="inline mr-2" />
								Zu den Systemeinstellungen
							</p>
						</CardContent>
					</Link>
				</Card>
			</div>
		</div>
	);
};

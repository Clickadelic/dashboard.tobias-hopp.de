import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import Link from "next/link"

import { IoArrowForward } from "react-icons/io5"
import { FiUsers } from "react-icons/fi"
import { IoSpeedometerOutline } from "react-icons/io5"
import { BsBuildings } from "react-icons/bs"
import { BsListCheck } from "react-icons/bs"
import { CiEdit } from "react-icons/ci"
import { GoLink } from "react-icons/go"
import { PiEye } from "react-icons/pi"
import { FiUploadCloud } from "react-icons/fi"
import { BsHouseGear } from "react-icons/bs"

const AdminPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Admin</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				<Card>
					<CardHeader>
						<CardTitle>
							<FiUsers className="size-10 mb-3" />
							Benutzer
						</CardTitle>
						<CardDescription>Benutzerverwaltung</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href={"/admin/benutzer"} className="flex justify-start hover:text-mantis-primary">
							<IoArrowForward className="mt-1 mr-2" />
							Benutzer
						</Link>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>
							<FiUploadCloud className="size-10 mb-3" />
							Uploads
						</CardTitle>
						<CardDescription>Uploads der Benutzer</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href={"/admin/uploads"} className="flex justify-start hover:text-mantis-primary">
							<IoArrowForward className="mt-1 mr-2" />
							Uploads
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default AdminPage

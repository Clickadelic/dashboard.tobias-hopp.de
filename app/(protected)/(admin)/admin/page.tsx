import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
const AdminPage = () => {
	const adminlinks = [
		{
			title: "Benutzer",
			description: "Benutzer verwalten",
			url: "/admin/benutzer"
		},
		{
			title: "Uploads",
			description: "Uploads verwalten",
			url: "/admin/uploads"
		},
		{
			title: "Systemeinstellungen",
			description: "Systemeinstellungen verwalten",
			url: "/admin/system"
		}
	];

	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Admin</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				{adminlinks.map(adminlink => (
					<Card key={adminlink.title}>
						<CardHeader>
							<CardTitle>{adminlink.title}</CardTitle>
							<CardDescription>{adminlink.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href={"/admin/" + adminlink.url}>{adminlink.title}</Link>
						</CardContent>
						<CardFooter>footer text</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default AdminPage;

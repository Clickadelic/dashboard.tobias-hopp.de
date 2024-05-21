import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface UserInterfaceProps {
	user?: ExtendedUser
	label: string
}

export const UserInfo = ({ user, label }: UserInterfaceProps) => {
	return (
		<Card className="w-[600px] m-auto shadow-md">
			<CardHeader>
				<p className="font-semibold text-center">{label}</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex flex-row items-center justify-between p-3 shadow-sm border rounded-lg">
					<p>ID:</p>
					<p className="text-truncate font-mono bg-slate-100">{user?.id}</p>
				</div>
				<div className="flex flex-row items-center justify-between p-3 shadow-sm border rounded-lg">
					<p>Name:</p>
					<p className="text-truncate font-mono bg-slate-100">{user?.name}</p>
				</div>
				<div className="flex flex-row items-center justify-between p-3 shadow-sm border rounded-lg">
					<p>E-Mail:</p>
					<p className="text-truncate font-mono bg-slate-100 overflow-hidden">{user?.email}</p>
				</div>
				<div className="flex flex-row items-center justify-between p-3 shadow-sm border rounded-lg">
					<p>Role:</p>
					<p className="text-truncate font-mono bg-slate-100">{user?.role}</p>
				</div>
				<div className="flex flex-row items-center justify-between p-3 shadow-sm border rounded-lg">
					<p>2FA:</p>
					<p className="text-truncate font-mono bg-slate-100">Off</p>
				</div>
			</CardContent>
		</Card>
	)
}

import { getUsersWithoutPassword } from "@/actions/user"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Image from "next/image"

export const UserList = async () => {
	const users = await getUsersWithoutPassword()
	return (
		<ul className="grid grid-cols-4 gap-4">
			{users.map(user => (
				<li key={user.email}>
					<div className="max-w-2xl pb-4 bg-white border rounded-lg sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto text-slate-900">
						<div className="h-32 overflow-hidden rounded-t-lg">
							<Image src={user?.backgroundImage || ""} alt={`${user?.name} Profilbild`} className="object-cover" width={500} height={240} />
						</div>
						<div className="relative mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full size-32">
							<Avatar>
								<AvatarImage src={user?.profileImage || ""} alt={`${user?.name} Profilbild`} />
								<AvatarFallback>
									<div className="w-full h-full rounded-full bg-slate-200"></div>
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="mt-2 mb-12 text-center">
							<h2 className="font-semibold">{user?.name}</h2>
							<p className="text-gray-500">{user?.role}</p>
						</div>
						<div className="mt-2 mb-12 text-center">
							<p>{user?.bio}</p>
						</div>
						<p className="mx-4 text-sm text-center text-neutral-300">Social Media Coming soon</p>
					</div>
				</li>
			))}
		</ul>
	)
}

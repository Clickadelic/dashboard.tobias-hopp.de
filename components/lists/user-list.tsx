import { getUsersWithoutPassword } from "@/actions/user"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { FaUser } from "react-icons/fa"
import Image from "next/image"
export const UserList = async () => {
	const users = await getUsersWithoutPassword()
	return (
		<ul className="grid grid-cols-4 gap-4">
			{users.map(user => (
				<li key={user.email}>
					<div className="border pb-4 max-w-2xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white rounded-lg text-slate-900">
						<div className="rounded-t-lg h-32 overflow-hidden">
							<Image src={user?.backgroundImage || ""} alt={`${user?.name} Profilbild`} className="object-cover" width={500} height={240} />
						</div>
						<div className="mx-auto size-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
							<Avatar>
								<AvatarImage src={user?.profileImage || ""} alt={`${user?.name} Profilbild`} />
								<AvatarFallback>
									<div className="w-full h-full bg-slate-200 rounded-full"></div>
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="text-center mt-2 mb-12">
							<h2 className="font-semibold">{user?.name}</h2>
							<p className="text-gray-500">{user?.role}</p>
						</div>
						<div className="mt-2 mb-12 text-center">
							<p>{user?.bio}</p>
						</div>
						<p className="mx-4 text-neutral-300 text-center text-sm">Social Media Coming soon</p>
					</div>
				</li>
			))}
		</ul>
	)
}

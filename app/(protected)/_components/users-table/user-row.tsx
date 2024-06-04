import { TableCell, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { BsInfoCircle } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

const UserRow = (user: any) => {
	console.log("User row", user);
	return (
		<TableRow>
			<TableCell>
				<Popover>
					<PopoverTrigger>
						<BsInfoCircle />
					</PopoverTrigger>
					<PopoverContent>{user?.user.id}</PopoverContent>
				</Popover>
			</TableCell>
			<TableCell>{user?.user.name}</TableCell>
			<TableCell>{user?.user.email}</TableCell>
			<TableCell>{user?.user.emailVerified ? <CheckCircledIcon className="size-4 mx-auto text-emerald-500" /> : <ExclamationTriangleIcon className="size-4 mx-auto text-rose-500" />}</TableCell>
			<TableCell>
				{user?.user.isTwoFactorEnabled ? <CheckCircledIcon className="size-4 mx-auto text-emerald-500" /> : <ExclamationTriangleIcon className="size-4 mx-auto text-rose-500" />}
			</TableCell>
			<TableCell>{user?.user.role.toLowerCase()}</TableCell>
			<TableCell>
				<button className=" text-slate-800 hover:text-emerald-500">
					<LiaEdit className="size-4 mx-auto" />
				</button>
			</TableCell>
			<TableCell>
				<button className="text-rose-500 hover:text-rose-600">
					<BsFillTrash3Fill className="size-4 mx-auto" />
				</button>
			</TableCell>
		</TableRow>
	);
};

export default UserRow;

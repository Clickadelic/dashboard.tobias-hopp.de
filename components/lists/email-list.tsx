import { LiaEdit } from "react-icons/lia";
import { GoTrash } from "react-icons/go";

export const EmailList = () => {
	const emails = [
		{
			id: "1",
			title: "Demo-Email 1",
			url: "https://mail.google.com/mail/u/0/#inbox",
			description: "Email 1 description"
		},
		{
			id: "2",
			title: "Demo-Email 2",
			url: "https://mail.google.com/mail/u/0/#inbox",
			description: "Email 2 description"
		},
		{
			id: "3",
			title: "Demo-Email 3",
			url: "https://mail.google.com/mail/u/0/#inbox",
			description: "Email 3 description"
		}
	];
	return (
		<div>
			<ul>
				{emails.map((email: any) => (
					<li key={email.id} className="flex justify-between mb-2 px-3 py-1 hover:bg-mantis-hover rounded-sm">
						<span>
							<a href={email.url} className="text-sm text-slate-900 hover:text-mantis-primary" target="_blank" title={email.title} rel="noreferrer">
								{email.title}
							</a>
							<p className="text-xs text-slate-400 cursor-default">{email.description}</p>
						</span>
						<span className="space-x-3 flex">
							<button>
								<LiaEdit className="size-4 mx-auto" />
							</button>
							<button className="text-rose-500 hover:text-rose-600">
								<GoTrash className="size-4 mx-auto" />
							</button>
						</span>
					</li>
				))}
				{emails.length === 0 && <li className="text-md text-neutral-400 text-center mt-12">Lege Deinen ersten Email an.</li>}
			</ul>
		</div>
	);
};

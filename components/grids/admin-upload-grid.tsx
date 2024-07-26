import { list } from "@vercel/blob";
import Image from "next/image";

interface AdminUploadGridProps {
	classNames?: string;
}

export const AdminUploadGrid: React.FC<AdminUploadGridProps> = async ({ classNames }: AdminUploadGridProps) => {
	const blobs = await list();
	return (
		<div className={classNames}>
			<ul className="flex gap-3">
				{blobs.blobs.map(blob => (
					<li key={blob.pathname + "-" + new Date()} className="relative flex items-start space-x-3">
						<Image src={blob.url} className="rounded-md" alt={blob.pathname} width={200} height={160} />
					</li>
				))}
			</ul>
		</div>
	);
};

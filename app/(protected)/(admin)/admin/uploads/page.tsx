import { list } from "@vercel/blob";
import Image from "next/image";

const UploadsPage = async () => {
	const blobs = await list();

	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Uploads</h2>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4 space-y-3">
				<ul className="flex gap-3">
					{blobs.blobs.map(blob => (
						<li key={blob.pathname + "-" + new Date()} className="relative flex items-start space-x-3">
							<Image src={blob.url} alt={blob.pathname} width={200} height={160} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default UploadsPage;

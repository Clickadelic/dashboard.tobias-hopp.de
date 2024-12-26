import { TbBackground } from "react-icons/tb";
import { ClickableCard } from "@/components/cards/clickable/clickable-card";

const SystemSettingsPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Systemeinstellungen</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				<ClickableCard
					href="/admin/systemeinstellungen/login-background"
					icon={<TbBackground className="size-10 mb-3" />}
					label="Login Background"
					description="Upload eines Hintergrundbildes"
				/>
			</div>
		</div>
	);
};

export default SystemSettingsPage;

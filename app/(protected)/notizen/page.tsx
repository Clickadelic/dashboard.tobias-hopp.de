import { NoticesGrid } from "../../../components/grids/notices-grid"

const NoticesPages = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Notizen</h2>
			<div className="bg-white rounded-xl shadow-sm border p-4">
				<NoticesGrid />
			</div>
		</div>
	)
}

export default NoticesPages

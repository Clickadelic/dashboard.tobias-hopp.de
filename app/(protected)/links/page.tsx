import LinksTable from "../_components/tables/links-table"

const LinksPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Links</h2>
			<div className="bg-white rounded shadow-sm border p-3">
				<LinksTable />
			</div>
		</div>
	)
}

export default LinksPage

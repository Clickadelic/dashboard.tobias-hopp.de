import { FormOrganization } from "@/components/forms/form-organization"

const OrganisationsPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Organisationen</h2>
			<div className="bg-white rounded-xl shadow-sm border p-2 md:p-4">
				<div className="md:grid grid-cols-4">
					<FormOrganization />
				</div>
			</div>
		</div>
	)
}

export default OrganisationsPage

import { FormOrganization } from "@/components/forms/form-organization"

import { getOrganizationById } from "@/actions/organization"

const OrganizationByIdPage = async ({ params }: { params: { id: string } }) => {
	const id = params.id
	const Organization = await getOrganizationById(id)
	return (
		<div className="page-wrapper">
			<h2 className="text-md flex justify-start font-bold text-slate-700 mb-5">{Organization?.name}</h2>
			<div className="bg-white rounded-xl shadow-sm border p-4">
				<h3>{Organization?.name}</h3>
				<FormOrganization />
			</div>
		</div>
	)
}

export default OrganizationByIdPage

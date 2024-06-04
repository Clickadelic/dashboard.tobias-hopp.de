"use client"

import { useTransition, useState, useEffect } from "react"

const LinksPage = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [links, setLinks] = useState<any[]>([])

	const fetchLinks = async () => {
		await fetch("/api/links/").then(async res => {
			setIsLoading(true)
			const response = await res.json()
			setLinks(response)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		setIsLoading(true)
		fetchLinks()
		setIsLoading(false)
	}, [])

	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Links</h2>
			<div className="bg-white rounded shadow-sm border p-3">
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>URL</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{links.map((link: any) => (
								<tr key={link.id}>
									<td>{link.title}</td>
									<td>{link.url}</td>
									<td>{link.description}</td>
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr>
								<td colSpan={3}>
									<button
										onClick={() => {
											fetchLinks()
										}}>
										Reload
									</button>
								</td>
							</tr>
						</tfoot>
					</table>
				)}
			</div>
		</div>
	)
}

export default LinksPage

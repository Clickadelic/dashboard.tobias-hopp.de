"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import { Skeleton } from "../ui/skeleton"
import { toast } from "sonner"

export const HackerNewsWidget = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [topArticles, setTopArticles] = useState<any[]>([])
	const { status } = useSession({ required: true })

	useEffect(() => {
		setIsLoading(true)
		loadTopArticles()
		setIsLoading(false)
	}, [])

	const loadTopArticles = async () => {
		try {
			// Hole die IDs der Top-Artikel
			let response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
			let topArticleIds = await response.json()

			// Hole Details für die ersten 10 Artikel
			let topArticles = await Promise.all(
				topArticleIds.slice(0, 10).map(async (id: string) => {
					let articleResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
					return await articleResponse.json()
				})
			)
			setTopArticles(topArticles)
		} catch (error) {
			console.error("Error fetching top articles:", error)
			toast.error("Failed to fetch top articles")
		}
	}

	return (
		<ul className="list-disc ml-4">
			{topArticles.map((article: any) => (
				<li key={article.id}>
					<Link href={article.url} className="hover:text-mantis-primary" target="_blank">
						{article.title}
					</Link>
				</li>
			))}
			{status === "loading" ||
				(isLoading && (
					<>
						<Skeleton className="w-4/4 h-4 mb-2" />
						<Skeleton className="w-4/4 h-4 mb-2" />
						<Skeleton className="w-3/4 h-4 mb-2" />
						<Skeleton className="w-3/4 h-4 mb-2" />
						<Skeleton className="w-3/4 h-4 mb-2" />
						<Skeleton className="w-3/4 h-4 mb-2" />
						<Skeleton className="w-3/4 h-4 mb-2" />
						<Skeleton className="w-2/4 h-4 mb-2" />
						<Skeleton className="w-2/4 h-4 mb-2" />
						<Skeleton className="w-2/4 h-4 mb-2" />
						<Skeleton className="w-1/4 h-4 mb-2" />
					</>
				))}
		</ul>
	)
}

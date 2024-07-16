"use client"

import { type ChartConfig } from "@/components/ui/chart"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar } from "recharts"

import { useState, useEffect } from "react"
import { Project } from "@prisma/client"
import { getProjectsByUserId } from "@/actions/project"

const chartConfig = {
	projects: {
		label: "Projekte",
		color: "#1677ff"
	}
} satisfies ChartConfig

export function Charts() {
	const chartData = []

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [projectCount, setProjectCount] = useState<Project[]>([])

	const myProjectCount = async () => {
		const projectResults = await getProjectsByUserId()
		setProjectCount(projectResults)
		const month = new Date().getMonth()
		chartData.push({
			projects: projectResults?.length
		})
		console.log(chartData)
	}

	useEffect(() => {
		setIsLoading(true)
		myProjectCount()
		setIsLoading(false)
	}, [])
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<Bar dataKey="projects" fill="var(--color-projects)" radius={4} />
				<ChartTooltip content={<ChartTooltipContent />} />
			</BarChart>
		</ChartContainer>
	)
}

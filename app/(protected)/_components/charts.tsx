"use client"

import { type ChartConfig } from "@/components/ui/chart"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar } from "recharts"

import { useState, useEffect } from "react"

import { Project, Notice, Todo, Link } from "@prisma/client"
import { getProjectsByUserId } from "@/actions/project"
import { getNoticesByUserId } from "@/actions/notice"
import { getTodosByUserId } from "@/actions/todo"
import { getLinksByUserId } from "@/actions/link"

const chartConfig = {
	projects: {
		label: "Projekte",
		color: "#1677ff"
	},
	notices: {
		label: "Notizen",
		color: "#1677ff"
	},
	todos: {
		label: "Todos",
		color: "#1677ff"
	},
	links: {
		label: "Links",
		color: "#1677ff"
	}
} satisfies ChartConfig

export function Charts() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [projectCount, setProjectCount] = useState<Project[]>([])
	const [noticeCount, setNoticeCount] = useState<Notice[]>([])
	const [todoCount, setTodoCount] = useState<Todo[]>([])
	const [linkCount, setLinkCount] = useState<Link[]>([])

	const getChartData = async () => {
		setIsLoading(true)
		try {
			const projectResults = await getProjectsByUserId()
			setProjectCount(projectResults)
			const noticeResults = await getNoticesByUserId()
			setNoticeCount(noticeResults)
			const todoResults = await getTodosByUserId()
			setTodoCount(todoResults)
			const linkResults = await getLinksByUserId()
			setLinkCount(linkResults)
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	const chartData = [
		{
			name: "Projekte",
			projects: projectCount.length
		},
		{
			name: "Notizen",
			notices: noticeCount.length
		},
		{
			name: "Todos",
			todos: todoCount.length
		},
		{
			name: "Links",
			links: linkCount.length
		}
	]

	useEffect(() => {
		setIsLoading(true)
		getChartData()
		setIsLoading(false)
	}, [])
	console.log("Is it loading?:", isLoading)
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<Bar dataKey="projects" fill="var(--color-projects)" radius={0} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="notices" fill="var(--color-notices)" radius={0} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="todos" fill="var(--color-todos)" radius={0} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="links" fill="var(--color-links)" radius={0} />
				<ChartTooltip content={<ChartTooltipContent />} />
			</BarChart>
		</ChartContainer>
	)
}

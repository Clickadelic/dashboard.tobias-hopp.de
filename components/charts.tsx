"use client";

import { type ChartConfig } from "@/components/ui/chart";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

import { useState, useEffect } from "react";

import { Project, Notice, Todo, Link } from "@prisma/client";

import { getProjectsByUserId } from "@/actions/project";
import { getNoticesByUserId } from "@/actions/notice";
import { getTodosByUserId } from "@/actions/todo";
import { getLinksByUserId } from "@/actions/link";

import { useTodosStore } from "@/hooks/use-todos-store";
import { useProjectsStore } from "@/hooks/use-projects-store";
import { useNoticesStore } from "@/hooks/use-notices-store";
import { useLinksStore } from "@/hooks/use-links-store";

export function Charts() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const projectCount = useProjectsStore<Project[]>(state => state.projects);
	const setProjectCount = useProjectsStore(state => state.setProjects);

	const noticeCount = useNoticesStore<Notice[]>(state => state.notices);
	const setNoticeCount = useNoticesStore(state => state.setNotices);

	const todoCount = useTodosStore<Todo[]>(state => state.todos);
	const setTodoCount = useTodosStore(state => state.setTodos);

	const linkCount = useLinksStore<Link[]>(state => state.links);
	const setLinkCount = useLinksStore(state => state.setLinks);

	const getChartData = async () => {
		setIsLoading(true);
		try {
			const projectResults = await getProjectsByUserId();
			setProjectCount(projectResults);
			const noticeResults = await getNoticesByUserId();
			setNoticeCount(noticeResults);
			const todoResults = await getTodosByUserId();
			setTodoCount(todoResults);
			const linkResults = await getLinksByUserId();
			setLinkCount(linkResults);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

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
	];

	const chartConfig = {
		projects: {
			label: "Projekte",
			color: "#1677ff"
		},
		todos: {
			label: "Todos",
			color: "#1677ff"
		},
		notices: {
			label: "Notizen",
			color: "#1677ff"
		},
		links: {
			label: "Links",
			color: "#1677ff"
		}
	} satisfies ChartConfig;

	useEffect(() => {
		setIsLoading(true);
		getChartData();
		setIsLoading(false);
	}, []);
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] flex justify-start items-start">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value.slice(0, 3)} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="projects" fill="var(--color-projects)" radius={4} />
				<Bar dataKey="notices" fill="var(--color-notices)" radius={4} />
				<Bar dataKey="todos" fill="var(--color-todos)" radius={4} />
				<Bar dataKey="links" fill="var(--color-links)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}

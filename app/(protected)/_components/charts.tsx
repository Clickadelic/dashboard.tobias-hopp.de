"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar } from "recharts";

import { type ChartConfig } from "@/components/ui/chart";
const chartData = [{ month: "July", links: 186 }];

const chartConfig = {
	links: {
		label: "Links",
		color: "#1677ff"
	}
} satisfies ChartConfig;

export const Charts = () => {
	return (
		<ChartContainer config={chartConfig} className="min-h-[100px] max-h-[352px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<Bar dataKey="links" fill="var(--color-desktop)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
};

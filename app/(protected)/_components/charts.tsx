"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar } from "recharts"

import { type ChartConfig } from "@/components/ui/chart"
const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 }
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#ccc"
	},
	mobile: {
		label: "Mobile",
		color: "#999"
	}
} satisfies ChartConfig

export const Charts = () => {
	return (
		<ChartContainer config={chartConfig} className="min-h-[100px] max-h-[352px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={2} />
				<Bar dataKey="mobile" fill="var(--color-mobile)" radius={2} />
			</BarChart>
		</ChartContainer>
	)
}

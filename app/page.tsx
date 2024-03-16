import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-900">
			<div className="space-y-6">
				<h1 className="text-6xl font-semibold text-white shadow-sm">🔒Auth</h1>
				<p className="text-white">A simple authentication service.</p>
			</div>
		</main>
	)
}

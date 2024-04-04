import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"
import { LoginForm } from "@/components/auth/login-form"

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
})

export default function Home() {
	return (
		<main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-900">
			<div className="space-y-6 text-center">
				<h1 className={cn("text-6xl font-semibold text-white", font.className)}>Dashboard</h1>
				<p className="text-white">Toby&apos;s Dashboard.</p>
				<div className="text-left">
					<LoginForm />
				</div>
			</div>
		</main>
	)
}

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
});

export default function Home() {
	return (
		<main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-900">
			<div className="space-y-6 text-center">
				<h1 className={cn("text-6xl font-semibold text-white shadow-sm", font.className)}>Dashboard</h1>
				<p className="text-white">Toby&apos;s Dashboard.</p>
				<LoginButton>
					<Button variant="secondary" size="lg">
						Login
					</Button>
				</LoginButton>
			</div>
		</main>
	);
}

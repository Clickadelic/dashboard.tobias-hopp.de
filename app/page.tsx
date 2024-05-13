import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
});

export default function Home() {
	return (
		<main className="flex flex-col h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-900">
			<div className="space-y-6 text-center">
				<h1 className={cn("text-3xl text-white", font.className)}>Toby&apos;s Dashboard</h1>
				<div className="text-left">
					<Suspense fallback={<div>Loading...</div>}>
						<LoginForm />
					</Suspense>
				</div>
			</div>
		</main>
	);
}

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
		<main className="flex flex-col h-full items-center justify-center bg-slate-800">
			<div className="space-y-6 text-center">
				<div className="text-left">
					<Suspense fallback={<div>Loading...</div>}>
						<LoginForm />
					</Suspense>
				</div>
			</div>
		</main>
	);
}

import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

// Test for build
const Home = () => {
	return (
		<main className="flex flex-col h-full items-center justify-center bg-slate-800">
			<div className="space-y-6 text-center">
				<div className="text-left">
					<Suspense fallback={<div className="text-white text-center">Loading...</div>}>
						<LoginForm />
					</Suspense>
				</div>
			</div>
		</main>
	);
};

export default Home;

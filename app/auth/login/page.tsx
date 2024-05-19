import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

const LoginPage = () => {
	return (
		<Suspense fallback={<div className="text-white text-center">Loading...</div>}>
			<LoginForm />
		</Suspense>
	);
};

export default LoginPage;

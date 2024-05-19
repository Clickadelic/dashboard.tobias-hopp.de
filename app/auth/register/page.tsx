import { RegisterForm } from "@/components/auth/register-form";
import { Suspense } from "react";

const RegisterPage = () => {
	return (
		<Suspense fallback={<div className="text-white text-center">Loading...</div>}>
			<RegisterForm />
		</Suspense>
	);
};

export default RegisterPage;

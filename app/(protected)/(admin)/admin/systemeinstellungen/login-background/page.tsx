import React from "react";
import { FormAuthScreenBgImageUpload } from "@/components/forms/form-auth-screen-bg-image-upload";

const LoginBackgroundUploadPage = () => {
	return (
		<div className="page-wrapper">
			<h2 className="text-md font-bold text-slate-700 mb-5">Login Background Upload</h2>
			<div className="bg-white rounded-xl shadow p-2 md:p-4">
				<p className="text-slate-500 mb-200 d-block">Lege das Login-Hintergrundbild fest, welches man bei dem Aufruf der Login-Seite sieht.</p>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
					<FormAuthScreenBgImageUpload />
				</div>
			</div>
		</div>
	);
};

export default LoginBackgroundUploadPage;

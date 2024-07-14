"use client";
import Image from "next/image";
const Error404Page = () => {
	return (
		<div className="bg-white rounded-lg p-2 md:p-4 py-12 flex flex-col justify-center items-center">
			<Image src="/images/svg/error-404.svg" className="mt-24 mb-12" width={300} height={300} alt="404" />
			<h1 className="text-6xl text-slate-400 font-bold my-5">Fehler 404</h1>
			<h2 className="my-3 text-slate-700">Diese Seite wurde entführt.</h2>
		</div>
	);
};

export default Error404Page;

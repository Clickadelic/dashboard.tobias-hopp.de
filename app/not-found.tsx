"use client"
import Image from "next/image"
const Error404Page = () => {
	return (
		<div className="flex flex-col items-center justify-center p-2 py-12 bg-white rounded-lg md:p-4">
			<Image src="/images/svg/error-404.svg" className="mt-24 mb-12" width={300} height={300} alt="404" />
			<h1 className="my-5 text-6xl font-bold text-slate-400">Fehler 404</h1>
			<h2 className="my-3 text-slate-700">Diese Seite wurde entführt.</h2>
		</div>
	)
}

export default Error404Page

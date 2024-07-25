import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { NextResponse } from "next/server"

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth(req => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	if (isApiAuthRoute) {
		return
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return
	}

	if (!isLoggedIn && !isPublicRoute) {
		let callBackUrl = nextUrl.pathname
		if (nextUrl.search) {
			callBackUrl += nextUrl.search
		}

		const encodedCallbackUrl = encodeURIComponent(callBackUrl)

		return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
	}

	return
})

export function middleware() {
	// retrieve the current response
	const res = NextResponse.next()

	// add the CORS headers to the response
	res.headers.append("Access-Control-Allow-Credentials", "true")
	res.headers.append("Access-Control-Allow-Origin", "https://dashboard.tobias-hopp.de") // replace this your actual origin
	res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT")
	res.headers.append("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version")

	return res
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}

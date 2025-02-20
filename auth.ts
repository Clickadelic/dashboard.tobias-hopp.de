import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { UserRole } from "@prisma/client"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"

import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error"
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() }
			})
		}
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== "credentials") return true

			const existingUser = await getUserById(user.id!)

			// Prevent Login without E-Mail verification
			if (!existingUser?.emailVerified) return false

			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

				if (!twoFactorConfirmation) return false

				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id }
				})
			}

			return true
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}

			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
			}

			if (session.user) {
				session.user.name = token.name
				session.user.bio = token.bio as string | null
				session.user.profileImage = token.profileImage as string | null
				session.user.backgroundImage = token.backgroundImage as string | null
				session.user.email = token.email!
				session.user.isOAuth = token.isOAuth as boolean
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			const existingAccount = await getAccountByUserId(existingUser.id)

			token.isOAuth = !!existingAccount
			token.name = existingUser.name
			token.bio = existingUser.bio
			token.profileImage = existingUser.profileImage
			token.backroundImage = existingUser.backgroundImage
			token.email = existingUser.email
			token.role = existingUser.role
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
			return token
		}
	},
	adapter: PrismaAdapter(db) as any,
	session: { strategy: "jwt" },
	...authConfig
})

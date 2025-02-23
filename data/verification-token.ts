import { db } from "@/lib/db"

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verficationToken = await db.verificationToken.findFirst({
			where: { token }
		})
		return verficationToken
	} catch (error) {
		return null
	}
}

/**
 * Retrieves a verification token from the database based on the provided email.
 *
 * @param {string} email - The email associated with the verification token.
 * @return {Promise<VerificationToken | null>} A promise that resolves to the verification token, or null if not found.
 */
export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verficationToken = await db.verificationToken.findFirst({
			where: { email }
		})
		return verficationToken
	} catch (error) {
		return null
	}
}

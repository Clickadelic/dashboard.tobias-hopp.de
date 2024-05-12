import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verficationToken = await db.verificationToken.findFirst({
			where: { token }
		});
	} catch (error) {
		return null;
	}
};

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verficationToken = await db.verificationToken.findFirst({
			where: { email }
		});
	} catch (error) {
		return null;
	}
};

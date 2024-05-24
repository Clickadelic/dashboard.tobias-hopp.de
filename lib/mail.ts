import { transporter } from "@/config"

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	try {
		const sendResult = await transporter.sendMail({
			sender: process.env.EMAIL_SENDER,
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "2FA-Code - Toby's Dashboard",
			html: `<h2>Dein 2-Faktor-Code: <code>${token}</code>.</h2>`
		})
		console.log(sendResult)
	} catch (error) {
		console.log(error)
	}
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = process.env.NEXT_PUBLIC_APP_URL + `/auth/new-password?token=${token}`

	try {
		const sendResult = await transporter.sendMail({
			sender: process.env.EMAIL_SENDER,
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Passwort zurücksetzen - Toby's Dashboard",
			html: `<p>Mit einem Klick auf den folgenden Link kannst Du Dein <a href="${resetLink}" title="Passwort zurücksetzen">Passwort zurücksetzen</a>.<p>`
		})
		console.log(sendResult)
	} catch (error) {
		console.log(error)
	}
}

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmationLink = process.env.NEXT_PUBLIC_APP_URL + `/auth/new-verification?token=${token}`

	try {
		const sendResult = await transporter.sendMail({
			sender: process.env.EMAIL_SENDER,
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Account-Bestätigung - Toby's Dashboard",
			html: `<p>Hi und danke für Deine Registrierung. Bitte aktivier Deinen Account mit einem Klick auf den folgenden <a href="${confirmationLink}" title="Please click here.">Link</a>.</p>`
		})
		console.log(sendResult)
	} catch (error) {
		console.log(error)
	}
}

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	},
	logger: true
})

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmationLink = process.env.NEXT_PUBLIC_APP_URL + `/auth/new-verification?token=${token}`
	try {
		const testresult = await transporter.verify()
		console.log(testresult)
	} catch (error) {
		console.log(error)
		return
	}

	try {
		const sendResult = await transporter.sendMail({
			sender: process.env.EMAIL_SENDER,
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "E-Mail Confirmation - Toby's Dashboard",
			html: `Please activate your account by clicking the following <a href="${confirmationLink}" title="Please click here.">confirmation-link.`
		})
		console.log(sendResult)
	} catch (error) {
		console.log(error)
	}
}

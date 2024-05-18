import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
	const { NEXT_PUBLIC_APP_URL, EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = process.env;

	const confirmationLink = NEXT_PUBLIC_APP_URL + `/auth/new-verification?token=${token}`;

	const transport = nodemailer.createTransport({
		host: EMAIL_HOST,
		port: 587,
		secure: false,
		requireTLS: true,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASS
		},
		logger: true
	});

	try {
		const testresult = await transport.verify();
		console.log(testresult);
	} catch (error) {
		console.log(error);
		return;
	}

	try {
		const sendResult = await transport.sendMail({
			from: EMAIL_FROM,
			to: "toby.hopp@gmail.com",
			subject: "Your dashboard registration.",
			html: `Please activate your account by clicking the following <a href="${confirmationLink}" title="Please click here.">confirmation-link.`
		});
		console.log(sendResult);
	} catch (error) {
		console.log(error);
	}
};

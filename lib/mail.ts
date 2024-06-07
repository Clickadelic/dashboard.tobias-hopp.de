import * as handlebars from "handlebars";
import { transporter } from "@/config";
import { accountConfirmationTemplate } from "./templates/account-confirmation";
import { passwordResetTemplate } from "./templates/password-reset";
import { twoFactorTokenTemplate } from "./templates/two-factor-token";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	const template = handlebars.compile(twoFactorTokenTemplate);
	/** Takes the token as parameter
	 * @param {string} token
	 */
	const html = template({ token });
	try {
		const sendResult = await transporter.sendMail({
			sender: process.env.EMAIL_SENDER,
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "2FA-Code - Toby's Dashboard",
			html: html
		});
		console.log(sendResult);
	} catch (error) {
		console.log(error);
	}
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = process.env.NEXT_PUBLIC_APP_URL + `/auth/new-password?token=${token}`;
	const template = handlebars.compile(passwordResetTemplate);
	/** Takes the resetLink as parameter
	 * @param {string} resetLink
	 */
	const html = template({ resetLink });
	try {
		const sendResult = await transporter.sendMail({
			sender: process.env.EMAIL_SENDER,
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Passwort zurücksetzen - Toby's Dashboard",
			html: html
		});
		console.log(sendResult);
	} catch (error) {
		console.log(error);
	}
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmationLink = process.env.NEXT_PUBLIC_APP_URL + `/auth/new-verification?token=${token}`;
	const template = handlebars.compile(accountConfirmationTemplate);
	/** Takes the name and the confirmationLink as parameters
	 * @param {string, string}
	 */
	const html = template({ confirmationLink });
	try {
		const sendResult = await transporter.sendMail({
			sender: process.env.EMAIL_SENDER,
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Account-Bestätigung - Toby's Dashboard",
			html: html
		});
		console.log(sendResult);
	} catch (error) {
		console.log(error);
	}
};

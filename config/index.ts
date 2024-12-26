import nodemailer from "nodemailer";

// Site Config
export const siteConfig = {
	name: "Toby's Dashboard",
	description: "Webdevelopment Central"
};

// Email Config
export const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS
	},
	logger: false
});

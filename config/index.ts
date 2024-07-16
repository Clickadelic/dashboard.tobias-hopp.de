import nodemailer from "nodemailer";
import { type ChartConfig } from "@/components/ui/chart";

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

// Chart color config
export const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb"
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa"
	}
} satisfies ChartConfig;

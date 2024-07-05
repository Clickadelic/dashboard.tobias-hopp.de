import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
	string = string.toLowerCase();
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function slugify(string: string) {
	string = string
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
	return string;
}

export function germanDateFormat(date: Date | string) {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
		timeZoneName: "short"
	};

	// Ensure date is a Date object
	const dateObj = typeof date === "string" ? new Date(date) : date;

	// Check if the date is valid
	if (isNaN(dateObj.getTime())) {
		throw new Error("Invalid date format");
	}

	const germanDate = new Intl.DateTimeFormat("de-DE", options).format(dateObj).replace(" um", " ").replace(" UTC", " Uhr");

	return germanDate;
}

export function getFavicon(url: string) {
	return `https://www.google.com/s2/favicons?domain=${url}&sz=24`;
}

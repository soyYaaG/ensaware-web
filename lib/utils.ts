import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { date, queryParameters } from "@/entities";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDate(value: date) {
	if (!value.date) return "";

	let date = value.date;
	if (date[date.length - 1]?.toUpperCase() !== "Z") {
		date += "Z";
	}

	let newDate = new Date(date);

	if (value.displayTime) {
		return newDate.toLocaleDateString(value.lang, {
			dateStyle: "full",
		});
	} else return newDate.toLocaleDateString(value.lang);
}

export function getPaginationQueryParameter(query: string | undefined) {
	let result: queryParameters;

	if (!query) {
		result = { size: 10, page: 1 };
		return result;
	}

	const searchParams = new URLSearchParams(query.split("?")[1]);

	result = {
		size: Number(searchParams.get("size")) || 50,
		page: Number(searchParams.get("page")) || 1,
	};

	return result;
}

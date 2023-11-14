import { defaultLang, ui } from ".";

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

type IDate = {
	date: string;
	lang?: keyof typeof ui;
	displayTime?: boolean;
};

export function getDate(value: IDate) {
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

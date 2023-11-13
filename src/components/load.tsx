import { Loader2 } from "lucide-react";
import { getUrl } from "../lib";
import { getLangFromUrl, useTranslations, type Components } from "../i18n";

export const Load = () => {
	const url = getUrl();
	const lang = getLangFromUrl(url);
	const t = useTranslations(lang);
	const { load } = t("components") as Components;

	return (
		<div className="bg-zinc-300 bg-opacity-50 fixed bottom-0 left-0 right-0 top-0 z-10 flex flex-col justify-center items-center h-screen">
			<b className="text-2xl md:text-4xl mb-4">{load.defaultText}</b>
			<Loader2 className="mr-2 h-16 w-16 animate-spin" />
		</div>
	);
};

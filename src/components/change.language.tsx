import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../components/ui";
import { getUrl } from "../lib";
import { getLangFromUrl, useTranslations, type Components } from "../i18n";

export const ChangeLanguage = () => {
	const url = getUrl();
	const lang = getLangFromUrl(url);
	const t = useTranslations(lang);

	const [language, setLanguage] = useState<string>(lang);
	const [, replaceLang] = url.pathname.split("/");
	const { changeLanguage } = t("components") as Components;

	useEffect(() => {
		if (language !== replaceLang) {
			setLanguage(language);
			const redirect = url.href.replace(replaceLang, language);
			location.href = redirect;
		}
	}, [language]);

	return (
		<aside className="flex text-xs text-zinc-700 text-right fixed bottom-0 right-0 mr-2 mb-1 items-center cursor-pointer">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="link">
						<Languages className="mr-1 h-4 w-4" />
						{changeLanguage.button}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuRadioGroup
						value={language}
						onValueChange={setLanguage}
					>
						<DropdownMenuRadioItem value="es">
							🇨🇴 {changeLanguage.spanish}
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="en">
							🇺🇸 {changeLanguage.english}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</aside>
	);
};

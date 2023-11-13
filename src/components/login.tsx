import { LogIn } from "lucide-react";
import type { IToken, IUser } from "../entities";
import { getLangFromUrl, useTranslations, type Pages } from "../i18n";
import { DataBaseKeys, getUrl, save } from "../lib";
import { login } from "../services";
import { me } from "../services/user.service";

export const Login = () => {
	const url = getUrl();
	const lang = getLangFromUrl(url);
	const t = useTranslations(lang);
	const { index } = t("pages") as Pages;

	const handleClick = () => {
		login("google");
	};

	const urlSearchParams = new URLSearchParams(url.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	const { project, refresh_token, token, token_type } = params;

	if (project && refresh_token && token && token_type) {
		const tokenValue: IToken = {
			id: `${project}TokenId`,
			refresh_token: refresh_token,
			token: token,
			token_type: token_type,
		};

		save<IToken>(DataBaseKeys.TOKEN, tokenValue).then(async () => {
			const response = await me();
			await save<IUser>(DataBaseKeys.USER, response);

			location.href = `/${lang}/app`;
		});
	}

	return (
		<button
			className="flex flex-row justify-center bg-primary hover:bg-purple-700 p-4 rounded-lg cursor-pointer w-full md:w-1/2 text-white"
			id="btnLogin"
			onClick={handleClick}
		>
			<LogIn className="w-6 h-6 mr-4" />
			{index.button}
		</button>
	);
};

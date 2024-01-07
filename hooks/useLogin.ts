import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { login, me } from "@/services";
import { DataBaseKeys, get as getData, save } from "@/lib";
import { token, user } from "@/entities";

export const useLogin = () => {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const { get } = useSearchParams();

	const project = get("project");
	const refreshToken = get("refresh_token");
	const tokenValue = get("token");
	const tokenType = get("token_type");

	const saveToken = (tokenData: token) => {
		save<token>(DataBaseKeys.TOKEN, tokenData).then(() => {
			return;
		});
	};

	const saveUser = async () => {
		me().then((response: user) => {
			save<user>(DataBaseKeys.USER, response).then(() => {
				return;
			});
		});
	};

	const handleLoginClick = () => {
		login("google");
	};

	if (project && refreshToken && tokenValue && tokenType) {
		const tokenData: token = {
			id: `${project}TokenId`,
			refresh_token: refreshToken,
			token: tokenValue,
			token_type: tokenType,
		};

		saveToken(tokenData);
		saveUser();
	}

	useEffect(() => {
		const getToken = async () => {
			const tokenData = await getData<token>(DataBaseKeys.TOKEN);
			if (tokenData) {
				setIsLogged(true);
			}
		};

		getToken();
	}, []);

	return {
		handleLoginClick,
		isLogged,
	};
};

import { token } from "@/entities";
import {
	LocalStorageKeys,
	fetchInterceptor,
	getInLocalStorage,
	requestPath,
	urlBuilder,
} from "@/lib";

export const login = (provider: string) => {
	let url: string = urlBuilder.services(requestPath.authorization, {
		provider: provider,
		version: "v1",
	});

	window.location.href = url;
};

export const refreshToken = async (provider: string) => {
	const tokenData: token = getInLocalStorage(LocalStorageKeys.TOKEN) as token;

	let url: string = urlBuilder.services(requestPath.authorization, {
		provider: provider,
		version: "v1",
	});

	url = `${url}/refresh/token`;

	const response = await fetchInterceptor(url, {
		body: JSON.stringify({
			refresh_token: tokenData.refresh_token,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	return (await response.json()) as token;
};

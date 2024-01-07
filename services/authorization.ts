import { token } from "@/entities";
import {
	DataBaseKeys,
	fetchInterceptor,
	get,
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
	const token: token | null = await get<token>(DataBaseKeys.TOKEN);

	let url: string = urlBuilder.services(requestPath.authorization, {
		provider: provider,
		version: "v1",
	});

	url = `${url}/refresh/token`;

	const response = await fetchInterceptor(url, {
		body: JSON.stringify({
			refresh_token: token?.refresh_token,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	return await response.json();
};

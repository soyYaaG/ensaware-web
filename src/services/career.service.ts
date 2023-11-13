import type { ICareer } from "../entities";
import { fetchInterceptor, requestPath, urlBuilder } from "../lib";

export const allCareer = async () => {
	let url: string = urlBuilder.services(requestPath.career, {
		version: "v1",
	});

	url = `${url}/all`;

	const response = await fetchInterceptor(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "GET",
	});

	return (await response.json()) as ICareer[] | null;
};

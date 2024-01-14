import { profile } from "@/entities";
import { fetchInterceptor, requestPath, urlBuilder } from "@/lib";

export const allProfiles = async () => {
	let url: string = urlBuilder.services(requestPath.profile, {
		version: "v1",
	});

	url = `${url}`;

	const response = await fetchInterceptor(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "GET",
	});

	return (await response.json()) as profile[] | null;
};

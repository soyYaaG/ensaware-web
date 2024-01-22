import { fetchInterceptor, requestPath, urlBuilder } from "@/lib";

export const getQrUser = async (userId?: string) => {
	let url: string = urlBuilder.services(requestPath.qr, {
		version: "v1",
	});

	url += "/user";

	if (userId) url += `/${userId}`;

	const response = await fetchInterceptor(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const blob = await response.blob();
	const newBlob = new Blob([blob]);

	return newBlob;
};

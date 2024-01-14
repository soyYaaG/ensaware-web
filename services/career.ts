import { career } from "@/entities";
import { fetchInterceptor, requestPath, urlBuilder } from "@/lib";

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

	return (await response.json()) as career[] | null;
};

export const createCareer = async (career: career) => {
	let url: string = urlBuilder.services(requestPath.career, {
		version: "v1",
	});

	const response = await fetchInterceptor(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(career),
	});

	return (await response.json()) as career;
};

export const deleteCareer = async (id: string) => {
	let url: string = urlBuilder.services(requestPath.career, {
		version: "v1",
	});

	url = `${url}/${id}`;

	await fetchInterceptor(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "DELETE",
	});
};

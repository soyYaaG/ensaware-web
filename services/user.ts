import { queryParameters, user, userPagination } from "@/entities";
import { fetchInterceptor, requestPath, urlBuilder } from "@/lib";

export const allUsers = async (
	query: queryParameters = { page: 1, size: 20 }
) => {
	let url: string = urlBuilder.services(requestPath.user, {
		version: "v1",
	});

	url = `${url}/see/all?page=${query.page}&size=${query.size}`;

	const response = await fetchInterceptor(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "GET",
	});

	return (await response.json()) as userPagination | null;
};

export const deleteUser = async (id: string) => {
	let url: string = urlBuilder.services(requestPath.user, {
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

export const getUser = async (id: string) => {
	let url: string = urlBuilder.services(requestPath.user, {
		version: "v1",
	});

	url = `${url}/${id}`;

	const response = await fetchInterceptor(url, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "GET",
	});

	try {
		return (await response.json()) as user;
	} catch {
		return null;
	}
};

export const me = async () => {
	let url: string = urlBuilder.services(requestPath.user, {
		version: "v1",
	});

	const response = await fetchInterceptor(url, {
		method: "GET",
	});

	return (await response.json()) as user;
};

export const updateCareer = async (career_id: string) => {
	let url: string = urlBuilder.services(requestPath.user, {
		version: "v1",
	});

	const response = await fetchInterceptor(url, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			career_id: career_id,
		}),
	});

	return (await response.json()) as user;
};

export const updateUserCareer = async (userId: string, careerId: string) => {
	let url: string = urlBuilder.services(requestPath.user, {
		version: "v1",
	});

	url = `${url}/${userId}`;

	const response = await fetchInterceptor(url, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			career_id: careerId,
		}),
	});

	return (await response.json()) as user;
};

export const updateUserProfile = async (userId: string, profileId: string) => {
	let url: string = urlBuilder.services(requestPath.user, {
		version: "v1",
	});

	url = `${url}/${userId}`;

	const response = await fetchInterceptor(url, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			profile_id: profileId,
		}),
	});

	return (await response.json()) as user;
};

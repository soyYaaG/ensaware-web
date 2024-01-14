import { permissionProfile } from "@/entities";
import {
	LocalStorageKeys,
	fetchInterceptor,
	getInLocalStorage,
	requestPath,
	urlBuilder,
} from "@/lib";

export const getPermissionProfile = async (id: string) => {
	let url: string = urlBuilder.services(requestPath.permission, {
		version: "v1",
	});

	url += `/${id}`;

	const response = await fetchInterceptor(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return (await response.json()) as permissionProfile[];
};

export const getAllPermissions = () => {
	const permissionProfile: permissionProfile[] | null = getInLocalStorage(
		LocalStorageKeys.PERMISSION_PROFILE
	) as permissionProfile[] | null;

	return permissionProfile;
};

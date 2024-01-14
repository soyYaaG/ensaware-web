export enum LocalStorageKeys {
	PERMISSION_PROFILE = "permissionProfile",
	TOKEN = "token",
	USER = "user",
}

export const saveInLocalStorage = (key: string, value: string) => {
	if (typeof window === "undefined") return;

	window.localStorage.setItem(key, value);
};

export const getInLocalStorage = (key: string) => {
	if (typeof window === "undefined") return null;

	const result = window.localStorage.getItem(key) || null;
	return result ? JSON.parse(result) : null;
};

export const clearLocalStorage = () => {
	if (typeof window === "undefined") return;

	window.localStorage.clear();
};

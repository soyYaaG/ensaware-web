import { token, user } from "@/entities";
import { refreshToken } from "../services";
import { LocalStorageKeys, getInLocalStorage, saveInLocalStorage } from ".";

export const fetchInterceptor = async (
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> => {
	let response: Response;

	if (typeof input === "string" && input.includes("authorization") && init)
		response = await fetch(input, init);
	else if (typeof input === "string" && input.includes("authorization"))
		response = await fetch(input);
	else {
		const updateInit = updateHeader(init);
		response = await fetch(input, updateInit);
	}

	if (response.ok) {
		return response;
	} else {
		return handleFetchError(response, input, init);
	}
};

const updateHeader = (request?: RequestInit): RequestInit | undefined => {
	const tokenData: token | null = getInLocalStorage(
		LocalStorageKeys.TOKEN
	) as token | null;

	return {
		...request,
		headers: {
			...request?.headers,
			Authorization: `${tokenData?.token_type} ${tokenData?.token}`,
		},
	};
};

const getRefreshToken = async () => {
	const userData: user | null = getInLocalStorage(
		LocalStorageKeys.USER
	) as user | null;
	const tokenData: token | null = getInLocalStorage(
		LocalStorageKeys.TOKEN
	) as token | null;

	if (!userData) {
		return;
	}

	const response = (await refreshToken(userData?.provider)) as token;
	response.id = tokenData?.id;
	saveInLocalStorage(LocalStorageKeys.TOKEN, JSON.stringify(response));
};

const handleFetchError = async (
	error: Response,
	input: RequestInfo | URL,
	init?: RequestInit
) => {
	const messageError = "Ha ocurrido un error, ¡por favor intenta nuevamente!";

	if (error.status === 401) {
		const responseData = await error.json();
		if (responseData.message.toLowerCase() === "token expirado.") {
			await getRefreshToken();
			await fetchInterceptor(input, init);
			location.reload();
		}
	}

	let message: string = messageError;

	try {
		const responseData = await error.json();
		if (responseData.message) {
			message = responseData.message;
		}
	} catch (e) {
		throw e;
	}

	throw message;
};

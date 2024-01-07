import { token, user } from "@/entities";
import { DataBaseKeys, get, save } from ".";
import { refreshToken } from "../services";

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
		const updateInit = await updateHeader(init);
		response = await fetch(input, updateInit);
	}

	if (response.ok) {
		return response;
	} else {
		return handleFetchError(response, input, init);
	}
};

const updateHeader = async (
	request?: RequestInit
): Promise<RequestInit | undefined> => {
	const token: token | null = await get<token>(DataBaseKeys.TOKEN);

	return {
		...request,
		headers: {
			...request?.headers,
			Authorization: `${token?.token_type} ${token?.token}`,
		},
	};
};

const getRefreshToken = async () => {
	const user: user | null = await get<user>(DataBaseKeys.USER);
	const token: token | null = await get<token>(DataBaseKeys.TOKEN);

	if (!user) {
		return;
	}

	const response = (await refreshToken(user?.provider)) as token;
	response.id = token?.id;
	await save<token>(DataBaseKeys.TOKEN, response);
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

import type { IToken, IUser } from "../entities";
import { refreshToken } from "../services";
import { DataBaseKeys, get, save } from "./database";

export const fetchInterceptor = async (
	input: RequestInfo | URL,
	init?: RequestInit,
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
		return handleFetchError(response);
	}
};

const updateHeader = async (
	request?: RequestInit,
): Promise<RequestInit | undefined> => {
	const token: IToken | null = await get<IToken>(DataBaseKeys.TOKEN);

	return {
		...request,
		headers: {
			...request?.headers,
			Authorization: `${token?.token_type} ${token?.token}`,
		},
	};
};

const getRefreshToken = async () => {
	const user: IUser | null = await get<IUser>(DataBaseKeys.USER);
	const token: IToken | null = await get<IToken>(DataBaseKeys.TOKEN);

	if (!user) {
		return;
	}

	const response = (await refreshToken(user?.provider)) as IToken;
	response.id = token?.id;
	await save<IToken>(DataBaseKeys.TOKEN, response);
};

const handleFetchError = async (error: Response) => {
	const messageError = "Ha ocurrido un error, ¡por favor intenta nuevamente!";

	if (error.status === 401) {
		const responseData = await error.json();
		if (responseData.message.toLowerCase() === "token expirado.") {
			await getRefreshToken();
			// toast.success(
			// 	"Token actualizado. Por favor intenta nuevamente.",
			// );
			throw messageError;
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

import { parseTemplate } from "url-template";

export const urlBuilder = {
	services(url: string, option = {}): string {
		const serveUrl = getServicesUrl(url);
		return parseTemplate(serveUrl).expand(option);
	},
};

function getServicesUrl(url: string): string {
	return import.meta.env.PUBLIC_API_ENSAWARE + url;
}

export const requestPath = {
	authorization: "/{version}/authorization/{provider}",
	career: "/{version}/career",
	user: "/{version}/user",
}

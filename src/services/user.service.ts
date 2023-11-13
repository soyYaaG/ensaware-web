import type { IUser } from "../entities";
import { fetchInterceptor, requestPath, urlBuilder } from "../lib";

export const me = async() => {
    let url: string = urlBuilder.services(requestPath.user, {
        version: 'v1'
    });

    const response = await fetchInterceptor(url, {
		method: "GET"
	})

	return await response.json() as IUser;
}

// export const updateCareer = async(career_id: string) => {
// 	let url: string = urlBuilder.services(requestPath.user, {
//         version: 'v1'
//     });

// 	const response = await fetchInterceptor(url, {
// 		method: "POST",
// 		body: JSON.stringify({
// 			refresh_token: token?.refresh_token,
// 		})
// 	})

// 	return await response.json();
// }

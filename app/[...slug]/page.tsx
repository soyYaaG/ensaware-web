"use client";

import { useAuthContext } from "@/contexts/authContext";
import { token } from "@/entities";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Token() {
	const { isLoggedIn, login } = useAuthContext();
	const { get } = useSearchParams();

	const project = get("project");
	const refreshToken = get("refresh_token");
	const tokenValue = get("token");
	const tokenType = get("token_type");

	if (project && refreshToken && tokenValue && tokenType) {
		const tokenData: token = {
			id: `${project}TokenId`,
			refresh_token: refreshToken,
			token: tokenValue,
			token_type: tokenType,
		};

		login(tokenData);
	}

	useEffect(() => {
		if (isLoggedIn) redirect("/app");
	}, [isLoggedIn]);

	return null;
}

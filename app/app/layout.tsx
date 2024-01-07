"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { isLogged } = useLogin();
	const router = useRouter();

	useEffect(() => {
		const redirect = isLogged ? "/app" : "/";
		router.push(redirect);
	}, [isLogged, router]);

	return <main>{children}</main>;
}

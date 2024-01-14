"use client";

import Image from "next/image";
import { FormInput, LogIn } from "lucide-react";

import loginEnsaware from "../public/img/login-ensaware.jpg";
import ensaware from "../public/img/ensaware.png";

import { Button } from "@/components/ui";
import { useLogin } from "@/hooks";
import { redirect } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import { useEffect } from "react";

export default function Login() {
	const { isLoggedIn } = useAuthContext();
	const { handleLoginClick } = useLogin();

	useEffect(() => {
		if (isLoggedIn) {
			redirect("/app");
		}
	}, [isLoggedIn]);

	return (
		<main className="h-screen flex flex-row">
			<aside className="hidden md:flex w-1/2">
				<Image
					className="object-cover w-full;"
					src={loginEnsaware}
					alt="Un móvil con un código QR sostenido por una persona en su mano."
					priority={true}
				/>
			</aside>

			<section className="flex flex-col items-center justify-center p-4 w-full md:w-1/2">
				<h1 className="text-5xl mb-10">Ensaware</h1>

				<div className="flex flex-row mb-10 text-3xl text-gray-700 items-center">
					<FormInput className="mr-4" />
					<h2>Iniciar Sesión</h2>
				</div>

				<Image
					className="mb-10"
					height="250"
					src={ensaware}
					alt="Logo de la Corporación Universitaria Americana."
					width="250"
					priority={false}
				/>

				<p className="mb-10">
					La aplicación Ensaware solo permite iniciar sesión con el correo
					electrónico institucional.
				</p>

				<Button
					className="hover:bg-purple-700 p-4 rounded-lg w-full md:w-1/2"
					onClick={handleLoginClick}
				>
					<LogIn className="w-6 h-6 mr-4" />
					Iniciar Sesión
				</Button>
			</section>
		</main>
	);
}

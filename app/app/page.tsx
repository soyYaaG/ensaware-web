"use client";

import { useAuthContext } from "@/contexts/authContext";
import ensaware from "@/public/img/ensaware.png";
import Image from "next/image";

export default function App() {
	const { authUser } = useAuthContext();

	return (
		<>
			<h1 className="text-xl md:text-4xl">
				Bienvenido (a), {authUser?.display_name}
			</h1>

			<Image
				className="mb-10 mx-auto my-0 w-1/2"
				src={ensaware}
				alt="Logo de la aplicación Ensaware."
				priority={true}
			/>

			<p>Aplicación desarrollada por los estudiantes:</p>

			<ul className="my-4 list-disc">
				<li className="mx-8 md:mx-16">Yerson Alexander Arredondo García</li>
				<li className="mx-8 md:mx-16">Cristian Alexander Corre Herrera</li>
				<li className="mx-8 md:mx-16">Juan Diego Chaparro Lozano</li>
			</ul>

			<p>
				como proyecto del <b>diplomado de seguridad</b>.
			</p>
		</>
	);
}

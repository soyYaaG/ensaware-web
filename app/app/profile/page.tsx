"use client";

import { SelectData } from "@/components/selectData";
import { Picture } from "@/components/picture";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from "@/components/ui";
import { useAuthContext } from "@/contexts/authContext";
import { useCareer } from "@/hooks/useCareer";
import { getDate } from "@/lib";
import { Download, GraduationCap } from "lucide-react";
import { Load } from "@/components/load";
import { useUsers } from "@/hooks";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Profile() {
	const [qr, setQr] = useState<string>("");
	const { authUser, isLoad } = useAuthContext();
	const { career, onValueChange, selectCareerData, update } = useCareer();
	const { getQr } = useUsers(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await getQr();
			if (!response) return;

			const blobUrl = URL.createObjectURL(response);
			setQr(blobUrl);
		};

		fetchData();
	}, []);

	return (
		<>
			{isLoad && <Load />}
			<Card className="mt-4 relative">
				<CardHeader>
					<CardTitle>Mi perfil</CardTitle>
					<CardDescription>
						Información de la persona que ha iniciado sesión.
					</CardDescription>
					<CardDescription>
						Última fecha de actualización:{" "}
						{authUser?.modified
							? getDate({
									date: authUser?.modified || "",
									displayTime: true,
									lang: "es",
							  })
							: "Sin actualización."}
					</CardDescription>
					<section className="absolute top-0 right-0 border mr-4 rounded-sm h-64 w-64 hidden md:flex flex-col justify-center items-center">
						{qr && (
							<>
								<Image
									src={qr}
									priority={false}
									alt="Código QR"
									width="200"
									height="200"
								/>
								<Button
									className="bg-secondary text-slate-900 hover:bg-slate-300"
									onClick={() => {
										let tempLink = document.createElement("a");
										tempLink.href = qr;
										tempLink.setAttribute("download", "qrCode.png");
										tempLink.click();
									}}
								>
									<Download className="mr-2 w-4 h-4" />
									Descargar
								</Button>
							</>
						)}
					</section>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center my-4">
						<Picture
							alt={authUser?.display_name}
							className="h-32 w-32"
							src={authUser?.picture}
						/>
					</div>

					<div className="flex flex-col w-full">
						<div className="grid gap-1.5 my-4">
							<Label htmlFor="displayName">Nombre completo</Label>
							<Input
								disabled
								type="text"
								id="displayName"
								placeholder="Nombre completo"
								value={authUser?.display_name ?? ""}
								autoComplete="off"
							/>
						</div>

						<div className="grid gap-1.5 my-4">
							<Label htmlFor="email">Correo electrónico</Label>
							<Input
								disabled
								type="email"
								id="email"
								placeholder="Correo electrónico"
								value={authUser?.email ?? ""}
								autoComplete="off"
							/>
						</div>

						<div className="grid gap-1.5 my-4">
							<p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
								Seleccionar carrera
							</p>
							{authUser?.career ? (
								<Input
									disabled
									type="text"
									id="career"
									placeholder="Seleccionar carrera"
									value={authUser?.career?.name}
									autoComplete="off"
								/>
							) : (
								<SelectData
									className="w-full break-words whitespace-pre-wrap text-[0.6rem] md:text-sm text-left"
									placeholder="Seleccionar carrera"
									data={selectCareerData}
									defaultValue={career}
									onValueChange={onValueChange}
								/>
							)}
						</div>

						<div className="grid gap-1.5 my-4">
							<Label htmlFor="creationDate">Fecha de creación</Label>
							<Input
								disabled
								type="text"
								id="creationDate"
								placeholder="Fecha de creación"
								value={getDate({
									date: authUser?.created || "",
									displayTime: true,
									lang: "es",
								})}
								autoComplete="off"
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center md:justify-end">
					<Button
						className="hover:bg-purple-700"
						onClick={async () => {
							await update();
						}}
						disabled={!!authUser?.career}
					>
						<GraduationCap className="mr-2" />
						Actualizar datos
					</Button>
				</CardFooter>
			</Card>
		</>
	);
}

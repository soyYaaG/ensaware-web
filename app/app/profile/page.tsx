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
import { GraduationCap } from "lucide-react";
import { Load } from "@/components/load";

export default function Profile() {
	const { authUser, isLoad } = useAuthContext();
	const { career, onValueChange, selectCareerData, update } = useCareer();

	return (
		<>
			{isLoad && <Load />}
			<Card className="mt-4">
				<CardHeader>
					<CardTitle>Mi perfil</CardTitle>
					<CardDescription>
						Información de la persona que ha iniciado sesión.
					</CardDescription>
					<CardDescription>
						Última fecha de actualización:
						{authUser?.modified
							? getDate({
									date: authUser?.modified || "",
									displayTime: true,
									lang: "es",
							  })
							: "Sin actualización."}
					</CardDescription>
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
						onClick={update}
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

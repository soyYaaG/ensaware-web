"use client";

import { Load } from "@/components/load";
import { Picture } from "@/components/picture";
import { SelectData } from "@/components/selectData";
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
import { useCareer, useProfile, useUsers } from "@/hooks";
import { getDate } from "@/lib";
import { GraduationCap } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditUser() {
	const { authPermission, authUser, isLoad } = useAuthContext();
	const { career, onValueChange, selectCareerData, update } = useCareer();
	const { profile, selectProfilesData, onValueChangeProfile } = useProfile();
	const { getUserData, user } = useUsers();
	const params = useParams();
	const id = params.id || "";
	const router = useRouter();

	useEffect(() => {
		let value = "";
		if (Array.isArray(id)) value = id[0];
		else value = id;

		getUserData(value);
	}, []);

	return (
		<>
			{isLoad && <Load />}
			{!user && <div className="flex justify-center">Sin datos.</div>}
			{user && (
				<Card className="mt-4">
					<CardHeader>
						<CardTitle>Editar Usuario</CardTitle>
						<CardDescription>
							Fecha de creación:{" "}
							{getDate({
								date: user.created,
								displayTime: true,
								lang: "es",
							})}
						</CardDescription>
						<CardDescription>
							Última fecha de actualización
							{user?.modified
								? getDate({
										date: user?.modified || "",
										displayTime: true,
										lang: "es",
								  })
								: "Sin actualización."}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-center my-4">
							<Picture className="h-32 w-32" src={user?.picture} />
						</div>

						<div className="flex flex-col w-full">
							<div className="grid gap-1.5 my-4">
								<Label htmlFor="displayName">Nombre Completo</Label>
								<Input
									disabled
									type="text"
									id="displayName"
									placeholder="Nombre completo"
									value={user?.display_name ?? ""}
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
									value={user?.email ?? ""}
									autoComplete="off"
								/>
							</div>

							<div className="grid gap-1.5 my-4">
								<p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									Seleccionar carrera
								</p>
								<SelectData
									className="w-full break-words whitespace-pre-wrap text-[0.6rem] md:text-sm text-left"
									placeholder="Seleccionar carrera"
									data={selectCareerData}
									defaultValue={career}
									onValueChange={onValueChange}
								/>
								<p className="text-xs text-slate-400">
									Carrera actual: {user.career?.name}
								</p>
							</div>

							<div className="grid gap-1.5 my-4">
								<p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									Seleccionar Perfil
								</p>
								<SelectData
									className="w-full break-words whitespace-pre-wrap text-[0.6rem] md:text-sm text-left"
									placeholder="Seleccionar carrera"
									data={selectProfilesData}
									defaultValue={profile}
									onValueChange={onValueChangeProfile}
								/>
								<p className="text-xs text-slate-400">
									Perfil actual: {user.profile?.name}
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center md:justify-end">
						{authPermission &&
							authPermission["user:update"] &&
							user.id !== authUser?.id && (
								<Button
									className="hover:bg-purple-700"
									onClick={async () => {
										await update(user.id);
										router.push("/app/users");
									}}
								>
									<GraduationCap className="mr-2" />
									Actualizar
								</Button>
							)}
					</CardFooter>
				</Card>
			)}
		</>
	);
}

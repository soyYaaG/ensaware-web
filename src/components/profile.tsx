import { useStore } from "@nanostores/react";
import { GraduationCap } from "lucide-react";
import { useEffect } from "react";
import { CustomSelect, Load } from ".";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from "./ui";
import { $userStore, setDefaultValue, setSelectData } from "../store";
import type { ICareer, ISelectData } from "../entities";
import { allCareer } from "../services";
import { $isLoad, setLoad } from "../store";

export const CustomProfile = () => {
	const isLoad = useStore($isLoad);
	const user = useStore($userStore);

	useEffect(() => {
		const fetchData = async () => {
			setLoad(true);
			try {
				const careerData: ICareer[] | null = await allCareer();
				const selectData: ISelectData[] | undefined = careerData?.map(
					(item: ICareer): ISelectData => {
						return {
							key: item.id,
							value: item.name,
						};
					},
				);

				if (selectData) {
					setSelectData(selectData);
				}
			} catch {
				console.log("Error");
			} finally {
				setLoad(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		setDefaultValue(user?.career?.id || "");
	}, [user?.career?.id]);

	return (
		<>
			{isLoad && <Load />}
			<Card className="mt-4">
				<CardHeader>
					<CardTitle>Mi perfil</CardTitle>
					<CardDescription>
						Información de la persona que ha iniciado sesión.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center my-4">
						<Avatar className="h-32 w-32">
							<AvatarImage
								src={
									user?.picture ??
									"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLWNpcmNsZS0yIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4="
								}
								alt={user?.display_name}
							/>
							<AvatarFallback>Foto de perfil</AvatarFallback>
						</Avatar>
					</div>

					<div className="flex flex-col w-full">
						<div className="grid gap-1.5 my-4">
							<Label htmlFor="displayName">Nombre completo</Label>
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
								Seleccionar carrera:
							</p>
							{user?.career ? (
								<Input
									disabled
									type="text"
									id="career"
									placeholder="Correo electrónico"
									value={user?.career.name}
									autoComplete="off"
								/>
							) : (
								<CustomSelect
									className="w-full break-words whitespace-pre-wrap text-[0.6rem] md:text-sm text-left"
									placeholder="Seleccionar carrera..."
								/>
							)}
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center md:justify-end">
					<Button className="hover:bg-purple-700">
						<GraduationCap className="mr-2" />
						Actualizar datos
					</Button>
				</CardFooter>
			</Card>
		</>
	);
};

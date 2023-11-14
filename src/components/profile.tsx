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
	useToast,
} from "./ui";
import {
	$defaultSelectValue,
	$userStore,
	setDefaultValue,
	setSelectData,
} from "../store";
import type { ICareer, ISelectData, IUser } from "../entities";
import { allCareer, updateCareer } from "../services";
import { $isLoad, setLoad } from "../store";
import { DataBaseKeys, getUrl, save } from "../lib";
import {
	getLangFromUrl,
	useTranslations,
	type Components,
	getDate,
} from "../i18n";

export const CustomProfile = () => {
	const isLoad = useStore($isLoad);
	const user = useStore($userStore);
	const career = useStore($defaultSelectValue);
	const { toast } = useToast();
	const url = getUrl();
	const lang = getLangFromUrl(url);
	const t = useTranslations(lang);
	const { profile } = t("components") as Components;

	useEffect(() => {
		const fetchData = async () => {
			setLoad(true);
			try {
				if (user?.career) {
					return;
				}

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
			} catch (error: any) {
				toast({
					description: error,
				});
			} finally {
				setLoad(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		setDefaultValue(user?.career?.id || "");
	}, [user?.career?.id]);

	const btnUpdateCareer = async () => {
		setLoad(true);
		try {
			const response: IUser | null = await updateCareer(career);
			await save<IUser>(DataBaseKeys.USER, response);
		} catch (error: any) {
			toast({
				description: error,
			});
		} finally {
			setLoad(false);
		}
	};

	return (
		<>
			{isLoad && <Load />}
			<Card className="mt-4">
				<CardHeader>
					<CardTitle>{profile.title}</CardTitle>
					<CardDescription>{profile.description}</CardDescription>
					<CardDescription>
						{profile.date}
						{user?.modified
							? getDate({
									date: user?.modified || "",
									displayTime: true,
									lang: lang,
							  })
							: profile.noDate}
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
							<AvatarFallback>enw</AvatarFallback>
						</Avatar>
					</div>

					<div className="flex flex-col w-full">
						<div className="grid gap-1.5 my-4">
							<Label htmlFor="displayName">
								{profile.fullName}
							</Label>
							<Input
								disabled
								type="text"
								id="displayName"
								placeholder={profile.fullName}
								value={user?.display_name ?? ""}
								autoComplete="off"
							/>
						</div>

						<div className="grid gap-1.5 my-4">
							<Label htmlFor="email">{profile.email}</Label>
							<Input
								disabled
								type="email"
								id="email"
								placeholder={profile.email}
								value={user?.email ?? ""}
								autoComplete="off"
							/>
						</div>

						<div className="grid gap-1.5 my-4">
							<p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
								{profile.selectCareer}
							</p>
							{user?.career ? (
								<Input
									disabled
									type="text"
									id="career"
									placeholder={profile.selectCareer}
									value={user?.career.name}
									autoComplete="off"
								/>
							) : (
								<CustomSelect
									className="w-full break-words whitespace-pre-wrap text-[0.6rem] md:text-sm text-left"
									placeholder={profile.selectCareer}
								/>
							)}
						</div>

						<div className="grid gap-1.5 my-4">
							<Label htmlFor="creationDate">
								{profile.creationDate}
							</Label>
							<Input
								disabled
								type="text"
								id="creationDate"
								placeholder={profile.creationDate}
								value={getDate({
									date: user?.created || "",
									lang: lang,
									displayTime: true,
								})}
								autoComplete="off"
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-center md:justify-end">
					<Button
						className="hover:bg-purple-700"
						onClick={btnUpdateCareer}
						disabled={!!user?.career}
					>
						<GraduationCap className="mr-2" />
						{profile.button}
					</Button>
				</CardFooter>
			</Card>
		</>
	);
};

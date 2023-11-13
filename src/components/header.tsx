import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { LogIn } from "lucide-react";
import { Sidebar } from "./";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Toaster,
} from "./ui";
import type { IUser } from "../entities";
import { DataBaseKeys, get, getUrl, remove } from "../lib";
import { addUser, $userStore } from "../store";
import { getLangFromUrl, useTranslations, type Components } from "../i18n";

export const Header = () => {
	const user = useStore($userStore);
	const url = getUrl();
	const lang = getLangFromUrl(url);
	const t = useTranslations(lang);
	const { header } = t("components") as Components;

	useEffect(() => {
		const fetchData = async () => {
			const userData: IUser | null = await get<IUser>(DataBaseKeys.USER);
			addUser(userData);

			if (!userData?.career?.id && url.pathname !== `/${lang}/profile`) {
				location.href = `/${lang}/profile?updateCareer=yes`;
			}
		};

		fetchData();
	}, []);

	const logout = async () => {
		await remove(DataBaseKeys.TOKEN);
		await remove(DataBaseKeys.USER);
		addUser(null);
		location.href = `/${lang}`;
	};

	return (
		<>
			<Toaster />
			<header className="bg-primary p-4 flex flex-row items-center justify-between text-white">
				<Sidebar />

				<h1>
					{header.welcome}, {user?.display_name}
				</h1>

				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage
								src={
									user?.picture ??
									"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLWNpcmNsZS0yIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4="
								}
								alt={user?.display_name}
							/>
							<AvatarFallback>ENW</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<a href={`/${lang}/profile`}>{header.profile}</a>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={logout}
						>
							<LogIn className="mr-1 rotate-180" />
							{header.logout}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
		</>
	);
};

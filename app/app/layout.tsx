"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useAuthContext } from "@/contexts/authContext";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Toaster,
} from "@/components/ui";
import { Sidebar } from "@/components/sidebar";
import { Picture } from "@/components/picture";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const { authUser, isLoggedIn, logout } = useAuthContext();

	if (!isLoggedIn) redirect("/");

	return (
		<main>
			<Toaster />
			<header className="bg-primary p-4 flex flex-row items-center justify-between text-white">
				<Sidebar />

				<DropdownMenu>
					<div className="flex flex-row items-center justify-end">
						<span className="mx-4">
							Bienvenido (a), {authUser?.display_name}
						</span>
						<DropdownMenuTrigger>
							<Picture alt={authUser?.display_name} src={authUser?.picture} />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent>
						<DropdownMenuLabel>{authUser?.email}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href="/app/profile">
							<DropdownMenuItem className="cursor-pointer">
								Perfil
							</DropdownMenuItem>
						</Link>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer"
							onClick={() => {
								logout();
							}}
						>
							<LogIn className="mr-1 rotate-180" />
							Cerrar sesión
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>

			<section className="container mt-2">{children}</section>
		</main>
	);
}

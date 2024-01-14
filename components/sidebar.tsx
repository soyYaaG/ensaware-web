import {
	Fingerprint,
	Home,
	Menu,
	ScanSearch,
	UserCog,
	UserSquare2,
} from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "./ui";
import { usePermission } from "@/hooks";
import Link from "next/link";

export const Sidebar = () => {
	const { permissionsProfileState } = usePermission();

	return (
		<Sheet>
			<SheetTrigger aria-label="Menú">
				<Menu className="h-8 w-8 cursor-pointer" />
			</SheetTrigger>
			<SheetContent side="left">
				<Command id="sidebar">
					<CommandInput placeholder="Buscar..." />
					<CommandList>
						<CommandEmpty>Resultado no encontrado.</CommandEmpty>

						<CommandItem>
							<Home className="mr-2 h-4 w-4" />
							<Link href="/app">
								<SheetClose asChild>
									<span>Inicio</span>
								</SheetClose>
							</Link>
						</CommandItem>
						<CommandSeparator />

						{permissionsProfileState["career:read"] && (
							<>
								<CommandGroup heading="Carreras">
									{permissionsProfileState["career:read"] && (
										<CommandItem>
											<ScanSearch className="mr-2 h-4 w-4" />
											<Link href="/app/careers">
												<SheetClose asChild>
													<span>
														{
															permissionsProfileState["career:read"].permission
																.description
														}
													</span>
												</SheetClose>
											</Link>
										</CommandItem>
									)}
								</CommandGroup>
								<CommandSeparator />
							</>
						)}

						{permissionsProfileState["profile:read"] && (
							<>
								<CommandGroup heading="Permisos">
									{permissionsProfileState["profile:read"] && (
										<CommandItem>
											<UserSquare2 className="mr-2 h-4 w-4" />
											<Link href="/app/profiles">
												<SheetClose asChild>
													<span>
														{
															permissionsProfileState["profile:read"].permission
																.description
														}
													</span>
												</SheetClose>
											</Link>
										</CommandItem>
									)}
								</CommandGroup>
								<CommandSeparator />
							</>
						)}

						{permissionsProfileState["permission:read"] && (
							<>
								<CommandGroup heading="Permisos">
									{permissionsProfileState["permission:read"] && (
										<CommandItem>
											<Fingerprint className="mr-2 h-4 w-4" />
											<Link href="/app/permissions">
												<SheetClose asChild>
													<span>
														{
															permissionsProfileState["permission:read"]
																.permission.description
														}
													</span>
												</SheetClose>
											</Link>
										</CommandItem>
									)}
								</CommandGroup>
								<CommandSeparator />
							</>
						)}

						{permissionsProfileState["user:read"] && (
							<>
								<CommandGroup heading="Usuarios">
									{permissionsProfileState["user:read"] && (
										<CommandItem>
											<UserCog className="mr-2 h-4 w-4" />
											<Link href="/app/users">
												<SheetClose asChild>
													<span>
														{
															permissionsProfileState["user:read"].permission
																.description
														}
													</span>
												</SheetClose>
											</Link>
										</CommandItem>
									)}
								</CommandGroup>
								<CommandSeparator />
							</>
						)}
					</CommandList>
				</Command>
			</SheetContent>
		</Sheet>
	);
};

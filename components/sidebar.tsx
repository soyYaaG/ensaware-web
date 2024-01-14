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
import Link from "next/link";
import { useAuthContext } from "@/contexts/authContext";

export const Sidebar = () => {
	const { authPermission } = useAuthContext();

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

						{authPermission && authPermission["career:read"] && (
							<>
								<CommandGroup heading="Carreras">
									{authPermission["career:read"] && (
										<CommandItem>
											<ScanSearch className="mr-2 h-4 w-4" />
											<Link href="/app/careers">
												<SheetClose asChild>
													<span>
														{
															authPermission["career:read"].permission
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

						{authPermission && authPermission["profile:read"] && (
							<>
								<CommandGroup heading="Permisos">
									{authPermission["profile:read"] && (
										<CommandItem>
											<UserSquare2 className="mr-2 h-4 w-4" />
											<Link href="/app/profiles">
												<SheetClose asChild>
													<span>
														{
															authPermission["profile:read"].permission
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

						{authPermission && authPermission["permission:read"] && (
							<>
								<CommandGroup heading="Permisos">
									{authPermission["permission:read"] && (
										<CommandItem>
											<Fingerprint className="mr-2 h-4 w-4" />
											<Link href="/app/permissions">
												<SheetClose asChild>
													<span>
														{
															authPermission["permission:read"].permission
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

						{authPermission && authPermission["user:read"] && (
							<>
								<CommandGroup heading="Usuarios">
									{authPermission["user:read"] && (
										<CommandItem>
											<UserCog className="mr-2 h-4 w-4" />
											<Link href="/app/users">
												<SheetClose asChild>
													<span>
														{authPermission["user:read"].permission.description}
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

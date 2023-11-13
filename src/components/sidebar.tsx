import { Menu } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	Sheet,
	SheetContent,
	SheetTrigger,
} from "./ui";
import { getUrl } from "../lib";
import { getLangFromUrl, useTranslations } from "../i18n";

export const Sidebar = () => {
	const url = getUrl();
	const lang = getLangFromUrl(url);
	const t = useTranslations(lang);

	return (
		<>
			<Sheet>
				<SheetTrigger aria-label="Menú">
					<Menu className="h-8 w-8 cursor-pointer" />
				</SheetTrigger>
				<SheetContent side="left">
					<Command id="sidebar">
						<CommandInput placeholder="Escriba para realizar una búsqueda..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup heading="Suggestions">
								<CommandItem>
									<a href={`/${lang}/app`}>Inicio</a>
								</CommandItem>
								<CommandItem>Search Emoji</CommandItem>
								<CommandItem>Calculator</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup heading="Settings">
								<CommandItem>Profile</CommandItem>
								<CommandItem>Billing</CommandItem>
								<CommandItem>Settings</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</SheetContent>
			</Sheet>
		</>
	);
};

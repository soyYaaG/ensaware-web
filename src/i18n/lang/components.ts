export type ChangeLanguageComponent = {
	button: string;
	english: string;
	spanish: string;
};

export type HeaderComponent = {
	logout: string;
	profile: string;
	welcome: string;
};

export type LoadComponent = {
	defaultText: string;
};

export type SideBarComponent = {
	placeholder: string;
	comandEmpty: string;
};

export type Components = {
	header: HeaderComponent;
	changeLanguage: ChangeLanguageComponent;
	load: LoadComponent;
};

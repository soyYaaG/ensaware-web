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

export type ProfileComponent = {
	title: string;
	description: string;
	fullName: string;
	email: string;
	selectCareer: string;
	button: string;
};

export type SideBarComponent = {
	placeholder: string;
	comandEmpty: string;
};

export type Components = {
	header: HeaderComponent;
	changeLanguage: ChangeLanguageComponent;
	load: LoadComponent;
	profile: ProfileComponent;
};

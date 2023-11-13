export type ProfilePage = {
	title: string;
	message: string;
	alertTitle: string;
};

export type IndexPage = {
	title: string;
	button: string;
	description: string;
	login: string;
};

export type Pages = {
	index: IndexPage;
	profile: ProfilePage;
};

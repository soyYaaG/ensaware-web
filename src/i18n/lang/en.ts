import type { Translations } from ".";

export const en: Translations = {
	components: {
		changeLanguage: {
			button: "Change language",
			english: "English",
			spanish: "Spanish",
		},
		header: {
			logout: "Sign out",
			profile: "Profile",
			welcome: "Welcome",
		},
		load: {
			defaultText: "Loading...",
		},
		profile: {
			title: "My profile",
			description: "Information of the person who has logged in.",
			fullName: "Full name",
			email: "Email",
			selectCareer: "Select career",
			button: "Update data",
		},
	},
	pages: {
		index: {
			title: "¡Sign in!",
			button: "Sign in",
			description:
				"The Ensaware application only allows login with the institutional email.",
			login: "Login",
		},
		profile: {
			title: "My Profile",
			message:
				"Please update the major you are studying at the Corporación Universitaria Americana.",
			alertTitle: "¡Update Career!",
		},
	},
};

import type { Translations } from ".";

export const es: Translations = {
	components: {
		changeLanguage: {
			button: "Cambiar idioma",
			english: "Ingles",
			spanish: "Español",
		},
		header: {
			logout: "Cerrar sesión",
			profile: "Perfil",
			welcome: "Bienvenido (a)",
		},
		load: {
			defaultText: "Cargando...",
		},
		profile: {
			title: "Mi perfil",
			description: "Información de la persona que ha iniciado sesión.",
			fullName: "Nombre completo",
			email: "Correo electrónico",
			selectCareer: "Seleccionar carrera",
			button: "Actualizar datos",
		},
	},
	pages: {
		index: {
			title: "¡Iniciar Sesión!",
			button: "Iniciar Sesión",
			description:
				"La aplicación Ensaware solo permite iniciar sesión con el correo electrónico institucional.",
			login: "Iniciar Sesión",
		},
		profile: {
			title: "Mi Perfil",
			message:
				"Por favor actualiza la carrera que estudia en la Corporación Universitaria Americana.",
			alertTitle: "¡Actualizar Carrera!",
		},
	},
};

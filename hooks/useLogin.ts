import { login } from "@/services";

export const useLogin = () => {
	const handleLoginClick = () => {
		login("google");
	};

	return {
		handleLoginClick,
	};
};

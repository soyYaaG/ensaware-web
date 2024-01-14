"use client";

import { permissionProfile, token, user } from "@/entities";
import {
	LocalStorageKeys,
	clearLocalStorage,
	getInLocalStorage,
	saveInLocalStorage,
} from "@/lib";
import { getPermissionProfile, me } from "@/services";
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

type AuthContextType = {
	authPermission: permissionProfile[] | null;
	authUser: user | null;
	login: (tokenData: token) => void;
	logout: () => void;
	isLoggedIn: boolean;
	setUser: (value: user) => void;
};

const AuthContext = createContext<AuthContextType>({
	authPermission: null,
	authUser: null,
	isLoggedIn: false,
	login: (tokenData: token) => {},
	logout: () => {},
	setUser: (value: user) => {},
});

export default function AuthContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const authUserInLocalStorage = getInLocalStorage(
		LocalStorageKeys.USER
	) as user | null;

	const authPermissionInLocalStorage = getInLocalStorage(
		LocalStorageKeys.PERMISSION_PROFILE
	) as permissionProfile[] | null;

	const [authUser, setAuthUser] = useState<user | null>(authUserInLocalStorage);
	const [authPermission, setAuthPermission] = useState<
		permissionProfile[] | null
	>(authPermissionInLocalStorage);

	const login = useCallback((tokenData: token) => {
		const getData = async () => {
			saveInLocalStorage(LocalStorageKeys.TOKEN, JSON.stringify(tokenData));

			const responseUser = await me();
			saveInLocalStorage(LocalStorageKeys.USER, JSON.stringify(responseUser));
			setAuthUser(responseUser);

			const responsePemissionProfile = await getPermissionProfile(
				responseUser.profile?.id || ""
			);
			saveInLocalStorage(
				LocalStorageKeys.PERMISSION_PROFILE,
				JSON.stringify(responsePemissionProfile)
			);
			setAuthPermission(responsePemissionProfile);
		};

		getData();
	}, []);

	const logout = useCallback(() => {
		clearLocalStorage();
		setAuthUser(null);
		setAuthPermission(null);
	}, []);

	const setUser = useCallback((value: user) => {
		saveInLocalStorage(LocalStorageKeys.USER, JSON.stringify(value));
		setAuthUser(value);
	}, []);

	const value = useMemo(
		() => ({
			authPermission,
			authUser,
			isLoggedIn: authUser !== null,
			login,
			logout,
			setUser,
		}),
		[authPermission, authUser, login, logout, setUser]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
	return useContext(AuthContext);
}

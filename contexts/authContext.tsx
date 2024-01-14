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
	isLoad: boolean;
	isLoggedIn: boolean;
	login: (tokenData: token) => void;
	logout: () => void;
	setLoad: (value: boolean) => void;
	setUser: (value: user) => void;
};

const AuthContext = createContext<AuthContextType>({
	authPermission: null,
	authUser: null,
	isLoad: true,
	isLoggedIn: false,
	login: (tokenData: token) => {},
	logout: () => {},
	setLoad: (value: boolean) => {},
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
	const [getIsLoad, setIsLoad] = useState<boolean>(false);

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

	const setLoad = useCallback((value: boolean) => {
		setIsLoad(value);
	}, []);

	const setUser = useCallback((value: user) => {
		saveInLocalStorage(LocalStorageKeys.USER, JSON.stringify(value));
		setAuthUser(value);
	}, []);

	const value = useMemo(
		() => ({
			authPermission,
			authUser,
			isLoad: getIsLoad,
			isLoggedIn: authUser !== null,
			login,
			logout,
			setLoad,
			setUser,
		}),
		[authPermission, authUser, getIsLoad, login, logout, setLoad, setUser]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
	return useContext(AuthContext);
}

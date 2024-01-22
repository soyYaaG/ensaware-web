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
	authPermission: { [key: string]: permissionProfile } | null;
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
	);

	const [authUser, setAuthUser] = useState<user | null>(authUserInLocalStorage);
	const [authPermission, setAuthPermission] = useState<{
		[key: string]: permissionProfile;
	} | null>(authPermissionInLocalStorage);
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
			const permissionsObject: { [key: string]: permissionProfile } = {};
			responsePemissionProfile.forEach((item: permissionProfile) => {
				permissionsObject[item.permission.code_name] = item;
			});
			saveInLocalStorage(
				LocalStorageKeys.PERMISSION_PROFILE,
				JSON.stringify(permissionsObject)
			);
			setAuthPermission(permissionsObject);
		};

		getData();
	}, []);

	const logout = () => {
		clearLocalStorage();
		setAuthUser(null);
		setAuthPermission(null);
	};

	const setLoad = (value: boolean) => {
		setIsLoad(value);
	};

	const setUser = (value: user) => {
		saveInLocalStorage(LocalStorageKeys.USER, JSON.stringify(value));
		setAuthUser(value);
	};

	const value = {
		authPermission,
		authUser,
		isLoad: getIsLoad,
		isLoggedIn: authUser !== null,
		login,
		logout,
		setLoad,
		setUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
	return useContext(AuthContext);
}

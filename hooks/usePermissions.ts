import { permissionProfile } from "@/entities";
import { getAllPermissions } from "@/services";
import { useEffect, useState } from "react";

export const usePermission = () => {
	const [permissionsProfileState, setPermissionsProfileState] = useState<{
		[key: string]: permissionProfile;
	}>({});

	useEffect(() => {
		const response = getAllPermissions();
		if (!response) return;

		const permissionsObject: { [key: string]: permissionProfile } = {};
		response.forEach((item: permissionProfile) => {
			permissionsObject[item.permission.code_name] = item;
		});

		setPermissionsProfileState(permissionsObject);
	}, []);

	return {
		permissionsProfileState,
	};
};

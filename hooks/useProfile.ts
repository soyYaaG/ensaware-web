import { useAuthContext } from "@/contexts/authContext";
import { profile, selectData } from "@/entities";
import { allProfiles } from "@/services";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useProfile = () => {
	const { setLoad } = useAuthContext();
	const [profile, setProfile] = useState<string>("");
	const [selectProfilesData, setSelectProfilesData] = useState<selectData[]>(
		[]
	);

	useEffect(() => {
		getAllPermissions();
	}, []);

	const getAllPermissions = async () => {
		try {
			const response = await allProfiles();
			const profilesData: selectData[] | undefined = response?.map(
				(item: profile) => {
					return {
						key: item.id,
						value: item.name,
					};
				}
			);

			if (profilesData) setSelectProfilesData(profilesData);
		} catch (error: any) {
			toast(error);
		} finally {
			setLoad(false);
		}
	};

	const onValueChangeProfile = (value: string) => {
		setProfile(value);
	};

	return {
		profile,
		onValueChangeProfile,
		selectProfilesData,
	};
};

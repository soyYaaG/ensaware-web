import { useAuthContext } from "@/contexts/authContext";
import { career, selectData, user } from "@/entities";
import { LocalStorageKeys, saveInLocalStorage } from "@/lib";
import { allCareer, updateCareer } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCareer = () => {
	const [career, setCareer] = useState<string>("");
	const [selectCareerData, setSelectCareerData] = useState<selectData[]>([]);
	const [isLoad, setIsLoad] = useState<boolean>(true);
	const router = useRouter();
	const { setUser } = useAuthContext();

	useEffect(() => {
		const getData = async () => {
			setIsLoad(true);
			try {
				const response = await allCareer();
				const careers: selectData[] | undefined = response?.map(
					(item: career) => {
						return {
							key: item.id,
							value: item.name,
						};
					}
				);

				if (careers) setSelectCareerData(careers);
			} catch (error: any) {
				setIsLoad(false);
				toast(error);
			} finally {
				setIsLoad(false);
			}
		};

		getData();
	}, []);

	const onValueChange = (value: string) => {
		setCareer(value);
	};

	const update = async () => {
		setIsLoad(true);
		try {
			const response: user = await updateCareer(career);
			setUser(response);
			router.refresh();
		} catch (error: any) {
			setIsLoad(false);
			toast(error);
		} finally {
			setIsLoad(false);
		}
	};

	return {
		career,
		isLoad,
		onValueChange,
		selectCareerData,
		update,
	};
};

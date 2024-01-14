import { useAuthContext } from "@/contexts/authContext";
import { career, selectData, user } from "@/entities";
import { allCareer, updateCareer } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCareer = () => {
	const [career, setCareer] = useState<string>("");
	const [selectCareerData, setSelectCareerData] = useState<selectData[]>([]);
	const router = useRouter();
	const { setLoad, setUser } = useAuthContext();

	useEffect(() => {
		const getData = async () => {
			setLoad(true);
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
				toast(error);
			} finally {
				setLoad(false);
			}
		};

		getData();
	}, [setLoad]);

	const onValueChange = (value: string) => {
		setCareer(value);
	};

	const update = async () => {
		setLoad(true);
		try {
			const response: user = await updateCareer(career);
			setUser(response);
			router.refresh();
		} catch (error: any) {
			toast(error);
		} finally {
			setLoad(false);
		}
	};

	return {
		career,
		onValueChange,
		selectCareerData,
		update,
	};
};

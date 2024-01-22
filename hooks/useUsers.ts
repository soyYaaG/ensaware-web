import { useAuthContext } from "@/contexts/authContext";
import { queryParameters, user, userPagination } from "@/entities";
import { getPaginationQueryParameter } from "@/lib";
import { allUsers, deleteUser, getQrUser, getUser } from "@/services";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useUsers = (showAllUsers: boolean = true) => {
	const { setLoad } = useAuthContext();

	const [pagination, setPagination] = useState<userPagination>();
	const [queryParameters, setQueryParameters] = useState<queryParameters>({
		page: 1,
		size: 20,
	});
	const [user, setUser] = useState<user | null>(null);
	const [users, setUsers] = useState<user[]>([]);
	const [getShowAllUsers] = useState<boolean>(showAllUsers);

	useEffect(() => {
		if (getShowAllUsers) getAllUsers(queryParameters);
	}, []);

	const getAllUsers = async (query: queryParameters) => {
		setLoad(true);
		try {
			const usersPagination: userPagination | null = await allUsers(query);

			if (usersPagination?.items) {
				setPagination(usersPagination);
				setUsers(usersPagination.items);
			}
		} catch (error: any) {
			toast(error);
		} finally {
			setLoad(false);
		}
	};

	const getQr = async (userId?: string) => {
		setLoad(true);
		try {
			const response = await getQrUser(userId);
			return response;
		} catch (error: any) {
			toast(error);
		} finally {
			setLoad(false);
		}
	};

	const getUserData = async (id: string) => {
		setLoad(true);
		try {
			const data = await getUser(id);
			setUser(data);
		} catch (error: any) {
			toast(error);
		} finally {
			setLoad(false);
		}
	};

	const next = () => {
		const result = getPaginationQueryParameter(pagination?.links.next);
		setQueryParameters(result);
	};

	const prev = () => {
		const result = getPaginationQueryParameter(pagination?.links.prev);
		setQueryParameters(result);
	};

	const remove = async (id: string) => {
		setLoad(true);
		try {
			await deleteUser(id);
			await getAllUsers(queryParameters);
		} catch (error: any) {
			toast(error);
		} finally {
			setLoad(false);
		}
	};

	return {
		getAllUsers,
		getQr,
		getUserData,
		next,
		pagination,
		prev,
		remove,
		user,
		users,
	};
};

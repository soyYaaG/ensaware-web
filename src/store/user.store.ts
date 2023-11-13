import { atom } from "nanostores";
import type { IUser } from "../entities";

export const $userStore = atom<IUser | null>(null);

export const addUser = (user: IUser | null) => {
	$userStore.set(user);
};

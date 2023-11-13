import { atom } from "nanostores";

export const $isLoad = atom<boolean>(false);

export const setLoad = (value: boolean) => {
	$isLoad.set(value);
};

import { atom } from "nanostores";
import type { ISelectData } from "../entities";

export const $defaultSelectValue = atom<string>("");
export const $selectData = atom<ISelectData[]>([]);

export const setDefaultValue = (value: string) => {
	$defaultSelectValue.set(value);
};

export const setSelectData = (value: ISelectData[]) => {
	$selectData.set(value);
};

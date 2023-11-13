import { useState, type HTMLProps, type ReactNode, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui";
import { useStore } from "@nanostores/react";
import type { ISelectData } from "../entities";
import {
	$defaultSelectValue,
	$selectData,
	setDefaultValue,
	setSelectData,
} from "../store/";

interface CustomSelectProps extends HTMLProps<HTMLElement> {
	placeholder: string;
	children?: ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
	placeholder,
	className,
}) => {
	const defaultSelectValue = useStore($defaultSelectValue);
	const selectData = useStore($selectData);

	return (
		<Select
			onValueChange={setDefaultValue}
			defaultValue={defaultSelectValue}
		>
			<SelectTrigger aria-label="Select Trigger" className={className}>
				<SelectValue
					aria-label="Select Value"
					placeholder={placeholder}
				>
					{selectData.find((item) => item.key === defaultSelectValue)
						?.value || defaultSelectValue}
				</SelectValue>
			</SelectTrigger>
			<SelectContent aria-label="Select Content">
				<SelectGroup aria-label="Select Group">
					{selectData.map((item: ISelectData) => (
						<SelectItem key={item.key} value={item.key}>
							{item.value}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

import { FC } from "react";
import { selectData } from "@/entities";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui";

type selectDataProps = {
	placeholder: string;
	data: selectData[];
	defaultValue: string;
	className?: string;
	onValueChange?: (value: string) => void;
};

export const SelectData: FC<selectDataProps> = ({
	placeholder,
	data,
	defaultValue,
	className,
	onValueChange,
}) => {
	const selectedValue =
		data.find((item) => item.key === defaultValue)?.value || defaultValue;

	return (
		<Select onValueChange={onValueChange} defaultValue={defaultValue}>
			<SelectTrigger aria-label="Select Trigger" className={className}>
				<SelectValue aria-label="Select Value" placeholder={placeholder}>
					{selectedValue}
				</SelectValue>
			</SelectTrigger>
			<SelectContent aria-label="Select Content">
				<SelectGroup aria-label="Select Group">
					{data.map((item: selectData) => (
						<SelectItem key={item.key} value={item.key}>
							{item.value}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

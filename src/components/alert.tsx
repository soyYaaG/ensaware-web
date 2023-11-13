import type { HTMLProps, ReactNode } from "react";
import React from "react";
import { HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui";

interface CustomAlertProps extends HTMLProps<HTMLElement> {
	message: string;
	title: string;
	children?: ReactNode;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
	message,
	title,
	className,
}) => {
	return (
		<>
			<Alert className={className}>
				<HelpCircle className="h-8 w-8" />
				<AlertTitle className="ml-4">{title}</AlertTitle>
				<AlertDescription className="ml-4">{message}</AlertDescription>
			</Alert>
		</>
	);
};

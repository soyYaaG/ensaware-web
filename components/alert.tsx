import { HTMLProps, ReactNode } from "react";
import { HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui";

type CustomAlertProps = {
	message: string;
	title: string;
	children?: ReactNode;
} & HTMLProps<HTMLElement>;

export const CustomAlert: React.FC<CustomAlertProps> = ({
	message,
	title,
	className,
}) => {
	return (
		<>
			<Alert className={className}>
				<HelpCircle className="h-4 w-4" />
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription>{message}</AlertDescription>
			</Alert>
		</>
	);
};

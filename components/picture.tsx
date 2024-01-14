import { FC, HTMLProps, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui";

type PictureProps =
	| {
			alt?: string | null;
			className?: string;
			src?: string | null;
	  }
	| HTMLProps<HTMLElement>;

export const Picture: FC<PictureProps> = ({ alt, className, src }) => {
	return (
		<Avatar className={className}>
			<AvatarImage
				src={
					src ??
					"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLWNpcmNsZS0yIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4="
				}
				alt={alt || "Ensaware"}
			/>
			<AvatarFallback>enw</AvatarFallback>
		</Avatar>
	);
};

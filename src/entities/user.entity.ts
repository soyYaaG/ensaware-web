import type { ICareer } from "./";

export interface IUser {
	created: string;
	career?: ICareer | null;
	display_name: string;
	email: string;
	id: string;
	modified?: string | null;
	picture?: string | null;
	provider: string;
}

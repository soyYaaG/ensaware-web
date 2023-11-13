import type { ICareer } from "./";

export interface IUser {
	career?: ICareer | null;
    display_name: string;
    email: string;
    id: string;
    picture?: string | null;
    provider: string;
}

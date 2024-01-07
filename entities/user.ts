import { career, pagination, profile } from ".";

export type user = {
	created: string;
	career?: career | null;
	display_name: string;
	email: string;
	id: string;
	is_active: boolean;
	modified?: string | null;
	picture?: string | null;
	profile?: profile | null;
	provider: string;
};

export type userPagination = {
	items?: user[] | null;
} & pagination;

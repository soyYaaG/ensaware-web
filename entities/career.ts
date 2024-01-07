export type career = {
	id: string;
	is_active: boolean;
	created: string;
	modified: string | null;
} & careerCreate;

export type careerCreate = {
	name: string;
};

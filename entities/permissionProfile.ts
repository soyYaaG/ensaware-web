import { permission, profile } from ".";

export type permissionProfile = {
	created: string;
	id: string;
	modified?: string | null;
	permission: permission;
	profile: profile;
};

export type pagination = {
	links: paginationLink;
	page: number;
	pages: number;
	size: number;
	total: number;
};

export type paginationLink = {
	first: string;
	last: string;
	next: string;
	self: string;
	prev: string;
};

export type queryParameters = {
	page: number;
	size: number;
};

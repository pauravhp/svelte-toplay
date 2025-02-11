export type FiltersType = "all" | "active" | "completed";

export type BoardGame = {
	id: string;
	name: string;
	year: string;
	completed: boolean;
};

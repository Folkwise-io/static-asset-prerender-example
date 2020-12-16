export interface Meet {
	id: number;
	type: string;
	title: string;
	date: string;
}

let id = 1;
const buildMeet = (type: string, title: string, date: string): Meet => ({
	id: id++,
	type,
	title,
	date,
});

export const MEETS: Meet[] = [
	buildMeet("hackathon", "Social Justice Hackathon", "Dec 12, 2020"),
	buildMeet("lecture", "How to wow recruiters", "Jan 1, 2020"),
	buildMeet("webinar", "React 101", "Feb 5, 2020"),
];

export default class MeetService {
	byId(id: number): Promise<Meet> {
		const index = Math.max(0, id - 1);
		return Promise.resolve(MEETS[index] || null);
	}
}

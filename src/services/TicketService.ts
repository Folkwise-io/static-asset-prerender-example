import { Meet, MEETS } from "./MeetService";
import { User, USERS } from "./UserService";

export interface TicketInput {
	user: User;
	meet: Meet;
}

export interface Ticket {
	id: number;
	userId: number;
	meetId: number;
	firstName: string;
	lastName: string;
	type: string;
	title: string;
	date: string;
}

let id = 100000;
const buildTicket = (
	{ firstName, lastName, id: userId }: User,
	{ type, title, date, id: meetId }: Meet
) => ({
	id: id++,
	userId,
	meetId,
	firstName,
	lastName,
	type,
	title,
	date,
});

const tickets: Ticket[] = USERS.map((user, index) =>
	buildTicket(user, MEETS[index])
);

export default class TicketService {
	byId(id: number): Promise<Ticket> {
		const index = Math.max(0, id - 1);
		return Promise.resolve(tickets[index] || null);
	}
}

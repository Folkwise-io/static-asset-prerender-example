export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}

let id = 1;
const buildUser = (
	firstName: string,
	lastName: string,
	email: string
): User => ({
	id: id++,
	firstName,
	lastName,
	email,
});

export const USERS: User[] = [
	buildUser("Amy", "Adams", "a@a.com"),
	buildUser("Billy", "Bob", "b@b.com"),
	buildUser("Chatty", "Cathy", "c@c.com"),
];

export default class UserService {
	byId(id: number): Promise<User> {
		const index = Math.max(0, id - 1);
		return Promise.resolve(USERS[index] || null);
	}
}

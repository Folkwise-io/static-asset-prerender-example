import { Application } from "express";
import UserService, { User } from "../services/UserService";
import MeetService, { Meet } from "../services/MeetService";
import userTemplate from "../templates/userTemplate";
import meetTemplate from "../templates/meetTemplate";
import TicketService, { Ticket } from "../services/TicketService";
import ticketTemplate from "../templates/ticketTemplate";

const imageRoute = (app: Application) => {
	app.get("/dynamic/image", async (req, res, next) => {
		const id: string = req.query.id as string;
		const template: string = req.query.template as string;

		if (!id || !template) {
			throw new Error("id and template must be defined.");
		}

		let img;
		switch (template) {
			case "user": {
				const userService = new UserService();
				const user: User = await userService.byId(Number.parseInt(id));

				if (!user) {
					res.status(404).send("Mock data not found. Try ids 1, 2 or 3");
				}
				img = userTemplate(user);
				break;
			}
			case "meet": {
				const meetService = new MeetService();
				const meet: Meet = await meetService.byId(Number.parseInt(id));

				if (!meet) {
					res.status(404).send("Mock data not found. Try ids 1, 2 or 3");
				}
				img = meetTemplate(meet);
				break;
			}
			case "ticket": {
				const ticketService = new TicketService();
				const ticket: Ticket = await ticketService.byId(Number.parseInt(id));

				if (!ticket) {
					res.status(404).send("Mock data not found. Try ids 1, 2 or 3");
				}
				img = ticketTemplate(ticket);
				break;
			}
			default: {
				throw new Error("Unknown template");
			}
		}

		res.end(img);
	});
};

export default imageRoute;

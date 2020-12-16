import { Application, RequestHandler } from "express";
import * as path from "path";
import * as serveStatic from "serve-static";
var parseUrl = require("parseurl");
import * as fs from "fs";
import htmlTemplate from "../templates/htmlTemplate";
import UserService from "../services/UserService";
import MeetService from "../services/MeetService";
import TicketService from "../services/TicketService";

const staticPath = path.resolve(__dirname, "..", "..", "dist");
const staticMiddleware = serveStatic(staticPath);

const htmlMiddleware: RequestHandler = async (req, res, next) => {
	var originalUrl = parseUrl.original(req);
	var pathFromUrl = parseUrl(req).pathname;
	const [_, type, id] = pathFromUrl.split("/");

	let imagePath: string = process.env.BASE_PATH + "/dynamic/image";
	let title: string = "mintbean.io";

	switch (type) {
		case "user": {
			const user = await new UserService().byId(id);
			const { firstName, lastName } = user;
			imagePath += "?id=" + id + "&template=user";
			title = firstName + " " + lastName + " - mintbean.io";
			break;
		}
		case "meet": {
			const meet = await new MeetService().byId(id);
			imagePath += "?id=" + id + "&template=meet";
			title = meet.title + " - mintbean.io";
			break;
		}
		case "ticket": {
			const ticket = await new TicketService().byId(id);
			imagePath += "?id=" + id + "&template=ticket";
			title =
				ticket.firstName +
				" " +
				ticket.lastName +
				" - Ticket for " +
				ticket.title;
			break;
		}
		default: {
			break;
		}
	}

	const html = htmlTemplate({
		imagePath,
		title,
	});

	res.send(html);
};

const staticRoute = (app: Application) => {
	app.get("*", (req, res, next) => {
		var originalUrl = parseUrl.original(req);
		var pathFromUrl = parseUrl(req).pathname;

		// make sure redirect occurs at mount
		if (pathFromUrl === "/" && originalUrl.pathname.substr(-1) !== "/") {
			pathFromUrl = "";
		}

		const filePath = path.join(staticPath, pathFromUrl);
		const isIndexHtml =
			!fs.existsSync(filePath) ||
			!fs.statSync(filePath).isFile() ||
			/^\/?index.html$/.test(filePath);

		if (isIndexHtml) {
			htmlMiddleware(req, res, next);
		} else {
			staticMiddleware(req, res, next);
		}
	});
};

export default staticRoute;

import { Ticket } from "../services/TicketService";
import ImageBuilder from "../utils/ImageBuilder";

export default async ({
  firstName,
  lastName,
  title,
  date,
  type,
  id,
}: Ticket): Promise<Buffer> => {
  const b = await ImageBuilder.init(1200, 627);

  return b
    .background("#09090b")
    .raw((ib, ctx) => {
      ctx.clip();
      ctx.translate(0, 0);
      ctx.translate(0, 0);
      ctx.scale(1, 1);
      ctx.translate(0, 0);
      ctx.strokeStyle = "rgba(0,0,0,0)";
      ctx.lineCap = "butt";
      ctx.lineJoin = "round";
      ctx.miterLimit = 4;
      ctx.save();

      //add gradient border
      ctx.fillStyle = "#09090b";
      let g = ctx.createLinearGradient(56.7713, -10.7723, 1161.85, 624.292);
      g.addColorStop(0, "#5EF4D6");
      g.addColorStop(1, "#85EAFE");
      this.strokeStyle(g);
      ctx.lineWidth = 12;

      //clip ALL OF THAT to the ticket shape
      ctx.beginPath();
      ctx.moveTo(1179.45, 6.5482); // move to the top right
      ctx.lineTo(21.6452, 6.5482); // draw to the top left
      ctx.bezierCurveTo(13.3075, 6.5482, 6.54841, 13.3073, 6.54841, 21.645); // topleft corner radius
      ctx.lineTo(6.54841, 259.798); // straight down to the middle of the left side
      ctx.bezierCurveTo(6.54841, 267.253, 11.8951, 273.038, 18.2902, 274.907); // fluff out the left-hand dimple
      ctx.bezierCurveTo(40.1604, 281.301, 52.9099, 297.871, 53.9349, 315.123); // fluff out the left-hand dimple
      ctx.bezierCurveTo(54.9454, 332.133, 44.6081, 351.831, 15.9555, 364.476); // fluff out the left-hand dimple
      ctx.bezierCurveTo(10.5052, 366.881, 6.54841, 372.279, 6.54841, 378.633); // fluff out the left-hand dimple
      ctx.lineTo(6.54841, 606.451); // straight down to the bottom left
      ctx.bezierCurveTo(6.54841, 614.789, 13.3075, 621.548, 21.6452, 621.548); // bottomleft corner radius
      ctx.lineTo(1179.45, 621.548); // straight line to the bottomright
      ctx.bezierCurveTo(1187.79, 621.548, 1194.55, 614.789, 1194.55, 606.451); // bottomright corner radius
      ctx.lineTo(1194.55, 375.368); // straigh up to the middle if the right side
      ctx.bezierCurveTo(1194.55, 368.941, 1190.51, 363.58, 1185.13, 361.145); // fluff out the right-hand dimple
      ctx.bezierCurveTo(1162.03, 350.687, 1152.34, 332.603, 1152.76, 315.886); // fluff out the right-hand dimple
      ctx.bezierCurveTo(1153.19, 299.059, 1163.86, 282.561, 1183.86, 275.137); // fluff out the right-hand dimple
      ctx.bezierCurveTo(1189.74, 272.956, 1194.55, 267.38, 1194.55, 260.334); // fluff out the right-hand dimple
      ctx.lineTo(1194.55, 21.645); // move to the topright corner
      ctx.bezierCurveTo(1194.55, 13.3072, 1187.79, 6.5482, 1179.45, 6.5482); // topright corner radius
      ctx.closePath(); // end

      //actually draw it
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    })
    .ticketCircleIcon(48, { x: 140, y: 160 })
    .ticketUserName(firstName + " " + lastName, { x: 210, y: 158 })
    .ticketMemberType({ x: 210, y: 200 })
    .logo({ x: 90, y: 255 })
    .ticketHackName(title, { x: 572, y: 328 })
    .ticketHackType("Online " + type, { x: 572, y: 410 })
    .ticketDate(date, { x: 97, y: 410 })
    .ticketIdNumber(id, { x: 1075, y: 130 })
    .build();
};

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
    .ticketBackground("#09090b", ["#5EF4D6", "#85EAFE"])
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

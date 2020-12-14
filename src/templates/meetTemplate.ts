import ImageBuilder from "../utils/ImageBuilder";
import { Meet } from "../services/MeetService";

export default (meet: Meet): Buffer => {
  const b = new ImageBuilder(1200, 627);

  return b
    .background("#cccc13")
    .header(meet.title, { x: 200, y: 200 })
    .paragraph(meet.type, { x: 200, y: 300 })
    .paragraph(meet.date, { x: 200, y: 400 })
    .build();
};

import ImageBuilder from "../utils/ImageBuilder";
import { User } from "../services/UserService";

export default async (user: User): Promise<Buffer> => {
  const b = await ImageBuilder.init(1200, 627);

  return b
    .background("#13cc13")
    .header(`${user.firstName} ${user.lastName}`, { x: 200, y: 200 })
    .paragraph(`${user.email}`, { x: 200, y: 300 })
    .paragraph("Mintbean member", { x: 200, y: 400 })
    .build();
};

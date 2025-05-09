import { db } from "@/db";
import { user } from "@/db/schema";

export const fetchUsers = async () => {
  const users = await db.select().from(user);
  return users;
};

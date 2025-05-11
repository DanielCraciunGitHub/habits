"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { Habit } from "@/types";
import { eq } from "drizzle-orm";
import { debounce } from "lodash";

export async function syncHabits(habits: Habit[], userId: string) {
  await db.update(user).set({ habits }).where(eq(user.id, userId));
}

export const debouncedSyncHabits = debounce(syncHabits, 1000);

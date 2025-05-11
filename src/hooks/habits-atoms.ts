import { Habit } from "@/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const habitsAtom = atomWithStorage<Habit[]>("habits", []);

export const selectedHabitAtom = atom<string | null>(null);

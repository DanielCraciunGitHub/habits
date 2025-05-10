import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const habitsAtom = atomWithStorage<
  {
    title: string;
    id: string;
    count: number;
  }[]
>("habits", []);

export const selectedHabitAtom = atom<string | null>(null);

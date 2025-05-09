import { atomWithStorage } from "jotai/utils";

export const habitsAtom = atomWithStorage<
  {
    title: string;
    url: string;
    count: number;
  }[]
>("habits", []);

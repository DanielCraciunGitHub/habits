import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export function unslugify(text: string) {
  return text.replace(/-/g, " ");
}

export const habitCountColor = (count: number): string => {
  if (count === 0) return "text-red-500";
  if (count <= 10) return "text-orange-400";
  if (count <= 20) return "text-orange-300";
  if (count <= 30) return "text-yellow-500";
  if (count <= 40) return "text-yellow-400";
  if (count <= 50) return "text-yellow-300";
  if (count <= 65) return "text-blue-500";
  return "text-green-400";
};

export function generateRandomId() {
  return (
    Date.now() +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

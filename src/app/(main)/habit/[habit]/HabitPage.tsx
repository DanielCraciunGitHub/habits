"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { habitsAtom } from "@/hooks/habits-atoms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function HabitPage({ slug }: { slug: string }) {
  const [habits, setHabits] = useAtom(habitsAtom);
  const [artificialLoading, setArtificialLoading] = useState(true);

  const habit = habits.find((h) => h.url === `/habit/${slug}`);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArtificialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const incrementCount = () => {
    if (!habit) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.url === `/habit/${slug}` ? { ...h, count: h.count + 1 } : h
      )
    );
  };

  if (artificialLoading) {
    return (
      <div className="flex flex-col w-full min-h-screen p-4 md:p-6 items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold truncate">{habit?.title}</h1>
        <div className="text-lg font-semibold">
          {habit?.count} completions
        </div>
      </div>

      <div className="flex items-center mb-6">
        <Button
          variant="default"
          size="icon"
          onClick={incrementCount}
          className="md:mr-4 size-12 rounded-full shadow-md"
          aria-label="Add completion"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-9 lg:grid-cols-14 xl:grid-cols-18 2xl:grid-cols-20 gap-4 mt-2">
        {Array.from({ length: habit?.count || 0 }).map((_, index) => (
          <Card
            key={index}
            className={cn(
              "aspect-square bg-green-500 hover:bg-green-600 transition-colors cursor-pointer flex items-center justify-center text-white font-bold",
              "dark:bg-green-600 dark:hover:bg-green-700"
            )}
          >
            {index + 1}
          </Card>
        ))}
      </div>

      {/* Mobile fixed button for quick access */}
      <Button
        variant="default"
        size="icon"
        onClick={incrementCount}
        className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg z-10 md:hidden"
        aria-label="Add completion"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}

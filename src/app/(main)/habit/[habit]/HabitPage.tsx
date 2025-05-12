"use client";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Minus, Pencil, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { habitsAtom } from "@/hooks/habits-atoms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const COLORS = [
  {
    bg: "bg-green-500",
    hover: "hover:bg-green-600",
    dark: "dark:bg-green-600",
    darkHover: "dark:hover:bg-green-700",
  },
  {
    bg: "bg-red-500",
    hover: "hover:bg-red-600",
    dark: "dark:bg-red-600",
    darkHover: "dark:hover:bg-red-700",
  },
  {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-600",
    dark: "dark:bg-blue-600",
    darkHover: "dark:hover:bg-blue-700",
  },
];

export function HabitPage({ habitId }: { habitId: string }) {
  const [habits, setHabits] = useAtom(habitsAtom);
  const [artificialLoading, setArtificialLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [completionColors, setCompletionColors] = useState<number[]>([]);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const habit = habits.find((h) => h.id === habitId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArtificialLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 10);
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (habit) {
      setCompletionColors(Array(habit.count).fill(0));
    }
  }, [habit]);

  const rotateColor = (index: number) => {
    setCompletionColors((prev) =>
      prev.map((color, i) =>
        i === index ? (color + 1) % COLORS.length : color
      )
    );
  };

  const incrementCount = () => {
    if (!habit) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id ? { ...h, count: h.count + 1 } : h
      )
    );
  };

  const decrementCount = () => {
    if (!habit || habit.count <= 0) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id ? { ...h, count: Math.max(0, h.count - 1) } : h
      )
    );
  };

  const handleTitleUpdate = (newTitle: string) => {
    if (!habit || !newTitle.trim()) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id ? { ...h, title: newTitle.trim() } : h
      )
    );
    setIsEditingTitle(false);
  };

  if (artificialLoading) {
    return (
      <div className="flex flex-col w-full min-h-screen p-4 md:p-6 items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen p-4 md:p-6 mb-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <Input
              ref={titleInputRef}
              defaultValue={habit?.title}
              className="text-xl font-bold max-w-[300px]"
              onBlur={(e) => handleTitleUpdate(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                } else if (e.key === "Escape") {
                  setIsEditingTitle(false);
                }
              }}
            />
          ) : (
            <>
              <h1 className="text-2xl font-bold truncate">
                {habit?.title}
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditingTitle(true)}
                className="h-8 w-8"
                aria-label="Edit habit title"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="items-center gap-4 mb-6 hidden md:flex">
        <Button
          variant="default"
          size="icon"
          onClick={incrementCount}
          className="size-12 rounded-full shadow-md cursor-pointer"
          aria-label="Add completion"
        >
          <Plus className="h-6 w-6" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={decrementCount}
          className="size-12 rounded-full shadow-md cursor-pointer"
          disabled={!habit || habit.count <= 0}
          aria-label="Remove completion"
        >
          <Minus className="h-6 w-6" />
        </Button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-9 lg:grid-cols-14 xl:grid-cols-18 2xl:grid-cols-20 gap-4 mt-2">
        {Array.from({ length: habit?.count || 0 }).map((_, index) => {
          const colorIndex = completionColors[index] || 0;
          const color = COLORS[colorIndex];
          return (
            <Card
              key={index}
              onClick={() => rotateColor(index)}
              className={cn(
                "aspect-square transition-colors cursor-pointer flex items-center justify-center text-white font-bold",
                color.bg,
                color.hover,
                color.dark,
                color.darkHover
              )}
            >
              {index + 1}
            </Card>
          );
        })}
      </div>

      {/* Mobile fixed buttons for quick access */}
      <div className="fixed bottom-6 right-6 flex gap-4 z-10 md:hidden">
        <Button
          variant="destructive"
          size="icon"
          onClick={decrementCount}
          className="size-14 rounded-full cursor-pointer"
          disabled={!habit || habit.count <= 0}
          aria-label="Remove completion"
        >
          <Minus className="h-6 w-6" />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={incrementCount}
          className="size-14 rounded-full opacity-80 cursor-pointer"
          aria-label="Add completion"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

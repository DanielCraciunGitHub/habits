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

export function HabitPage({ slug }: { slug: string }) {
  const [habits, setHabits] = useAtom(habitsAtom);
  const [artificialLoading, setArtificialLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const habit = habits.find((h) => h.url === `/habit/${slug}`);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArtificialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 10);
    }
  }, [isEditingTitle]);

  const incrementCount = () => {
    if (!habit) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.url === `/habit/${slug}` ? { ...h, count: h.count + 1 } : h
      )
    );
  };

  const decrementCount = () => {
    if (!habit || habit.count <= 0) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.url === `/habit/${slug}`
          ? { ...h, count: Math.max(0, h.count - 1) }
          : h
      )
    );
  };

  const handleTitleUpdate = (newTitle: string) => {
    if (!habit || !newTitle.trim()) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.url === `/habit/${slug}` ? { ...h, title: newTitle.trim() } : h
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
          className="size-12 rounded-full shadow-md"
          aria-label="Add completion"
        >
          <Plus className="h-6 w-6" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={decrementCount}
          className="size-12 rounded-full"
          disabled={!habit || habit.count <= 0}
          aria-label="Remove completion"
        >
          <Minus className="h-6 w-6" />
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

      {/* Mobile fixed buttons for quick access */}
      <div className="fixed bottom-6 right-6 flex gap-4 z-10 md:hidden">
        <Button
          variant="destructive"
          size="icon"
          onClick={decrementCount}
          className="size-14 rounded-full"
          disabled={!habit || habit.count <= 0}
          aria-label="Remove completion"
        >
          <Minus className="h-6 w-6" />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={incrementCount}
          className="size-14 rounded-full opacity-80"
          aria-label="Add completion"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

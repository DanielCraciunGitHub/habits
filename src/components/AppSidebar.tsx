"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai/react";
import { Plus, Trash } from "lucide-react";

import { unslugify } from "@/lib/utils";
import { habitsAtom } from "@/hooks/habits-atoms";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const [habits, setHabits] = useAtom(habitsAtom);
  const [addingHabit, setAddingHabit] = useState(false);
  const addHabitRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (addingHabit && addHabitRef.current) {
      setTimeout(() => {
        addHabitRef.current?.focus();
      }, 10);
    }
  }, [addingHabit]);

  const [artificialLoading, setArtificialLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setArtificialLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const habitCountColor = (count: number): string => {
    if (count === 0) return "text-red-500";
    if (count <= 10) return "text-orange-400";
    if (count <= 20) return "text-orange-300";
    if (count <= 30) return "text-yellow-500";
    if (count <= 40) return "text-yellow-400";
    if (count <= 50) return "text-yellow-300";
    if (count <= 65) return "text-blue-500";
    return "text-green-400";
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="https://x.com/craciun_07" target="_blank">
              Made with ❤️ by @craciun_07
            </Link>
          </SidebarGroupLabel>
          <Input
            placeholder="Enter a new habit"
            className={`mb-2 ${!addingHabit ? "hidden" : "block"}`}
            ref={addHabitRef}
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value) {
                const newHabit = {
                  title: value,
                  url: `/habit/${habits.length + 1}`,
                  count: 0,
                };
                setHabits((prev) => [...prev, newHabit]);
                e.target.value = "";
                router.push(newHabit.url);
              }
              setAddingHabit(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              } else if (e.key === "Escape") {
                e.currentTarget.value = "";
                setAddingHabit(false);
              }
            }}
          />
          <SidebarGroupContent>
            <SidebarMenu>
              {artificialLoading ? (
                <div className="flex items-center justify-center h-full">
                  <LoadingSpinner />
                </div>
              ) : (
                habits.map((habit) => (
                  <SidebarMenuItem
                    key={habit.url}
                    className="hover:bg-secondary p-2 rounded-md"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={habit.url}
                        className="flex-1 flex items-center"
                        onClick={() => setOpenMobile(false)}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <div
                            className={`flex gap-1 text-lg ${habitCountColor(
                              habit.count
                            )}`}
                          >
                            <span>{habit.count > 65 && "🎉"}</span>
                            <span>{habit.count}</span>
                          </div>
                          <span>{unslugify(habit.title)}</span>
                        </div>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHabits(
                            habits.filter((h) => h.url !== habit.url)
                          );
                          router.push("/habit/1");
                        }}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setAddingHabit(true);
          }}
        >
          <Plus />
          <span>New Habit</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

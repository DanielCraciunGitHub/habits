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
  SidebarMenuButton,
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

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/">Habit Tracker</Link>
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
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg font-medium text-primary">
                          {habit.count}
                        </span>
                        <SidebarMenuButton
                          asChild
                          onClick={() => setOpenMobile(false)}
                        >
                          <Link href={habit.url}>
                            <span>{unslugify(habit.title)}</span>
                          </Link>
                        </SidebarMenuButton>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setHabits(
                            habits.filter((h) => h.url !== habit.url)
                          );
                          router.push("/");
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
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setHabits([]);
            router.push("/");
          }}
        >
          <Trash />
          <span>Clear Habits</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

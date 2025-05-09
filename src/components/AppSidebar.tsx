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
              {habits.map((habit) => (
                <SidebarMenuItem key={habit.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link href={habit.url}>
                      <span>{unslugify(habit.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
            setOpenMobile(false);
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

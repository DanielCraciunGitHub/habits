"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAtom, useSetAtom } from "jotai/react";
import { GripVertical, Plus, Trash } from "lucide-react";

import { generateRandomId, habitCountColor, unslugify } from "@/lib/utils";
import { habitsAtom, selectedHabitAtom } from "@/hooks/habits-atoms";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import { LoadingSpinner } from "./LoadingSpinner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function SortableHabitItem({
  habit,
  onDelete,
  onSelect,
}: {
  habit: { id: string; title: string; count: number };
  onDelete: () => void;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: habit.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="hover:bg-secondary p-2 rounded-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center" onClick={onSelect}>
          <div className="flex items-center justify-center gap-1">
            <div
              className="cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <div
              className={`flex items-center justify-center gap-1 text-lg ${habitCountColor(
                habit.count
              )}`}
            >
              <span>{habit.count > 65 && "🎉"}</span>
              <span>{habit.count}</span>
            </div>
            <span>{unslugify(habit.title)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="cursor-pointer"
                size="icon"
              >
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the habit &quot;
                  {unslugify(habit.title)}&quot; and all its data. This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={onDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const [habits, setHabits] = useAtom(habitsAtom);
  const [addingHabit, setAddingHabit] = useState(false);
  const addHabitRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const setSelectedHabit = useSetAtom(selectedHabitAtom);
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
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setHabits((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
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
                  id: generateRandomId(),
                  title: value,
                  count: 0,
                };
                setHabits((prev) => [...prev, newHabit]);
                e.target.value = "";
                router.push(`/habit/${newHabit.id}`);
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
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={habits.map((h) => h.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {habits.map((habit) => (
                      <SortableHabitItem
                        key={habit.id}
                        habit={habit}
                        onDelete={() => {
                          setHabits(
                            habits.filter((h) => h.id !== habit.id)
                          );
                          setSelectedHabit(null);
                          router.push(
                            `/habit/${
                              habits.find((h) => h.id !== habit.id)?.id ||
                              "1"
                            }`
                          );
                        }}
                        onSelect={() => {
                          setOpenMobile(false);
                          setSelectedHabit(habit.id);
                          router.push(`/habit/${habit.id}`);
                        }}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
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

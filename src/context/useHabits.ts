import { createContext, useContext } from "react";
import type { Habit } from "@/types/HabitTypes";
interface HabitContextType {
  habits: Habit[];
  addHabit: (hb: Habit) => void;
  removeHabit: (hbId: number) => void;
  toggleHabit: (hbId: number) => void;
}

export const HabitContext = createContext<HabitContextType | null>(null);

export function useHabit() {
  const ctx = useContext(HabitContext);
  if (!ctx)
    throw new Error("useHabit tem que ser utilizado dentro do HabitContext.");
  return ctx;
}

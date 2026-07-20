import { HabitContext } from "@/context/useHabits";
import { useEffect, useState } from "react";
import type { Habit } from "@/types/HabitTypes";

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habit, setHabit] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits ? JSON.parse(storedHabits) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habit));
  }, [habit]);

  function addHabit(hb: Habit) {
    setHabit((prevHabits) => [...prevHabits, hb]);
  }

  function removeHabit(hbId: number) {
    setHabit((prevHabits) => prevHabits.filter((hb) => hb.id !== hbId));
  }
  function toggleHabit(hbId: number) {
    setHabit((prevHabits) =>
      prevHabits.map((hb) =>
        hb.id === hbId ? { ...hb, check: !hb.check } : hb,
      ),
    );
  }

  return (
    <HabitContext.Provider
      value={{
        habits: habit,
        addHabit: addHabit,
        removeHabit: removeHabit,
        toggleHabit: toggleHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

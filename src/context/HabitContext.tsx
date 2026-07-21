import { HabitContext } from "@/context/useHabits";
import { useEffect, useState } from "react";
import type { Habit } from "@/types/HabitTypes";

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habit, setHabit] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    if (!storedHabits) return [];

    const parsedHabits: Habit[] = JSON.parse(storedHabits);
  
    const todayStr = new Date().toLocaleDateString("sv-SE");
    const yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterdayStr = yesterdayObj.toLocaleDateString("sv-SE");

    
    return parsedHabits.map((hb) => {
      const completedToday = hb.lastCompleted === todayStr;
      const completedYesterday = hb.lastCompleted === yesterdayStr;

      const check = completedToday ? hb.check : false;

      const isStreakActive = completedToday || completedYesterday;
      const streak = isStreakActive ? hb.streak : 0;
      const lastCompleted = isStreakActive ? hb.lastCompleted : null;

      return {
        ...hb,
        check,
        streak,
        lastCompleted,
      };
    });
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
    const today = new Date().toLocaleDateString("sv-SE");
    const yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterday = yesterdayObj.toLocaleDateString("sv-SE");

    setHabit((prevHabits) =>
      prevHabits.map((hb) => {
        if (hb.id !== hbId) return hb;

        const isCompleting = !hb.check;

        if (isCompleting) {
          
          if (hb.lastCompleted === today) {
            return { ...hb, check: true };
          }

          
          if (hb.lastCompleted === yesterday) {
            return {
              ...hb,
              check: true,
              lastCompleted: today,
              streak: hb.streak + 1,
            };
          }

          
          return {
            ...hb,
            check: true,
            lastCompleted: today,
            streak: 1,
          };
        } else {
          
          const newStreak = hb.streak > 0 ? hb.streak - 1 : 0;

          return {
            ...hb,
            check: false,
            streak: newStreak,
            lastCompleted: newStreak === 0 ? null : yesterday,
          };
        }
      })
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
import { HabitProvider } from "@/context/HabitContext";
import { useHabit } from "@/context/useHabits";

export function LayoutApp() {
  const { habits, addHabit } = useHabit();
  return (
    <>
      <button onClick={() => addHabit({ id: 1, name: "Estudar", category: "Estudo", check: false, streak: 0 })}>Adicionar Hábito</button>
      <div>{JSON.stringify(habits)}</div>
    </>
  );
}
export default function App() {
  return (
    <>
      <HabitProvider>
        <LayoutApp />
      </HabitProvider>
    </>
  );
}

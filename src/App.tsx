import { HabitProvider } from "@/context/HabitContext";
import AddHabit from "./components/AddHabit";

export function LayoutApp() {
  return (
    <>
      <AddHabit />
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

import { HabitProvider } from "@/context/HabitContext";
import HabitsPage from "@/page/HabitsPage";

export function LayoutApp() {
  return (
    <>
      <HabitsPage />
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

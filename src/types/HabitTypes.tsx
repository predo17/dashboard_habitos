export interface Habit {
  id: number;
  name: string;
  category: string;
  check: boolean;
  streak: number;
  lastCompleted: string | null;
}

import { useHabit } from "@/context/useHabits";
import { useState } from "react";

interface AddHabitProps {
  onHabitAdded: () => void;
}

const CATEGORY_OPTIONS = ["Saúde", "Estudo", "Exercicio", "Outro"];

export default function AddHabit({ onHabitAdded }: AddHabitProps) {
  const { habits, addHabit } = useHabit();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.trimStart();
    const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    setName(capitalized);
  }

  function addNewHabit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !category) {
      return alert("Preencha todos os campos");
    } else if (
      habits.some((hb) => hb.name === name && hb.category === category)
    ) {
      return alert("Hábito ja cadastrado");
    }
    addHabit({ id: Date.now(), name, category, check: false, streak: 0, lastCompleted: null });
    setName("");
    setCategory("");
    onHabitAdded();
  }

  return (
    <div className="container_add">
      <form onSubmit={addNewHabit}>
        <input
          name="name"
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder="nome"
        />
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

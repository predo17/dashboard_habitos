import { useState } from "react";
import { useHabit } from "@/context/useHabits";
import AddHabit from "./AddHabit";

export default function Habits() {
  const { habits, removeHabit, toggleHabit } = useHabit();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => setIsFormOpen(!isFormOpen);

  return (
    <main className="container_habits">
      <header>
        <h1>Dashboard de Hábitos</h1>
      </header>

      <section>
        <header>
          <h2>Meus Hábitos</h2>
          <p>Seus hábitos do dia a dia</p>
        </header>

        <div>
          <button className={isFormOpen ? "isOpen" : ""} onClick={toggleForm}>
            <span>+</span> Novo Hábito
          </button>

          {isFormOpen && <AddHabit onHabitAdded={toggleForm} />}

          {habits.length === 0 ? (
            <p className="empty-message">
              Você ainda não tem hábitos cadastrados. Adicione um acima!
            </p>
          ) : (
            <ul>
              {habits.map((habit) => (
                <li key={habit.id} className={habit.check ? "completed" : ""}>
                  <button
                    className={`status-checkbox ${habit.check ? "checked" : ""}`}
                    onClick={() => toggleHabit(habit.id)}
                    aria-label="Marcar como concluído"
                  />
                  <button
                    className={`${habit.check === true ? "delete-button" : "off"}`}
                    onClick={() => removeHabit(habit.id)}
                    aria-label="Excluir"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#fa0303"
                      viewBox="0 0 256 256"
                    >
                      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </button>
                  <strong>{habit.name}</strong>
                  <small>{habit.category}</small>
                  <span>{habit.streak} dias</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

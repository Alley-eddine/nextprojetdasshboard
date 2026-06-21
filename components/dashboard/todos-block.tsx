import { getTodos } from "@/lib/api";
import { BlockCard } from "./block-card";

export async function TodosBlock() {
  const todos = await getTodos();
  const doneCount = todos.filter((todo) => todo.completed).length;

  return (
    <BlockCard title="Todos" delayLabel="~3s">
      <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
        {doneCount} / {todos.length} terminées
      </p>
      <ul className="space-y-2">
        {todos.slice(0, 8).map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <span
              aria-hidden
              className={`flex size-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                todo.completed
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-zinc-300 dark:border-zinc-600"
              }`}
            >
              {todo.completed ? "✓" : ""}
            </span>
            <p
              className={`truncate text-sm ${
                todo.completed
                  ? "text-zinc-400 line-through dark:text-zinc-500"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              <span className="sr-only">
                {todo.completed ? "Terminée : " : "À faire : "}
              </span>
              {todo.title}
            </p>
          </li>
        ))}
      </ul>
    </BlockCard>
  );
}

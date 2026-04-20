"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type Filter = "all" | "active" | "completed";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Ship the demo", done: false },
    { id: "2", title: "Write release notes", done: true },
    { id: "3", title: "Fix the counter bug", done: false },
  ]);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "completed") return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => t.done).length;

  function addTodo() {
    const title = draft.trim();
    if (!title) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, done: false },
    ]);
    setDraft("");
  }

  function toggle(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function remove(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
        className="flex gap-2 border-b border-slate-200 p-4"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        >
          Add
        </button>
      </form>

      <ul className="divide-y divide-slate-100">
        <AnimatePresence initial={false}>
          {visible.map((t) => (
            <motion.li
              key={t.id}
              layout
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, x: -20, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 overflow-hidden px-4 py-3"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={t.done}
                onClick={() => toggle(t.id)}
                className={`relative flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition-colors ${
                  t.done
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-300 hover:border-slate-500"
                }`}
              >
                <motion.svg
                  viewBox="0 0 16 16"
                  className="h-3 w-3 text-white"
                  initial={false}
                  animate={t.done ? "checked" : "unchecked"}
                >
                  <motion.path
                    d="M3 8.5 L7 12 L13 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                      checked: { pathLength: 1, opacity: 1 },
                      unchecked: { pathLength: 0, opacity: 0 },
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                </motion.svg>
              </button>
              <motion.span
                animate={{
                  opacity: t.done ? 0.45 : 1,
                }}
                transition={{ duration: 0.18 }}
                className={`flex-1 ${t.done ? "line-through" : ""}`}
              >
                {t.title}
              </motion.span>
              <button
                onClick={() => remove(t.id)}
                aria-label="Delete"
                className="text-slate-400 transition-colors hover:text-red-600"
              >
                ✕
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-slate-400">
            Nothing here.
          </li>
        )}
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-4 py-3 text-sm">
        <span className="text-slate-500">{remaining} items left</span>
        <div className="flex gap-1">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-2 py-1 capitalize ${
                filter === f
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={clearCompleted}
          className="text-slate-500 hover:text-slate-900"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

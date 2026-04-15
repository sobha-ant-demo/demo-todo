import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-1 text-3xl font-bold">Demo Todo</h1>
      <p className="mb-6 text-sm text-slate-500">
        A tiny in-memory todo list. State resets on refresh.
      </p>
      <TodoList />
    </main>
  );
}

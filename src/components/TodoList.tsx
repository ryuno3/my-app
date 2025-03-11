import { prisma } from "@/lib/prisma/prismaClient";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

export default async function TodoList() {
  const todo = await prisma.todo.findMany();
  const isEmpty = todo.length === 0;

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-[600px]">
      <h1 className="text-4xl font-bold">Todolist</h1>
      <div className="grid grid-cols-1 gap-4">
        <TodoInput />
        {isEmpty && <p className="text-lg">No task</p>}
        {todo.map((t) => (
          <div key={t.id} className="grid grid-cols-2 gap-2">
            <TodoItem id={t.id} task={t.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

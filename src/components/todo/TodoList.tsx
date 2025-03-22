import { prisma } from "@/lib/prisma/prismaClient";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { Session } from "next-auth";

export default async function TodoList({ session }: { session: Session | null }) {
  if (!session?.user?.id) return null;

  const todos = await prisma.todo.findMany({
    where: { userId: { equals: session.user.id } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      completed: true,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-[600px]">
      <h1 className="text-4xl font-bold">Todolist</h1>
      <TodoForm userId={session.user.id} />
      <div className="grid grid-cols-1 gap-4">
        {todos.length === 0 ? (
          <p className="text-lg">No tasks</p>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} id={todo.id} task={todo.title} completed={todo.completed} />
          ))
        )}
      </div>
    </div>
  );
}

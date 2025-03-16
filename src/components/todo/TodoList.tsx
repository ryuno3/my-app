import { prisma } from "@/lib/prisma/prismaClient";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { TodoActionState } from "@/types/todo";
import { SessionProvider } from "next-auth/react";

const initialState: TodoActionState = {
  message: "",
  success: false,
};

export default async function TodoList() {
  try {
    const todo = await prisma.todo.findMany();
    const isEmpty = todo.length === 0;

    return (
      <div className="grid grid-cols-1 gap-4 w-full max-w-[600px]">
        <h1 className="text-4xl font-bold">Todolist</h1>
        <div className="grid grid-cols-1 gap-4">
          <SessionProvider>
            <TodoInput initialState={initialState} />
          </SessionProvider>
          {isEmpty && <p className="text-lg">No task</p>}
          {todo.map((t) => (
            <div key={t.id} className="grid grid-cols-2 gap-2">
              <TodoItem
                id={t.id}
                task={t.title}
                completed={t.completed}
                initialState={initialState}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return (
      <div className="text-center">
        <p className="text-red-500">Failed to load todos. Please try again later.</p>
      </div>
    );
  }
}

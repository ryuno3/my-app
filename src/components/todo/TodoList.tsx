import { prisma } from "@/lib/prisma/prismaClient";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { TodoActionState } from "@/types/todo";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const initialState: TodoActionState = {
  message: "",
  success: false,
};

export default async function TodoList({ session }: Readonly<{ session: Session | null }>) {
  if (!session?.user?.id) {
    console.log("No session or user ID");
    return (
      <div className="text-center">
        <p>Please sign in to view your todos.</p>
      </div>
    );
  }

  try {
    console.log("Querying todos for user ID:", session.user.id);

    const todo = await prisma.todo.findMany({
      where: {
        userId: {
          equals: session.user.id,
        },
      },
      select: {
        id: true,
        title: true,
        completed: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Found todos:", JSON.stringify(todo, null, 2));

    const isEmpty = todo.length === 0;

    return (
      <div className="grid grid-cols-1 gap-4 w-full max-w-[600px]">
        <h1 className="text-4xl font-bold">Todolist</h1>
        <div className="grid grid-cols-1 gap-4">
          <SessionProvider>
            <TodoInput initialState={initialState} />
          </SessionProvider>
          {isEmpty ? (
            <p className="text-lg">No task</p>
          ) : (
            todo.map((t) => (
              <div key={t.id} className="grid grid-cols-2 gap-2">
                <TodoItem
                  id={t.id}
                  task={t.title}
                  completed={t.completed}
                  initialState={initialState}
                />
              </div>
            ))
          )}
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

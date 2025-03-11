import { prisma } from "@/lib/prisma/prismaClient";
import { revalidateTag } from "next/cache";

interface TodoItemProps {
  id: string;
  task: string;
}

export default function TodoItem({ task, id }: TodoItemProps) {
  const deleteTodo = async () => {
    "use server";
    try {
      if (!task) {
        return;
      }
      await prisma.todo.delete({
        where: { id: id },
      });
    } catch (e) {
      console.log("error is ", e);
    }
    revalidateTag("todo");
  };

  const isCompleted = async () => {
    "use server";
    try {
      await prisma.todo.update({
        where: { id: id },
        data: { completed: true },
      });
    } catch (e) {
      console.log("error is ", e);
    }
    revalidateTag("todo");
  };

  return (
    <div>
      <form action={deleteTodo} className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" onChange={isCompleted} className="mr-2" />
          <span>{task}</span>
        </div>
        <button type="submit" className="p-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </form>
    </div>
  );
}

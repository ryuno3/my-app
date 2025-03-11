import { prisma } from "@/lib/prisma/prismaClient";
import { revalidateTag } from "next/cache";

export default async function TodoInput() {
  const addTodo = async (formdata: FormData) => {
    "use server";
    try {
      const task = formdata.get("task")?.toString();
      if (!task) {
        return;
      }
      await prisma.todo.create({
        data: { title: task },
      });
    } catch (e) {
      console.log("error is ", e);
    }
    revalidateTag("todo");
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <form action={addTodo} className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="task"
          placeholder="Add a new task"
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add
        </button>
      </form>
    </div>
  );
}

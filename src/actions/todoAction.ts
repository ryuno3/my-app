"use server";
import { prisma } from "@/lib/prisma/prismaClient";
import { TodoActionState } from "@/types/todo";
import { revalidateTag } from "next/cache";

export const checkCompleted = async (id: string, state: boolean) => {
  try {
    return await prisma.todo.update({
      where: { id: id },
      data: { completed: !state },
    });
  } catch (e) {
    console.error("Update処理でのエラー:", e);
  }
  revalidateTag("todo");
};

export const deleteTodo = async (
  _prevState: TodoActionState | undefined,
  formdata: FormData
): Promise<TodoActionState> => {
  try {
    const id = formdata.get("id") as string;

    if (!id) {
      return {
        message: "Task id is required",
        success: false,
      };
    }

    await prisma.todo.delete({
      where: { id: id },
    });
    revalidateTag("todo");
    return { message: "Task deleted successfully", success: true };
  } catch (e) {
    console.error("Delete処理でのエラー:", e);

    return { message: "Failed to delete task", success: false };
  }
};

export const addTodo = async (
  _prevState: TodoActionState | null,
  formdata: FormData
): Promise<TodoActionState> => {
  try {
    const task = formdata.get("task") as string;
    if (!task?.trim()) {
      return {
        message: "Task cannot be empty",
        success: false,
      };
    }
    await prisma.todo.create({
      data: { title: task },
    });
    revalidateTag("todo");
    return { message: "Task added successfully", success: true };
  } catch (e) {
    console.error("create処理でのエラー:", e);
    return { message: "Failed to add task", success: false };
  }
};

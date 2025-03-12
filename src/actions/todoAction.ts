"use server";
import { prisma } from "@/lib/prisma/prismaClient";
import { revalidateTag } from "next/cache";

export const checkCompleted = async (id: string, state: boolean) => {
  try {
    return await prisma.todo.update({
      where: { id: id },
      data: { completed: !state },
    });
  } catch (e) {
    console.log("error is ", e);
  }
  revalidateTag("todo");
};

export const deleteTodo = async (task: string, id: string) => {
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

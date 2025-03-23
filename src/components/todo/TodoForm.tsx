"use client";

import { addTodo } from "@/actions/todoAction";
import { TodoActionState } from "@/types/todo";
import { useActionState } from "react";

const initialState: TodoActionState = {
  message: "",
  success: false,
};

export default function TodoForm({ userId }: { userId: string }) {
  const [state, action, isPending] = useActionState(addTodo, initialState);

  return (
    <div className="grid grid-cols-1 gap-4">
      <form action={action} className="grid grid-cols-2 gap-2">
        <input type="hidden" name="userId" value={userId} />
        <input
          type="text"
          name="task"
          placeholder="Add a new task"
          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm sm:leading- dark:ring-gray-700"
          disabled={isPending}
        />
        <button
          type="submit"
          className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            isPending ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
          }`}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {state?.message && (
        <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>
          {state.message}
        </p>
      )}
    </div>
  );
}

"use client";

import { addTodo } from "@/actions/todoAction";
import { TodoActionState } from "@/types/todo";
import { useActionState } from "react";

const initialState: TodoActionState = {
  message: "",
  success: false,
};

export default function TodoInput() {
  const [state, action, isPending] = useActionState(addTodo, initialState);

  return (
    <div className="grid grid-cols-1 gap-4">
      <form action={action} className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="task"
          placeholder="Add a new task"
          className="p-2 border border-gray-300 rounded"
          disabled={isPending}
        />
        <button
          type="submit"
          className={`p-2 text-white rounded transition-colors ${
            isPending ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
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

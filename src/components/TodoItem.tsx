"use client";

import { deleteTodo, checkCompleted } from "@/actions/todoAction";
import { TodoItemProps } from "@/types/todo";
import { useActionState, useState } from "react";

export default function TodoItem({ task, id, completed, initialState }: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [state, action, isPending] = useActionState(deleteTodo, initialState);

  const handleCompleted = () => {
    const res = checkCompleted(id, isCompleted);
    if (!res) {
      throw new Error("Error in updating the task");
    }
    setIsCompleted(!isCompleted);
  };

  return (
    <div>
      <form action={action} className="grid grid-cols-2 gap-2">
        <input type="hidden" name="id" value={id} />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            onChange={handleCompleted}
            checked={isCompleted}
            className="mr-2"
          />
          <label htmlFor={`checkbox-${id}`}>
            <span className={`${isCompleted ? "line-through text-gray-400" : ""}`}>{task}</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isPending || !isCompleted} // ここが無効化条件
          className={`p-2 text-white rounded ${
            isPending || !isCompleted
              ? "bg-gray-400" // 無効時の色
              : "bg-red-500 hover:bg-red-600" // 有効時の色
          }`}
        >
          {isPending ? "Deleting..." : "Delete"}
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

"use client";

import { deleteTodo, checkCompleted } from "@/actions/todoAction";
import { useState } from "react";

interface TodoItemProps {
  id: string;
  task: string;
}

export default function TodoItem({ task, id }: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleDelete = () => {
    const res = deleteTodo(task, id);
    if (!res) {
      throw new Error("Error in deleting the task");
    }
  };

  const handleCompleted = () => {
    const res = checkCompleted(id, isCompleted);
    if (!res) {
      throw new Error("Error in updating the task");
    }
    setIsCompleted(!isCompleted);
  };

  return (
    <div>
      <form action={handleDelete} className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="checkbox" onChange={handleCompleted} className="mr-2" />
          <label htmlFor="checkbox">
            <span className={`${isCompleted ? "line-through text-gray-400" : ""}`}>{task}</span>
          </label>
        </div>
        <button type="submit" disabled={!isCompleted} className="p-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </form>
    </div>
  );
}

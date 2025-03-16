import TodoList from "../components/todo/TodoList";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <TodoList />
    </div>
  );
}

import { Header } from "@/components/layout/Header";
import TodoList from "@/components/todo/TodoList";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {session ? (
          <TodoList />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Todo App</h2>
            <p className="text-gray-600">Please sign in to manage your todos.</p>
          </div>
        )}
      </main>
    </div>
  );
}

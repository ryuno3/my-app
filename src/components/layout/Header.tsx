import Link from "next/link";
import SignOut from "../auth/SignOut";
import { Session } from "next-auth";

export async function Header({ session }: { session: Session | null }) {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Todo App
        </Link>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Welcome, {session.user.name || session.user.email}
              </span>
              <SignOut />
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/sign-in" className="text-sm font-semibold leading-6 text-gray-900">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

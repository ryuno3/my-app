"use client";

import { authenticate } from "@/actions/userAction";
import { UserActionState } from "@/types/user";
import Link from "next/link";
import { useActionState } from "react";

const initialState: UserActionState = {
  message: "",
  success: false,
};

export function SignIn() {
  const [state, action, isPending] = useActionState(authenticate, initialState);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={action}>
          {state?.message && (
            <div className={`p-4 rounded-md ${state.success ? "bg-green-50" : "bg-red-50"}`}>
              <p className={`text-sm ${state.success ? "text-green-700" : "text-red-700"}`}>
                {state.message}
              </p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isPending}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm sm:leading-6"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isPending}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              isPending ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/sign-up"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}

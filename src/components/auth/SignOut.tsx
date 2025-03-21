"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Sign out
    </button>
  );
}

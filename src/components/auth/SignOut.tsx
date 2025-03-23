"use client";

import { signOut } from "next-auth/react";
import { useActionState } from "react";

export default function SignOut() {
  const handleSignOut = async () => {
    try {
      await signOut();
      return "Sign Out";
    } catch (e) {
      console.log(e);

      return "Error";
    }
  };
  const [state, action, isPending] = useActionState(handleSignOut, "SignOut");

  return (
    <button
      onClick={action}
      disabled={isPending}
      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {state}
    </button>
  );
}

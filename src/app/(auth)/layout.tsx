"use client";

import { AuthProvider } from "@/components/auth/AuthProvider";
import ClientOnly from "@/components/auth/ClientOnly";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientOnly>
      <AuthProvider>{children}</AuthProvider>
    </ClientOnly>
  );
}

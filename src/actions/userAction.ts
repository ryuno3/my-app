"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma/prismaClient";
import { UserActionState } from "@/types/user";
import { hashPassword } from "@/utils/auth/password";
import { redirect } from "next/navigation";

export const addUser = async (
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      message: "All fields are required",
      success: false,
    };
  }

  const hashedPassword = await hashPassword(password);
  try {
    const res = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    console.log(res);

    return { message: "Account created successfully", success: true };
  } catch (e) {
    console.error("User creation error:", e);

    return { message: "Failed to create account", success: false };
  } finally {
    redirect("/");
  }
};

export const authenticate = async (
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  const hashedPassword = await hashPassword(password);

  if (!user || !user.password) {
    return {
      message: "Invalid email or password",
      success: false,
    };
  }

  const isValid = password === hashedPassword;

  if (!isValid) {
    return {
      message: "Invalid email or password",
      success: false,
    };
  }

  try {
    const result = await signIn("credentials", {
      email: email,
      password: hashedPassword,
      redirect: false,
    });

    if (result?.error) {
      return {
        message: "Invalid email or password",
        success: false,
      };
    }

    return {
      message: "Signed in successfully",
      success: true,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      message: "An error occurred during sign in",
      success: false,
    };
  }
};

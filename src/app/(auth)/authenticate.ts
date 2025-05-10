"use server";

import { auth } from "@/lib/auth";

export async function emailPasswordAuth(
  email: string,
  password: string,
  type: "sign-in" | "sign-up",
  name?: string | null
) {
  if (type === "sign-in") {
    return await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } else {
    return await auth.api.signUpEmail({
      body: {
        name: name ?? "John Doe",
        email,
        password,
      },
    });
  }
}

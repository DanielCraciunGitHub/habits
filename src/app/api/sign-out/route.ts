import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export const GET = async (request: Request) => {
  await auth.api.signOut({
    headers: await headers(),
  });
  return NextResponse.redirect(new URL("/sign-in", request.url));
};

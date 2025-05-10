import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);

  if (sessionCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
};

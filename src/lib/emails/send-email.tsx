"use server";

import type { ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(
  recipient: string,
  subject: string,
  body: ReactNode
) {
  const { error } = await resend.emails.send({
    // ? Change this name
    from: "DevMarket <hello@devmarket.pro>",
    to: recipient,
    subject,
    react: body,
  });

  if (error) {
    throw new Error(error.message);
  }
}

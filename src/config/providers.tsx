"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

export default function Providers({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ThemeProviderProps) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}

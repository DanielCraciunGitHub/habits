"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({
  children,
  ...props
}: {
  children: React.ReactNode;
} & ThemeProviderProps) {
  return (
    <SidebarProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </SidebarProvider>
  );
}

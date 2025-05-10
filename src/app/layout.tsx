import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

import { baseMetadata, baseViewport } from "@/config/metadata";
import Providers from "@/config/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          {children}
        </Providers>
        {/* ? Google Analytics */}
        <GoogleAnalytics gaId="" />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  ...baseMetadata,
};
export const viewport: Viewport = {
  ...baseViewport,
};

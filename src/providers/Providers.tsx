"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme={`dark`} attribute={`class`}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}

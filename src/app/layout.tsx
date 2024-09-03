import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import ThemeSwitcher from "@ui/ThemeSwitcher";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `Chat Fusion`, template: `%s | Chat Fusion` },
  description: `Connect instantly with friends and family. Our real-time chat app (Chat Fusion) offers seamless messaging, group chats, and more. Experience fast, fun, and free communication.`,
  creator: `Chetan Seervi`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={`en`} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <Providers>
          <Toaster
            position={`top-center`}
            richColors
            duration={5000}
            theme={`system`}
            className={`text-pretty`}
          />
          {children}

          <div className={`fixed right-5 top-5`}>
            <ThemeSwitcher />
          </div>
        </Providers>
      </body>
    </html>
  );
}

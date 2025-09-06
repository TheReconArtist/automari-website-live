import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CircuitBackground from "@/components/CircuitBackground/CircuitBackground"; // Import the new CircuitBackground component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automari - AI Automation Agency",
  description: "Transform your business with cutting-edge AI automation solutions from Automari.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CircuitBackground intensity={0.18} speed={1.0} interactive={true} /> {/* Integrate CircuitBackground */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

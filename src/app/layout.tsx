import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/context/demo-context";
import { ThemeProvider } from "@/context/theme-context";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Operating System | Vista",
  description: "Vista-branded Product Operating System demo showcasing four engines: Diagnostic, Prioritization, Execution, and Governance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <DemoProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </DemoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

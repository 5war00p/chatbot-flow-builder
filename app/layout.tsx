import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

import "reactflow/dist/style.css";
// Overriding reactflow styles with tailwind styles by adding import line bottom to the reactflow import
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot Flow Builder",
  description: "A node based UI for Chatbot flow with React-flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

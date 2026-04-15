import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Todo",
  description: "A tiny todo app for demo purposes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

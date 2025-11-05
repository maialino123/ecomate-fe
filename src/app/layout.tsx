import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoMate - Sustainable Living Made Easy",
  description: "Join thousands making a positive impact on the planet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

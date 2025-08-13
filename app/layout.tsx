import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { CartProvider } from "@/providers/CartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quick Shop",
  description: "E-commerce demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

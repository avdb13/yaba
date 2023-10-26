import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { wrapper } from "@/reducers/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yaba",
  description: "Yet Another Blog App!",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default wrapper.withRedux(RootLayout);

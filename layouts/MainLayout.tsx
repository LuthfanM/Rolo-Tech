"use client";

import React from "react";
import { Header } from "@/components/headers/Header";
import { CartProvider } from "@/providers/CartContext";

type MainLayoutProps = {
  children: React.ReactNode;
  footerContent?: React.ReactNode;
};

const MainLayout = ({ children, footerContent }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full px-[40px] py-[40px]">
        {children}
      </main>
      {footerContent}
    </div>
  );
};

export default MainLayout;

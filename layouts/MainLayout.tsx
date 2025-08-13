"use client";

import React from "react";
import { Header } from "@/components/headers/Header";
import { Toaster } from "sonner";

type MainLayoutProps = {
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  hideHeader?: boolean;
};

const MainLayout = ({
  children,
  footerContent,
  hideHeader,
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1 mx-auto w-full px-[40px] py-[40px]">
        {children}
      </main>
      {footerContent}
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default MainLayout;

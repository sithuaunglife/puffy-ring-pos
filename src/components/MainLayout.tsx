"use client";

import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage }) => {
  return (
    <>
      <Header currentPage={currentPage} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;

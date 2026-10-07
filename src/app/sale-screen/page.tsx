import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ModuleLinkList from "@/components/Sidebar";
import SaleScreenSection from "@/features/sale-screen/components/SaleSection";
import React from "react";

const page = () => {
  return (
    <div>
      <Header currentPage="sale-screen" />
      <div className="flex">
        {" "}
        <Sidebar />
        <SaleScreenSection />
      </div>
    </div>
  );
};

export default page;

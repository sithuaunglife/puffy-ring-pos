import Header from "@/components/Header";
import ModuleLinkList from "@/components/Sidebar";
import SaleScreenSection from "@/features/sale-screen/components/SaleSection";
import React from "react";

const page = () => {
  return (
    <div>
      <Header currentPage="sale-screen" />
      <ModuleLinkList />
      <SaleScreenSection />
    </div>
  );
};

export default page;

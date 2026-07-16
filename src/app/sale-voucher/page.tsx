import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SaleVoucherSection from "@/features/sale-voucher/components/SaleVoucherSection";
import React from "react";

const VouchersPage = () => {
  return (
    <div>
      <Header currentPage="voucher" />
      <div className="flex">
        <Sidebar />
        <SaleVoucherSection />
      </div>
    </div>
  );
};

export default VouchersPage;

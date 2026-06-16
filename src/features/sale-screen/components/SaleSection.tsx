import ModuleLinkList from "@/components/Sidebar";
import React from "react";

type Props = {};

const SaleScreenSection = (props: Props) => {
  return (
    <section className="container mx-auto py-3  flex flex-col gap-4">
      <div className=" grid grid-cols-6 gap-4">
        <div className=" col-span-4 flex flex-col gap-4">
          <div className=" flex justify-between">
            <SaleCategoryList />
            <div className=" max-w-64">
              <SaleMenuSearchInput />
            </div>
          </div>
          <SaleMenuList />
        </div>
        <div className=" col-span-2">
          <VoucherSection />
        </div>
      </div>
    </section>
  );
};

export default SaleScreenSection;

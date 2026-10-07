import ModuleLinkList from "@/components/Sidebar";
import React from "react";
import SaleCategoryList from "./SaleCategoryList";
import SaleMenuSearchInput from "@/components/SaleMenuSearchInput";
import SaleMenuList from "./SaleMenuList";

type Props = {};

const SaleScreenSection = (props: Props) => {
  return (
    <section className="w-full py-3">
      <div className=" grid grid-cols-6 gap-4">
        <div className="mx-3 my-3 col-span-5 flex flex-col gap-4">
          <div className=" flex justify-between">
            <SaleCategoryList />
          </div>
          <div className=" max-w-64 flex">
            <SaleMenuSearchInput />
          </div>
          <div className="flex flex-col">
            <SaleMenuList />
          </div>
        </div>
        <div className=" col-span-2">{/* <VoucherSection />  */}</div>
      </div>
    </section>
  );
};

export default SaleScreenSection;

"use client";

import SaleCategoryListItem from "./SaleCategoryListItem";
import useCategoryStore from "@/stores/useCategoryStore";

function SaleCategoryList() {
  const categories = useCategoryStore((state) => state.categories);

  return (
    <div className="flex items-center gap-2">
      <SaleCategoryListItem isAll />

      {categories.map((category) => (
        <SaleCategoryListItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default SaleCategoryList;

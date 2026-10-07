"use client";

import useMenuStore from "@/stores/useMenuStore";
import SaleMenuListItem from "./SaleMenuListItem";
import { useSearchParams } from "next/navigation";

function SaleMenuList() {
  const products = useMenuStore((state) => state.products);
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q") ?? "";

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!filteredProducts.length) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        {searchQuery ? (
          <>
            No results found for{" "}
            <span className="font-medium">"{searchQuery}"</span>
          </>
        ) : (
          "No menu available"
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <SaleMenuListItem key={product.id} menu={product} />
      ))}
    </div>
  );
}

export default SaleMenuList;

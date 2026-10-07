"use client";

import { Badge } from "@/components/ui/badge";
import useVoucherStore from "@/stores/useVoucherStore";
import { MenuDetailType } from "@/types/MenuTypes";
import { Plus } from "lucide-react";
import Image from "next/image";

type Props = {
  menu: MenuDetailType;
};

function SaleMenuListItem({ menu }: Props) {
  const orderItems = useVoucherStore((state) => state.orderItems);
  const addOrder = useVoucherStore((state) => state.addOrder);

//   const existing = orderItems.find(
//     (orderItem) => orderItem.menu_id === menu.id,
//   );

  const handleClick = () => {
    addOrder({
      menu,
      menu_id: menu.id,
      quantity: 1,
    });
  };

  return (
    <div
    //   className={`${
    //     existing ? "border border-primary" : "border"
    //   } relative flex flex-col duration-100 active:scale-95`}
      onClick={handleClick}
    >
      <Image
        width={200}
        height={200}
        src={menu.image}
        className="h-24 w-full bg-muted object-cover object-center"
        alt=""
      />

      <span className="absolute right-1 top-1 bg-primary/20 p-1 text-xs text-primary">
        {menu.category.title}
      </span>

      <div className="p-1">
        <p className="text-sm">{menu.title}</p>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {menu.price} / {menu.unit}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SaleMenuListItem;

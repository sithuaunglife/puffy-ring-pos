"use client";

import { Button } from "@/components/ui/button";
import { CategoryDetailType } from "@/types/CategoryTypes";
import useCategoryStore from "@/stores/useCategoryStore";

type Props = { isAll: true } | { isAll?: false; category: CategoryDetailType };

function SaleCategoryListItem(props: Props) {
    const activeCategory = useCategoryStore((state) => state.activeCategory);

    const selectCategory = useCategoryStore((state) => state.selectCategory);

    const handleClick = () => {
        if (props.isAll) {
            selectCategory("All");
        } else {
            selectCategory(props.category.id.toString());
        }
    };

    const isActive = props.isAll
        ? activeCategory === "All"
        : activeCategory === props.category.id.toString();

    return (
        <Button
            onClick={handleClick}
            size="xs"
            className={`border-pink-500 text-black bg-white p-4 ${isActive? "bg-pink-500": ""}`}
    >
      {props.isAll ? "All Items" : props.category.title}
    </Button>
  );
}

export default SaleCategoryListItem;

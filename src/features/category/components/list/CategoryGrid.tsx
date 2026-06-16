"use client";

import { Card } from "@/components/ui/card";
import useCategoryStore from "@/stores/useCategoryStore";
import { CategoryDetailType } from "@/types/CategoryTypes";
import { Button } from "@base-ui/react";
import { Edit, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
 category: CategoryDetailType
}

function CategoryGrid() {
  const categories = useCategoryStore((state) => state.categories);

  const hasHydrated = useCategoryStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex gap-25">
        {/* Add New */}
        <Link
          href="/dashboard/categories/create"
          className="flex flex-col items-center gap-2 shrink-0"
        >
          <Card className="flex h-40 w-40 items-center justify-center border-2 border-dashed bg-transparent shadow-none hover:border-pink-500">
            <Plus size={40} className="text-muted-foreground" />
          </Card>

          <p className="text-sm">Add new</p>
        </Link>

        {/* Categories */}
        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between items-center rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md"
            >
              <h3 className="font-medium">{category.title}</h3>
              <div className="flex gap-4">
                <Edit />
                <Trash2 />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryGrid;

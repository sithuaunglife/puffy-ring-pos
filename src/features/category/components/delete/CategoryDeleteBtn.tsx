"use client";

import { AlertDelete } from "@/components/AlertDelete";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { categoryApiUrl, deleteCategory } from "@/services/categoryService";
import useCategoryStore from "@/stores/useCategoryStore";
import { CategoryDetailType } from "@/types/CategoryTypes";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";


type Props = {
    id: number;
};

function CategoryDeleteBtn({ id }: Props) {
const { deleteCategory } = useCategoryStore();
  const handleDelete = () => {
    deleteCategory(id);
    toast.success("Category deleted successfully");
  };

  return (
    <AlertDelete
      onDelete={handleDelete}
      title="Delete Category?"
      description="Are you sure you want to delete this category? This action cannot be undone!"
    />
  );
}

export default CategoryDeleteBtn;

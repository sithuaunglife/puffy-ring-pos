import { z } from "zod";
import { categoryCreateFormSchema } from "@/features/category/hooks/useCategoryCreate";

export type CategoryCreateFormValues = z.infer<typeof categoryCreateFormSchema>;

export type CategoryDetailType = {
  id: number;
  title: string;
};

import z from "zod";
import { User } from "./UserTypes";
import { categoryCreateFormSchema } from "@/modules/category/hooks/useCategoryCreate";
import { categoryEditFormSchema } from "@/modules/category/hooks/useCategoryEdit";

export type CategoryCreateFormValues = z.infer<typeof categoryCreateFormSchema>;
export type CategoryEditFormValues = z.infer<typeof categoryEditFormSchema>;

export type CategoryStorePayloadValues = Omit<
  CategoryCreateFormValues,
  "confirm" | "stay_here"
>;

export type CategoryUpdatePayloadValues = Omit<
  CategoryEditFormValues,
  "confirm" | "stay_here"
>;

export type CategoryDetailType = CategoryStorePayloadValues & {
  id: number;
  title: string;
};

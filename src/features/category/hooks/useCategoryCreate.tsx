import useCategoryStore from "@/stores/useCategoryStore";
import { CategoryCreateFormValues } from "@/types/CategoryTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const categoryCreateFormSchema = z.object({
  title: z.string().min(1, "Category Name is required"),
  confirm: z.boolean().refine((val) => val === true, {
    message: "You must check to create new category"
  }),
});

function useCategoryCreate() {
  const { addCategory } = useCategoryStore();
  const form = useForm<CategoryCreateFormValues>({
    resolver: zodResolver(categoryCreateFormSchema),
    defaultValues: {
      title: "",
      confirm: false,
    },
  });

  const router = useRouter();

  const onSubmit = (formData: CategoryCreateFormValues) => {
    const {  confirm, ...payload } = formData;

    addCategory({
      id: Date.now(), // or another way to generate unique ids
      ...payload,
    });

    toast.success("Category created successfully");

    form.reset();

    router.push(`/categories`) // It is use here instead of component level with <Link> to submit data here and go to that route

  };

  return {
    ...form,
    onSubmit,
  };
}

export default useCategoryCreate;

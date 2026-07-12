import { Suspense } from "react";
import CategoryGrid from "../list/CategoryTable";
import CategoryCreateForm from "./CategoryCreateForm";

function CategoryCreateSection() {
  return (
    <section className="container mx-auto py-8 px-9 flex flex-col gap-4">
      <div className="">
        <h3 className=" text-xl font-semibold mb-9">Create New Category</h3>
      </div>
      <Suspense>
        <CategoryCreateForm />
      </Suspense>
    </section>
  );
}

export default CategoryCreateSection;

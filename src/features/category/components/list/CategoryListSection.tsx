import { Suspense } from "react";
import CategoryGrid from "./CategoryGrid";

function CategoryListSection() {
  return (
    <section className="container mx-auto py-8 px-9 flex flex-col gap-4">
      <div className="">
        <h3 className=" text-xl font-semibold mb-9">Category List</h3>
      </div>
      <Suspense>
        <CategoryGrid />
      </Suspense>
    </section>
  );
}

export default CategoryListSection;

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryCreateSection from "@/features/category/components/create/CategoryCreateSection";
import CategoryListSection from "@/features/category/components/list/CategoryListSection";

function page() {
  return (
    <>
      <Header currentPage="category" />
      <div className="flex">
        <Sidebar />
        <CategoryCreateSection />
      </div>
      {/* Use flex layout (div) so the content section appears beside the sidebar */}
    </>
  );
}

export default page;

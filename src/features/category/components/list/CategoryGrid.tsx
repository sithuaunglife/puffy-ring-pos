"use client";

import { Card } from "@/components/ui/card";
import useCategoryStore from "@/stores/useCategoryStore";
import { CategoryDetailType } from "@/types/CategoryTypes";
import { Button } from "@base-ui/react";
import { Edit, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  category: CategoryDetailType;
};

function CategoryGrid() {
  const { categories, hasHydrated, editCategory, deleteCategory } =
    useCategoryStore();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleSave = () => {
    if (editingId === null) return;

    editCategory(editingId, editingTitle);

    setEditingId(null);
    setEditingTitle("");
  };

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  // const handleClick = (id: number) => {
  //   editCategory(id, "New Title")
  // }

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

        {/* # Problem */}
        {/* Display the categories on UI */}
        {/* Display it while looping the UI */}

        {/* Steps */}
        {/* Map the jsx to return those components */}
        {/* Key is needed when re rendering those jsx */}
        {/* Map those whole id, title and div */}

        {/* Categories */}
        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between items-center rounded-xl border bg-card p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="grid grid-cols-1">
                {editingId === category.id ? (
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyUp={(e) => e.key === "Enter" && handleSave()}
                    autoFocus
                    className="border rounded bg-transparent outline-stone-500"
                  />
                ) : (
                  <h3>{category.title}</h3>
                )}
              </div>
              <div className="flex gap-4">

                {/* # Problem */}
                {/* Makes the category editable  */}
                {/* When user click the pencil the input box appear and the category is editable*/}

                {/* # Step */}
                {/* Create the input field to edit the category */}
                {/* Use state make react remember what have clicked before re-render */}
                {/* The react state equal with category.id and boolean works if it equal return true and display the input field if false return the category.title */}
                {/* Write handleSave to when clicking setEditingId and set it to category.id to save the  */}
                {/* Pencil icon is to trigger the state */}
                {/* Write onClick logic supply by zustand to use the edit category logic */}

                <Edit
                  onClick={() => {
                    setEditingId(category.id);
                    // When I click the pencil, I store the clicked category's id in editingId. After React re-renders, each category compares its own category.id with editingId. If they match, React renders the input; otherwise, it renders the title.
                    setEditingTitle(category.title);
                  }}
                />

                {/* # Problem */}
                {/* Delete the category */}
                {/* When user click the trash icon it delete*/}

                {/* # Step */}
                {/* Make state of deleting first and point it to the id of category id */}
                {/* Make delete category with zustand first  */}
                {/* make state for id and title since it need to re-render */}
                {/* delete icon is to trigger the state */}
                {/* Write onClick logic supply by zustand to use the edit category logic */}
                <Trash2
                  onClick={() => {
                    deleteCategory(category.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryGrid;

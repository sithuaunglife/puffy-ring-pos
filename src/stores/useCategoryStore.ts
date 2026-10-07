import { persist } from "zustand/middleware";
import { create } from "zustand";
import { CategoryDetailType } from "@/types/CategoryTypes";

type CategoryState = {
  hasHydrated: boolean;
  categories: CategoryDetailType[]; // Add [] to indicate this type is an array of CategoryDetailType objects
  activeCategory: string;
  setHasHydrated: (state: boolean) => void;
  addCategory: (newCategory: CategoryDetailType) => void;
  selectCategory: (newCategory: string) => void;
  deleteCategory: (id: number | string) => void;
  editCategory: (id: number | string, newTitle: string) => void;
};

const useCategoryStore = create<CategoryState>()(
  // add extra () to match the Zustand persist version with typescript
  // <CategoryState> is generic type to match the typescript type
  persist(
    (set) => {
      return {
        hasHydrated: false,

        setHasHydrated: (state) =>
          set({
            hasHydrated: state,
          }),

        categories: [
          { id: 0, title: "All Items" },
          { id: 1, title: "Donuts" },
          { id: 2, title: "Hot Drinks" },
          { id: 3, title: "Cold Drinks" },
          { id: 4, title: "Toppings" },
          { id: 5, title: "Combos" },
        ],

        activeCategory: "All",

        addCategory: (newCategory) =>
          set((oldState) => ({
            categories: [...oldState.categories, newCategory],
          })),

        selectCategory: (newCategory) => set({ activeCategory: newCategory }),

        deleteCategory: (id) =>
          set((oldState) => ({
            categories: oldState.categories.filter(
              (category) => category.id !== id,
            ),
          })),

        editCategory: (id, newTitle) =>
          set((oldState) => ({
            categories: oldState.categories.map((category) =>
              category.id === id ? { ...category, title: newTitle } : category,
            ),
          })),
      }; 
    },
    {
      name: "category-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useCategoryStore;

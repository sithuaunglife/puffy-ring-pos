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
          { id: 0, title: "All" },
          { id: 1, title: "Bread" },
          { id: 2, title: "Cake" },
          { id: 3, title: "Coffee" },
          { id: 4, title: "Smoothie" },
        ],

        activeCategory: "All",

        addCategory: (newCategory) => set((oldState) => ({
          categories: [...oldState.categories, newCategory],
        })),

        selectCategory: (newCategory) => set({ activeCategory: newCategory }),

        deleteCategory: (id) =>
          set((oldState) => ({
            categories: oldState.categories.filter(
              (category) => category.id !== id
            ),
          })),

          editCategory: (id, newTitle) =>
          set((oldState) => ({
            categories: oldState.categories.map((category) =>
              category.id === id ? { ...category, title: newTitle } : category
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

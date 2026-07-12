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

  editCategory: (id: number, title: string) => void;

  deleteCategory: (id: number) => void;
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

        // Implementation of add Category
        // [...] spread oldState to categories making a new array of Category
        // addCategory: (
        //   newCategory, // This is outer function
        // ) =>
        //   set((oldState) => ({
        //     // This is inner function
        //     categories: [...oldState.categories, newCategory],
        //     // Inner function can access:
        //     // oldState (its own parameter)
        //     // newCategory (outer parameter)
        //   })),

        // Implementation of editCategory
        // Goal: Edit only the category title

        // 1. Create an editCategory function.
        // 2. Use set() to update the Zustand state.
        // 3. Use map() to create a new array (React/Zustand use immutable updates).
        // 4. Check if the current category's id matches the function parameter id.
        // 5. If it matches, spread the existing category and overwrite the title.
        // 6. Otherwise, return the original category unchanged.

        editCategory: (id, title) =>
          set((state) => ({
            // set is used here to set the state of categories. It is similar to setState from react
            categories: state.categories.map(
              (
                category, // map is used here to return the new array since react use immutable way
              ) => (category.id === id ? { ...category, title } : category), // category.id === id is if the id of category match the id of editCategory parameter. {...category, title} spreads the old category and change the title
            ),
          })),


        // Problem
        // Delete the category

        // Steps
        // set the category first
        // filter the category
        // If category.id is not same as parameter id remove it

        deleteCategory: (id) => set((state)=> ({
            categories: state.categories.filter((category) => category.id !== id ),
        })),

        // Problem
        // Add the category

        // Steps
        // create the addCategory function
        // set the state first
        // Spread the category of array and add newCategory
        // make sure the category id match the parameter id
        // return the category

        addCategory: (newCategory) => set((state)=> ({categories: [...state.categories, newCategory],})),

        }
      },
    {
      name: "category-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        // checking if there is data for state?.
      },
    },
  ),
);

export default useCategoryStore;

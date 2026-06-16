import React from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set, get) => ({
      hasHydrated: false,

      setHasHydrated: (state) =>
        set({
          hasHydrated: state,
        }),
      products: [
        {
          id: 1,
          category: "Bread",
          title: "Strawberry filling Croissant",
          price: 9000,
          image: "/images/1.png",
        },
        {
          id: 2,
          category: "Bread",
          title: "Pistachio Croissant",
          price: 12000,
          image: "/images/2.png",
        },
        {
          id: 3,
          category: "Bread",
          title: "Strawberry Croissant",
          price: 8500,
          image: "/images/3.png",
        },
        {
          id: 4,
          category: "Bread",
          title: "Egg Sandwich",
          price: 7000,
          image: "/images/4.png",
        },

        {
          id: 5,
          category: "Bread",
          title: "Strawberry Sandwich",
          price: 9000,
          image: "/images/5.png",
        },
        {
          id: 6,
          category: "Bread",
          title: "Matcha Strawberry Sandwich",
          price: 9500,
          image: "/images/6.png",
        },
        {
          id: 7,
          category: "Bread",
          title: "Strawberry Stick",
          price: 9000,
          image: "/images/7.png",
        },
        {
          id: 8,
          category: "Bread",
          title: "Strawberry Cinnamon Rolls",
          price: 8000,
          image: "/images/8.png",
        },

        {
          id: 9,
          category: "Bread",
          title: "Matcha Cinnamon Rolls",
          price: 8000,
          image: "/images/9.png",
        },
        {
          id: 10,
          category: "Bread",
          title: "Red Velvet Cinnamon Rolls",
          price: 8000,
          image: "/images/10.png",
        },
        {
          id: 11,
          category: "Bread",
          title: "Cinnamon Rolls",
          price: 8000,
          image: "/images/11.png",
        },
        {
          id: 12,
          category: "Bread",
          title: "Berry Bread",
          price: 10000,
          image: "/images/12.png",
        },

        {
          id: 13,
          category: "Cake",
          title: "New York Chocolate Cake",
          price: 20000,
          image: "/images/13.png",
        },

        {
          id: 14,
          category: "Cake",
          title: "Strawberry Chocolate Cake",
          price: 14000,
          image: "/images/14.png",
        },
        {
          id: 15,
          category: "Cake",
          title: "Cherry Cake",
          price: 16000,
          image: "/images/15.png",
        },
        {
          id: 16,
          category: "Cake",
          title: "Matcha Burnt Cheese Cake",
          price: 16000,
          image: "/images/16.png",
        },
        {
          id: 17,
          category: "Cake",
          title: "Matcha Mochi Cake",
          price: 12000,
          image: "/images/17.png",
        },
        {
          id: 18,
          category: "Cake",
          title: "Strawberry Short Cake",
          price: 14000,
          image: "/images/18.png",
        },
        {
          id: 19,
          category: "Cake",
          title: "Matcha Crepe Cake",
          price: 16000,
          image: "/images/19.png",
        },
        {
          id: 20,
          category: "Cake",
          title: "Strawberry Matcha Crepe Cake",
          price: 16000,
          image: "/images/20.png",
        },
        {
          id: 21,
          category: "Cake",
          title: "Strawberry Pistachio Crepe Cake",
          price: 17000,
          image: "/images/21.png",
        },
        {
          id: 22,
          category: "Cake",
          title: "Tiramisu Cake",
          price: 10000,
          image: "/images/22.png",
        },
        {
          id: 23,
          category: "Coffee",
          title: "Latte",
          price: 8500,
          image: "/images/23.png",
        },
        {
          id: 24,
          category: "Coffee",
          title: "Cat Latte",
          price: 9000,
          image: "/images/24.png",
        },
        {
          id: 25,
          category: "Coffee",
          title: "Pink Latte",
          price: 9000,
          image: "/images/25.png",
        },
        {
          id: 26,
          category: "Coffee",
          title: "Dalgona Coffee",
          price: 9000,
          image: "/images/26.png",
        },
        {
          id: 27,
          category: "Coffee",
          title: "Espresso",
          price: 9000,
          image: "/images/27.png",
        },
        {
          id: 28,
          category: "Coffee",
          title: "Mocha",
          price: 8500,
          image: "/images/28.png",
        },
        {
          id: 29,
          category: "Smoothie",
          title: "Mixed Berry Smoothie",
          price: 8000,
          image: "/images/29.png",
        },
        {
          id: 30,
          category: "Smoothie",
          title: "Strawberry Smoothie",
          price: 7500,
          image: "/images/30.png",
        },
        {
          id: 31,
          category: "Smoothie",
          title: "Raspberry Smoothie",
          price: 7500,
          image: "/images/31.png",
        },
        {
          id: 32,
          category: "Smoothie",
          title: "Avocado Smoothie",
          price: 7500,
          image: "/images/32.png",
        },
        {
          id: 33,
          category: "Smoothie",
          title: "Mango Smoothie",
          price: 7500,
          image: "/images/33.png",
        },
      ],
      addProduct: (newProduct) =>
        set((state) => ({ products: [...state.products, newProduct] })),
      productDrawerStatus: false,
      setProductDrawerStatus: (newStatus) =>
        set({ productDrawerStatus: newStatus }),

      filteredProducts: (category, keyword) => {
        const { products } = get();
        return products
          .filter((el) => category === "All" || el.category === category)
          .filter(
            (el) => el.title.toLowerCase().search(keyword.toLowerCase()) != -1,
          );
      },
      q: "",
      setQ: (keyword) => set({ q: keyword }),
    }),
    {
      name: "product-storage",
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    },
  ),
);

export default useProductStore;

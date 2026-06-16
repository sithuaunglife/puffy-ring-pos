import { generateVoucherId } from "@/utils/voucher";
import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVoucherStore = create(
  persist(
    (set, get) => ({
      items: [], // id: Date.now(), product: { id, title, price }, quantity: 1, It is stored here
      hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          hasHydrated: state,
        });
      },
      addItem: (newItem) =>
        set((state) => ({ items: [...state.items, newItem] })),
      updateQuantity: (id, amount) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + amount }
              : item,
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id != id),
        })),
      information: {
        voucherId: generateVoucherId(),
        date: dayjs().format("DD/MM/YYYY"),
        time: dayjs().format("h:mm:ss A"),
      },
      reset: () =>
        set({
          items: [],
          information: {
            voucherId: generateVoucherId(),
            date: dayjs().format("DD/MM/YYYY"),
            time: dayjs().format("h:mm:ss A"),
          },
        }),
    }),
    {
      name: "velix-pos-storage",
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    },
  ),
);

export default useVoucherStore;

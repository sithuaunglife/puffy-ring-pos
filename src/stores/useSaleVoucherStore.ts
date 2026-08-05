import { persist } from "zustand/middleware";
import { create } from "zustand";
import { Voucher } from "@/types/VoucherTypes";

type SaleVoucherState = {
  hasHydrated: boolean;
  vouchers: Voucher[];
  setHasHydrated: (state: boolean) => void;
  removeVoucher: (id: string) => void;
  clearVouchers: () => void;
};

const useSaleVoucherStore = create<SaleVoucherState>()(
  persist(
    (set) => ({
      hasHydrated: false,

      setHasHydrated: (state) =>
        set({
          hasHydrated: state,
        }),

      vouchers: [
        { id: "1", invoiceId: "INV-20260316-001", orderType: "Dine-in", name: "", total: 25000, quantity: 2, dateTime: "12/05/2026 (12:02 pm)" },
        { id: "2", invoiceId: "INV-20260316-014", orderType: "Delivery", name: "John", total: 30000, quantity: 3, dateTime: "12/05/2026 (12:10 pm)" },
        { id: "3", invoiceId: "INV-20260316-001", orderType: "Dine-in", name: "", total: 35000, quantity: 4, dateTime: "12/05/2026 (12:02 pm)" },
        { id: "4", invoiceId: "INV-20260316-014", orderType: "Delivery", name: "Mary", total: 10000, quantity: 3, dateTime: "12/05/2026 (12:10 pm)" },
        { id: "5", invoiceId: "INV-20260316-027", orderType: "Dine-in", name: "", total: 5500, quantity: 1, dateTime: "12/05/2026 (12:15 pm)" },
        { id: "6", invoiceId: "INV-20260316-043", orderType: "Takeaway", name: "", total: 15000, quantity: 2, dateTime: "12/05/2026 (12:18 pm)" },
        { id: "7", invoiceId: "INV-20260316-027", orderType: "Dine-in", name: "", total: 22000, quantity: 3, dateTime: "12/05/2026 (12:15 pm)" },
        { id: "8", invoiceId: "INV-20260316-043", orderType: "Takeaway", name: "", total: 23000, quantity: 4, dateTime: "12/05/2026 (12:18 pm)" },
        { id: "9", invoiceId: "INV-20260316-058", orderType: "Dine-in", name: "", total: 55000, quantity: 5, dateTime: "12/05/2026 (12:25 pm)" },
        { id: "10", invoiceId: "INV-20260316-058", orderType: "Dine-in", name: "", total: 40000, quantity: 5, dateTime: "12/05/2026 (12:25 pm)" },
      ],

      removeVoucher: (id) =>
        set((oldState) => ({
          vouchers: oldState.vouchers.filter((v) => v.id !== id),
        })),

      clearVouchers: () => set({ vouchers: [] }),
    }),
    {
      name: "sale-voucher-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useSaleVoucherStore;

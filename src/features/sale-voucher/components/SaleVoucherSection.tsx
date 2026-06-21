"use client";

import React, { useState, useMemo } from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VoucherTable } from "@/features/sale-voucher/components/VoucherTable";
import { VoucherDetail } from "@/features/sale-voucher/components/VoucherDetail";
import { DeleteModal } from "@/features/sale-voucher/components/DeleteModal";
import { SummaryCards } from "@/features/sale-voucher/components/SummaryCards";
import { Voucher } from "@/types/VoucherTypes";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

const MOCK_VOUCHERS: Voucher[] = [
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
];

export default function SaleVoucherSection() {
  const [vouchers, setVouchers] = useState<Voucher[]>(MOCK_VOUCHERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSaleCloseModalOpen, setIsSaleCloseModalOpen] = useState(false);
  const [view, setView] = useState<"list" | "detail">("list");

  const filteredVouchers = useMemo(() => {
    return vouchers.filter(v => 
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      v.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.dateTime.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vouchers, searchTerm]);

  const totalAmount = useMemo(() => {
    return vouchers.reduce((acc, v) => acc + v.total, 0);
  }, [vouchers]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setVouchers(prev => prev.filter(v => v.id !== deleteId));
      setDeleteId(null);
    }
  };

  const handleViewDetails = (id: string) => {
    const voucher = vouchers.find(v => v.id === id);
    if (voucher) {
      setSelectedVoucher(voucher);
      setView("detail");
    }
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedVoucher(null);
  };

  const handleSaleClose = () => {
    setIsSaleCloseModalOpen(true);
  };

  const confirmSaleClose = () => {
    console.log("Sale Closed - Session Cleared");
    // clearSession(); // Plug your session clearing logic here
    setVouchers([]);
    setIsSaleCloseModalOpen(false);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {view === "list" ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Voucher information list</h1>
            
            <div className="flex gap-4 items-center">
              <Button 
                variant="outline" 
                className="flex gap-2 items-center rounded-xl border-pink-500 text-gray-700 hover:text-pink-600 min-w-[120px] h-11"
              >
                <Filter size={18} />
                Filter
              </Button>
              
              <div className="relative min-w-[320px]">
                <Input 
                  placeholder="Search by name or date" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-xl pl-4 pr-10 bg-[#FCF8FB] border-gray-200 h-11 focus-visible:ring-pink-500"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <VoucherTable 
            vouchers={filteredVouchers} 
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />

          <div className="mt-8 flex flex-col gap-6">
            <div className="flex justify-end">
              <Button 
                onClick={handleSaleClose}
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl px-12 py-6 text-lg"
              >
                Sale Close
              </Button>
            </div>
            
            <SummaryCards 
              totalRecords={vouchers.length} 
              totalAmount={totalAmount} 
            />
          </div>
        </div>
      ) : (
        <VoucherDetail voucher={selectedVoucher} onBack={handleBackToList} />
      )}

      <DeleteModal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={confirmDelete} 
      />

      <ConfirmationModal
        isOpen={isSaleCloseModalOpen}
        onClose={() => setIsSaleCloseModalOpen(false)}
        onConfirm={confirmSaleClose}
        title="Close Sale?"
        message="Are you sure you want to close the current sale session?"
        confirmText="Sale Close"
        variant="danger"
      />
    </div>
  );
}

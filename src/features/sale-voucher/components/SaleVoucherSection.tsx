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
import useSaleVoucherStore from "@/stores/useSaleVoucherStore";

export default function SaleVoucherSection() {
  const vouchers = useSaleVoucherStore((s) => s.vouchers);
  const hasHydrated = useSaleVoucherStore((s) => s.hasHydrated);
  const removeVoucher = useSaleVoucherStore((s) => s.removeVoucher);
  const clearVouchers = useSaleVoucherStore((s) => s.clearVouchers);

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
      removeVoucher(deleteId);
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
    clearVouchers();
    setIsSaleCloseModalOpen(false);
  };

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

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
        message="Are you sure you want to delete this voucher?  This action cannot be undone!"
        confirmText="Sale Close"
        variant="danger"
      />
    </div>
  );
}

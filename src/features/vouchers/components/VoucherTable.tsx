"use client";

import React from "react";
import { Trash2, ChevronRight, ChevronsLeft, ChevronLeft, ChevronRight as ChevronRightIcon, ChevronsRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Voucher, OrderType } from "@/types/VoucherTypes";

interface VoucherTableProps {
  vouchers: Voucher[];
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const OrderTypeBadge = ({ type }: { type: OrderType }) => {
  switch (type) {
    case "Dine-in":
      return <Badge className="bg-emerald-50 text-emerald-600 border-none hover:bg-emerald-50">Dine-in</Badge>;
    case "Delivery":
      return <Badge className="bg-orange-50 text-orange-400 border-none hover:bg-orange-50">Delivery</Badge>;
    case "Takeaway":
      return <Badge className="bg-purple-50 text-purple-600 border-none hover:bg-purple-50">Takeaway</Badge>;
    default:
      return <Badge>{type}</Badge>;
  }
};

export const VoucherTable: React.FC<VoucherTableProps> = ({ vouchers, onDelete, onViewDetails }) => {
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#E9F2FF] text-gray-700">
            <tr>
              <th className="px-4 py-3 font-medium"># ↑↓</th>
              <th className="px-4 py-3 font-medium">Invoice id ↑↓</th>
              <th className="px-4 py-3 font-medium">Order Type</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium text-right">Quantity</th>
              <th className="px-4 py-3 font-medium text-right">Date & Time</th>
              <th className="px-4 py-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {vouchers.map((v, index) => (
              <tr key={v.id} className={index % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                <td className="px-4 py-3 text-gray-700">{v.invoiceId}</td>
                <td className="px-4 py-3">
                  <OrderTypeBadge type={v.orderType} />
                </td>
                <td className="px-4 py-3 text-gray-700">{v.name || "-"}</td>
                <td className="px-4 py-3 text-gray-700 font-medium">{v.total.toLocaleString()} mmk</td>
                <td className="px-4 py-3 text-gray-500 text-right">{v.quantity}</td>
                <td className="px-4 py-3 text-gray-400 text-right text-xs">
                  {v.dateTime}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onDelete(v.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => onViewDetails(v.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
        <div>0 of {vouchers.length} row(s) selected.</div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-pink-500">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span>Page 1 of 30</span>
            <div className="flex items-center gap-1">
              <button className="p-1 border rounded opacity-50 cursor-not-allowed"><ChevronsLeft size={16} /></button>
              <button className="p-1 border rounded opacity-50 cursor-not-allowed"><ChevronLeft size={16} /></button>
              <button className="p-1 border rounded hover:bg-gray-50 transition-colors"><ChevronRightIcon size={16} /></button>
              <button className="p-1 border rounded hover:bg-gray-50 transition-colors"><ChevronsRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";

interface SummaryCardsProps {
  totalRecords: number;
  totalAmount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ totalRecords, totalAmount }) => {
  return (
    <div className="flex gap-4 justify-end">
      <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[140px] text-center shadow-sm">
        <div className="text-pink-500 text-xs font-medium mb-1">Total Record</div>
        <div className="text-gray-800 text-xl font-bold">{totalRecords}</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[140px] text-center shadow-sm">
        <div className="text-pink-500 text-xs font-medium mb-1">Total Amount</div>
        <div className="text-gray-800 text-xl font-bold">{totalAmount.toLocaleString()} MMK</div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Voucher } from "@/types/VoucherTypes";

interface VoucherDetailProps {
  voucher: Voucher | null;
  onBack: () => void;
}

export const VoucherDetail: React.FC<VoucherDetailProps> = ({ voucher, onBack }) => {
  if (!voucher) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Detail information of a voucher</h2>
        <Button 
          onClick={onBack}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl px-8"
        >
          Back
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-[500px] shadow-sm font-mono text-sm">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-2">Puffy Ring Donut Shop</h1>
          <div className="text-gray-500 space-y-1">
            <p>Invoice Number: {voucher.invoiceId}</p>
            <p>Date: {voucher.dateTime}</p>
            <p>Order Type: {voucher.orderType}</p>
            <p>Customer Ph: 09779832563</p>
            <p>Customer Name: Kendrick</p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-300 pt-4 mb-4">
          <div className="grid grid-cols-4 font-bold mb-2">
            <div className="col-span-2">Menu Name</div>
            <div className="text-center">Qty</div>
            <div className="text-right">Amount</div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="grid grid-cols-4">
              <div className="col-span-2">Mushroom Soup</div>
              <div className="text-center">2</div>
              <div className="text-right">5,600</div>
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-2">Salt Sweet Ingredient</div>
              <div className="text-center">400</div>
              <div className="text-right">14,000</div>
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-2">Steamed Rice</div>
              <div className="text-center">2</div>
              <div className="text-right">2,000</div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-4 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>21,600</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%):</span>
              <span>1,512</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-1">
              <span>Total:</span>
              <span>{voucher.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <span>Cash In:</span>
            <span>25,000</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Change:</span>
            <span>1,888</span>
          </div>
        </div>

        <div className="text-center mt-6 p-2">
          <p className="font-bold">Thank you for choosing Puffy Ring Donut Shop</p>
        </div>
      </div>
    </div>
  );
};

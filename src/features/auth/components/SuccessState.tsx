"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthState } from "@/types/AuthTypes";

type SuccessStateProps = {
  onNavigate: (step: AuthState) => void;
};

const SuccessState = ({ onNavigate }: SuccessStateProps) => {
  return (
    <div className="w-full flex flex-col items-center py-4">
      {/* Success Icon */}
      <div className="mb-6 text-green-500 flex justify-center items-center">
        <div className="size-16 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
          <CheckCircle2Icon className="size-10 stroke-[2]" />
        </div>
      </div>

      {/* Header/Message */}
      <h2 className="text-2xl font-bold text-gray-800 text-center tracking-tight leading-snug">
        Your password has successfully changed!
      </h2>
      <p className="text-sm text-gray-400 text-center mt-2 mb-8 max-w-[280px]">
        You can now use your new password to log in to your account.
      </p>

      {/* Action Button */}
      <Button
        type="button"
        onClick={() => onNavigate("login")}
        className="w-full h-12 bg-[#F82C84] hover:bg-[#E02070] text-white rounded-lg font-semibold text-sm transition-all duration-200 border-none justify-center mt-2 cursor-pointer shadow-sm"
      >
        Login
      </Button>
    </div>
  );
};

export default SuccessState;

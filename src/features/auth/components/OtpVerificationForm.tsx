"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AuthState } from "@/types/AuthTypes";
import { authService } from "@/services/authService";

type OtpVerificationFormProps = {
  onNavigate: (step: AuthState) => void;
  emailForOtp: string;
};

const OtpVerificationForm = ({ onNavigate, emailForOtp }: OtpVerificationFormProps) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Refs for the 4 input boxes
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto focus first input on mount
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value !== "" && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().slice(0, 4);
    if (!/^\d{1,4}$/.test(pasteData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (i < 4) {
        newOtp[i] = pasteData[i];
      }
    }
    setOtp(newOtp);
    const nextFocusIndex = Math.min(pasteData.length, 3);
    inputRefs[nextFocusIndex].current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      toast.error("Please enter a 4-digit code");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOtp({ otp: otpValue });
      if (response.success) {
        toast.success("OTP verified!");
        onNavigate("reset-password");
      } else {
        toast.error(response.error || "Verification failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await authService.forgotPassword({ email: emailForOtp || "user@example.com" });
      toast.success("OTP code resent successfully!");
      setOtp(["", "", "", ""]);
      inputRefs[0].current?.focus();
    } catch {
      toast.error("Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/puffyRing.png"
          alt="Puffy Ring Logo"
          width={100}
          height={86}
          priority
          className="object-contain"
        />
      </div>

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 text-center tracking-tight leading-snug">
        Verification
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2 mb-2">
        Enter 4-digit OTP code to continue
      </p>
      {emailForOtp && (
        <p className="text-xs text-gray-400 text-center mb-8">
          Sent to: <span className="font-semibold text-gray-600">{emailForOtp}</span>
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, idx) => (
            <input
              key={`otp-digit-${idx}`}
              ref={inputRefs[idx]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              disabled={loading}
              className="size-12 md:size-14 text-center text-xl font-bold border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20 rounded-lg outline-none transition-all bg-white"
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-[#F82C84] hover:bg-[#E02070] text-white rounded-lg font-semibold text-sm transition-all duration-200 border-none justify-center cursor-pointer shadow-sm disabled:opacity-50"
          disabled={loading || otp.some((d) => d === "")}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4 text-white" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        Don&apos;t get the OTP code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resending || loading}
          className="font-bold text-[#F82C84] hover:text-[#E02070] transition-colors underline-offset-2 hover:underline disabled:opacity-50"
        >
          {resending ? "Resending..." : "Resend"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationForm;

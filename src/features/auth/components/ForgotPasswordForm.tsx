"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { forgotPasswordSchema, ForgotPasswordPayload, AuthState } from "@/types/AuthTypes";
import { authService } from "@/services/authService";

type ForgotPasswordFormProps = {
  onNavigate: (step: AuthState) => void;
  setEmailForOtp: (email: string) => void;
};

const ForgotPasswordForm = ({ onNavigate, setEmailForOtp }: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordPayload) => {
    setLoading(true);
    try {
      const response = await authService.forgotPassword(data);
      if (response.success) {
        toast.success("OTP sent successfully to your email!");
        setEmailForOtp(data.email);
        onNavigate("otp-verification");
      } else {
        toast.error(response.error || "Action failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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
        Forget Password
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2 mb-8">
        Enter your email address to receive an OTP.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        {/* Email input */}
        <div className="space-y-1.5">
          <Label htmlFor="forgot-email" className="text-gray-700 font-medium text-sm block">
            Email
          </Label>
          <Input
            id="forgot-email"
            type="email"
            placeholder="Enter your email"
            className="px-4 h-12 border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400 rounded-lg text-sm bg-white"
            disabled={loading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Action Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-[#F82C84] hover:bg-[#E02070] text-white rounded-lg font-semibold text-sm transition-all duration-200 border-none justify-center cursor-pointer shadow-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4 text-white" />
              Sending OTP...
            </span>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

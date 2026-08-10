"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { resetPasswordSchema, ResetPasswordPayload, AuthState } from "@/types/AuthTypes";
import { authService } from "@/services/authService";

type ResetPasswordFormProps = {
  onNavigate: (step: AuthState) => void;
};

const ResetPasswordForm = ({ onNavigate }: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordPayload) => {
    setLoading(true);
    try {
      const response = await authService.resetPassword(data);
      if (response.success) {
        toast.success("Password has been reset successfully!");
        onNavigate("success");
      } else {
        toast.error(response.error || "Reset password failed");
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
        Reset Password
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2 mb-8">
        Enter your new password
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        {/* New Password input */}
        <div className="space-y-1.5">
          <Label htmlFor="reset-password" className="text-gray-700 font-medium text-sm block">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              className="px-4 pr-10 h-12 border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400 rounded-lg text-sm bg-white"
              disabled={loading}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password input */}
        <div className="space-y-1.5">
          <Label htmlFor="reset-confirmPassword" className="text-gray-700 font-medium text-sm block">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="reset-confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              className="px-4 pr-10 h-12 border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400 rounded-lg text-sm bg-white"
              disabled={loading}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
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
              Saving...
            </span>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

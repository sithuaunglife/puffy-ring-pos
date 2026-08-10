"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema, RegisterPayload, AuthState } from "@/types/AuthTypes";
import { authService } from "@/services/authService";

type RegisterFormProps = {
  onNavigate: (step: AuthState) => void;
};

const RegisterForm = ({ onNavigate }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const acceptTermsVal = watch("acceptTerms");

  const onSubmit = async (data: RegisterPayload) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      if (response.success) {
        toast.success("Registration successful! Proceeding to verification.");
        onNavigate("login");
      } else {
        toast.error(response.error || "Registration failed");
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
      <div className="mb-4">
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
        Register Now!
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2 mb-8">
        Enter your credentials to sign up
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        {/* User Name input */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-username" className="text-gray-700 font-medium text-sm block">
            User Name
          </Label>
          <Input
            id="reg-username"
            type="text"
            placeholder="Enter your name"
            className="px-4 h-12 border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400 rounded-lg text-sm bg-white"
            disabled={loading}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-email" className="text-gray-700 font-medium text-sm block">
            Email
          </Label>
          <Input
            id="reg-email"
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

        {/* Password input */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-password" className="text-gray-700 font-medium text-sm block">
            Password
          </Label>
          <div className="relative">
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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
          <Label htmlFor="reg-confirmPassword" className="text-gray-700 font-medium text-sm block">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="reg-confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
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

        {/* Accept Terms checkbox */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={acceptTermsVal}
              onCheckedChange={(checked) => {
                setValue("acceptTerms", !!checked, { shouldValidate: true });
              }}
              disabled={loading}
            />
            <Label
              htmlFor="acceptTerms"
              className="text-xs text-gray-600 font-medium select-none cursor-pointer leading-tight pt-0.5"
            >
              I accept the{" "}
              <a href="#" className="text-[#F82C84] hover:text-[#E02070] font-semibold hover:underline">
                Terms and Conditions
              </a>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-xs text-red-500 mt-1">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Action Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-[#F82C84] hover:bg-[#E02070] text-white rounded-lg font-semibold text-sm transition-all duration-200 border-none justify-center mt-2 cursor-pointer shadow-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4 text-white" />
              Signing up...
            </span>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="font-bold text-[#F82C84] hover:text-[#E02070] transition-colors underline-offset-2 hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
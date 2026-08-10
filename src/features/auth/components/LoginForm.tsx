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
import { loginSchema, LoginPayload, AuthState } from "@/types/AuthTypes";
import { authService } from "@/services/authService";

type LoginFormProps = {
  onNavigate: (step: AuthState) => void;
};

const LoginForm = ({ onNavigate }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMeVal = watch("rememberMe");

  const onSubmit = async (data: LoginPayload) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      if (response.success) {
        toast.success("Successfully logged in!");
        window.location.href = "/sale-screen";
      } else {
        toast.error(response.error || "Login failed");
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
        Get Started Now!
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2 mb-8">
        Please Login to your account to continue
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        {/* User Name input */}
        <div className="space-y-1.5">
          <Label htmlFor="username" className="text-gray-700 font-medium text-sm block">
            User Name
          </Label>
          <div className="relative">
            <Input
              id="username"
              type="text"
              placeholder="Enter your name"
              className="px-4 h-12 border border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:border-gray-400 rounded-lg text-sm bg-white"
              disabled={loading}
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password input */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
              Password
            </Label>
            <button
              type="button"
              onClick={() => onNavigate("forgot-password")}
              className="text-xs font-semibold text-[#F82C84] hover:text-[#E02070] transition-colors hover:underline"
              tabIndex={0}
            >
              Forgot your password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
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

        {/* Remember Login Checkbox */}
        <div className="flex items-center space-x-2 pt-0.5">
          <Checkbox
            id="rememberMe"
            checked={rememberMeVal}
            onCheckedChange={(checked) => {
              setValue("rememberMe", !!checked);
            }}
            disabled={loading}
            className="rounded-full"
          />
          <Label
            htmlFor="rememberMe"
            className="text-xs text-gray-600 font-medium select-none cursor-pointer"
          >
            Remember my login
          </Label>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full h-12 bg-[#F82C84] hover:bg-[#E02070] text-white rounded-lg font-semibold text-sm transition-all duration-200 border-none justify-center mt-3 cursor-pointer shadow-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner className="size-4 text-white" />
              Logging in...
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        Have an account?{" "}
        <button
          type="button"
          onClick={() => onNavigate("signup")}
          className="font-bold text-[#F82C84] hover:text-[#E02070] transition-colors hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
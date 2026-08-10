import { z } from "zod";

// Zod validation schemas
export const loginSchema = z.object({
  username: z.string().min(1, "User Name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    username: z.string().min(1, "User Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the Terms and Conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be exactly 4 digits"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Types from schemas
export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
export type OtpPayload = z.infer<typeof otpSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;

export type AuthState =
  | "login"
  | "signup"
  | "forgot-password"
  | "otp-verification"
  | "reset-password"
  | "success";

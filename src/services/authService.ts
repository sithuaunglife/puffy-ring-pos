import {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  OtpPayload,
  ResetPasswordPayload,
} from "@/types/AuthTypes";

// Mock delay to simulate a real API network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async login(payload: LoginPayload) {
    await delay(800);
    // Mimic checking credentials
    if (payload.username.toLowerCase() === "admin" && payload.password === "password123") {
      return {
        success: true,
        token: "mock-jwt-token-xyz-12345",
        user: { username: payload.username },
      };
    }
    // Simple fallback login success for testing/demo purposes
    if (payload.username && payload.password.length >= 6) {
      return {
        success: true,
        token: "mock-jwt-token-demo-mode",
        user: { username: payload.username },
      };
    }
    return {
      success: false,
      error: "Invalid username or password (use admin/password123 for default credentials)",
    };
  },

  async register(payload: RegisterPayload) {
    await delay(800);
    if (payload.email.includes("taken")) {
      return {
        success: false,
        error: "This email address is already registered.",
      };
    }
    return {
      success: true,
    };
  },

  async forgotPassword(payload: ForgotPasswordPayload) {
    await delay(800);
    if (!payload.email.includes("@")) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }
    return {
      success: true,
    };
  },

  async verifyOtp(payload: OtpPayload) {
    await delay(800);
    // Let's accept '1234' as the correct verification code
    if (payload.otp === "1234") {
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: "Invalid OTP code. Please enter '1234' to test success.",
    };
  },

  async resetPassword(payload: ResetPasswordPayload) {
    await delay(800);
    return {
      success: true,
    };
  },
};

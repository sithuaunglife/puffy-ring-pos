import { useState } from "react";
import { AuthState } from "@/types/AuthTypes";

export function useAuthFlow() {
  const [currentStep, setCurrentStep] = useState<AuthState>("login");
  const [emailForOtp, setEmailForOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigateTo = (step: AuthState) => {
    setCurrentStep(step);
  };

  return {
    currentStep,
    navigateTo,
    emailForOtp,
    setEmailForOtp,
    loading,
    setLoading,
  };
}

"use client";

import React from "react";
import { useAuthFlow } from "../hooks/useAuthFlow";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OtpVerificationForm from "./OtpVerificationForm";
import ResetPasswordForm from "./ResetPasswordForm";
import SuccessState from "./SuccessState";

const AuthContainer = () => {
  const {
    currentStep,
    navigateTo,
    emailForOtp,
    setEmailForOtp,
  } = useAuthFlow();

  const renderCurrentForm = () => {
    switch (currentStep) {
      case "login":
        return <LoginForm onNavigate={navigateTo} />;
      case "signup":
        return <RegisterForm onNavigate={navigateTo} />;
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onNavigate={navigateTo}
            setEmailForOtp={setEmailForOtp}
          />
        );
      case "otp-verification":
        return (
          <OtpVerificationForm
            onNavigate={navigateTo}
            emailForOtp={emailForOtp}
          />
        );
      case "reset-password":
        return <ResetPasswordForm onNavigate={navigateTo} />;
      case "success":
        return <SuccessState onNavigate={navigateTo} />;
      default:
        return <LoginForm onNavigate={navigateTo} />;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EBF3FC] via-[#F5F9FD] to-[#EBF3FC] dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] p-4 md:p-6 select-none font-sans relative overflow-hidden">
      <div className="w-full max-w-[400px] relative z-10 transition-all duration-300">
        {renderCurrentForm()}
      </div>
    </main>
  );
};

export default AuthContainer;

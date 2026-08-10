import React from "react";
import AuthContainer from "@/features/auth/components/AuthContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Puffy Ring Donut POS",
  description: "Log in or manage credentials for Puffy Ring Donut POS system.",
};

const LoginPage = () => {
  return <AuthContainer />;
};

export default LoginPage;

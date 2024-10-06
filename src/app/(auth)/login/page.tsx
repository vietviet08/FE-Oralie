"use client";

import LoginTemplate from "@/components/store/account/template/login-template";
import { Metadata } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSignIn = async (provider: string) => {
    const result = await signIn(provider, { redirect: false });
    if (result?.ok) {
      router.push("/");
    }
  };

  return <LoginTemplate />;
};

export default LoginPage;

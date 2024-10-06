"use client";

import LoginTemplate from "@/components/store/account/template/login-template";
import { Metadata } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export const metadata: Metadata = {
//   title: "Sign in",
//   description: "Sign in to Oralie.",
// };

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

  return (
    // <div>
    //   {!session ? (
    //     <>
    //       <h1>You are not logged in</h1>
    //       <button onClick={() => handleSignIn("keycloak")}>
    //         Login with Keycloak
    //       </button>
    //       <br />
    //       <button onClick={() => handleSignIn("google")}>
    //         Login with Google
    //       </button>
    //     </>
    //   ) : (
    //     <>
    //       <h1>Welcome, {session.user?.name}</h1>
    //       <button onClick={() => signOut()}>Logout</button>
    //     </>
    //   )}
    // </div>
    <LoginTemplate />
  );
};

export default LoginPage;

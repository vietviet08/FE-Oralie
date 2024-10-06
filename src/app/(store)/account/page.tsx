"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

async function SessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

const AccountPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Account</title>
      </Head>

      <h1>Account</h1>
      <p>
        {status === "loading" && "Loading..."}
        {status === "unauthenticated" && (
          <>
            You need to be signed in to view this page.{" "}
            <Link href="/login">Sign in</Link>
          </>
        )}
        {status === "authenticated" && (
          <>
            Welcome, {session?.user?.name}! <br />
            <button
              // onClick={() => router.push("/api/auth/signout")}
              onClick={() =>
                SessionLogOut().then(() => signOut({ callbackUrl: "/" }))
              }
            >
              Sign out
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AccountPage;

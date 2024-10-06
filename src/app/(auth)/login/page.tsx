"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!session ? (
        <>
          <h1>You are not logged in</h1>
          <button onClick={() => signIn("keycloak")}>
            Login with Keycloak
          </button>
        </>
      ) : (
        <>
          <h1>Welcome, {session.user?.name}</h1>
          <button onClick={() => signOut()}>Logout</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;

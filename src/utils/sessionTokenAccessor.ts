import { getServerSession } from "next-auth";
import { decrypt } from "./encryption";
import { authOptions } from "@/app/(auth)/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    id_token?: string;
  }
}

export async function getAccessToken(): Promise<string | null> {
  const session: Session | null = await getServerSession(authOptions);

  if (session && session.access_token) {
    const accessTokenDecrypted = decrypt(session.access_token);
    return accessTokenDecrypted;
  }

  return null;
}

export async function getIdToken(): Promise<string | null> {
  const session: Session | null = await getServerSession(authOptions);

  if (session && session.id_token) {
    const idTokenDecrypted = decrypt(session.id_token);
    return idTokenDecrypted;
  }

  return null;
}

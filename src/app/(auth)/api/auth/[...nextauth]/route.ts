import NextAuth, { NextAuthOptions, TokenSet, Account } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import GoogleProvider from "next-auth/providers/google";
import { jwtDecode } from "jwt-decode"; 
import { encrypt } from "@/utils/encryption";

interface JWTToken {
  decoded?: any;
  access_token?: string;
  id_token?: string;
  expires_at?: number;
  refresh_token?: string;
  error?: string;
}

async function refreshAccessToken(token: JWTToken): Promise<JWTToken> {
  const resp = await fetch(`${process.env.KEYCLOAK_REFRESH_TOKEN_URL}`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token!,
    }),
    method: "POST",
  });

  const refreshToken = await resp.json();

  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_DOMAIN!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, trigger, isNewUser, session }: { token: any; user: any; account: Account | null; profile?: any; trigger?: "signIn" | "update" | "signUp"; isNewUser?: boolean; session?: any }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        token.decoded = jwtDecode(account.access_token!);
        token.access_token = account.access_token!;
        token.id_token = account.id_token!;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token!;
        return token;
      } else if (nowTimeStamp < (token.expires_at || 0)) {
        return token;
      } else {
        console.log("Token has expired. Will refresh...");
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed.");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    async session({ session, token, user, newSession, trigger }: { session: any; token: any; user: any; newSession: any; trigger: any }) {
      session.access_token = encrypt(token.access_token!);
      session.id_token = encrypt(token.id_token!);
      session.roles = token.decoded?.realm_access?.roles;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

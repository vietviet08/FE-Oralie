import { AuthOptions, getServerSession, TokenSet } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";

async function requestRefreshOfAccessToken(token: JWT) {
    const response = await fetch(`${process.env.KEYCLOAK_DOMAIN}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_STORE_CLIENT_ID!,
            client_secret: process.env.KEYCLOAK_STORE_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
        }),
        method: "POST",
        cache: "no-store"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || "Failed to refresh access token");
    }

    return response.json();
}

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_STORE_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_STORE_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_DOMAIN!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 5 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token;
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = Math.floor(Date.now() / 1000) + 5 * 60 * 60; 
                return token;
            }

            if (Date.now() < ((Number(token.expiresAt) ?? 0) * 1000 - 60 * 1000)) {
                return token;
            } else {
                try {
                    const tokens = await requestRefreshOfAccessToken(token) as TokenSet & { expires_in: number };

                    const updatedToken: JWT = {
                        ...token,
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    };
                    return updatedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return { ...token, error: "RefreshAccessTokenError" };
                }
            }
        },
        async session({ session, token }) {
            session.access_token = token.accessToken as string;
            session.sub = token.sub;
            session.error = token.error as string;
            return session;
        },
    },
};

export function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions);
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
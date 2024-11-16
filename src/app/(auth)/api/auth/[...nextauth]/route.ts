import {AuthOptions, getServerSession, TokenSet} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import NextAuth from "next-auth";
import {JWT} from "next-auth/jwt";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";

const {KEYCLOAK_STORE_CLIENT_ID, KEYCLOAK_STORE_CLIENT_SECRET, KEYCLOAK_DOMAIN, NEXTAUTH_SECRET} = process.env;

if (!KEYCLOAK_STORE_CLIENT_ID || !KEYCLOAK_STORE_CLIENT_SECRET || !KEYCLOAK_DOMAIN || !NEXTAUTH_SECRET) {
    throw new Error("Required environment variables are missing");
}

async function requestRefreshOfAccessToken(token: JWT) {
    try {
        const response = await fetch(`${KEYCLOAK_DOMAIN}/protocol/openid-connect/token`, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                client_id: KEYCLOAK_STORE_CLIENT_ID!,
                client_secret: KEYCLOAK_STORE_CLIENT_SECRET!,
                grant_type: "refresh_token",
                refresh_token: token.refreshToken as string,
            }),
            method: "POST",
            cache: "no-store",
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to refresh access token", errorData);
            throw new Error(errorData.error_description || "Failed to refresh access token");
        }

        const refreshedTokens = await response.json() as TokenSet & { expires_in: number };

        if (!refreshedTokens.access_token) {
            throw new Error("No new access token in the response");
        }

        return refreshedTokens;
    } catch (error) {
        console.error("Network error while refreshing access token", error);
        throw error;
    }
}

export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: KEYCLOAK_STORE_CLIENT_ID!,
            clientSecret: KEYCLOAK_STORE_CLIENT_SECRET!,
            issuer: KEYCLOAK_DOMAIN!,
        }),
    ],
    secret: NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 5 * 60 * 60,
    },
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.idToken = account.id_token;
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                // token.expiresAt = Math.floor(Date.now() / 1000) + 5 * 60 * 60; // Set expiry time based on maxAge
                return token;
            }

            // Check the expiration time, reduce the interval to refresh proactively
            if (Date.now() < ((Number(token.expiresAt) ?? 0) * 1000 - 5 * 60 * 1000)) {
                return token;
            } else {
                try {
                    const tokens = await requestRefreshOfAccessToken(token);
                    token.idToken = tokens.id_token;
                    token.accessToken = tokens.access_token;
                    token.refreshToken = tokens.refresh_token ?? token.refreshToken;
                    token.expiresAt = Math.floor(Date.now() / 1000) + tokens.expires_in;

                    return token;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return {...token, error: "RefreshAccessTokenError"};
                }
            }
        },
        async session({session, token}) {
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

export {handler as GET, handler as POST};

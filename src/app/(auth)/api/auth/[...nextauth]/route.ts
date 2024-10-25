// import NextAuth, {NextAuthOptions, TokenSet, Account} from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";
// import GoogleProvider from "next-auth/providers/google";
// import {jwtDecode} from "jwt-decode";
// import {encrypt} from "@/utils/encryption";
//
// interface JWTToken {
//     decoded?: any;
//     access_token?: string;
//     id_token?: string;
//     expires_at?: number;
//     refresh_token?: string;
//     error?: string;
// }
//
// async function refreshAccessToken(token: JWTToken): Promise<JWTToken> {
//     const resp = await fetch(`${process.env.KEYCLOAK_REFRESH_TOKEN_URL}`, {
//         headers: {"Content-Type": "application/x-www-form-urlencoded"},
//         body: new URLSearchParams({
//             client_id: process.env.KEYCLOAK_STORE_CLIENT_ID!,
//             client_secret: process.env.KEYCLOAK_STORE_CLIENT_SECRET!,
//             grant_type: "refresh_token",
//             refresh_token: token.refresh_token!,
//         }),
//         method: "POST",
//     });
//
//     const refreshToken = await resp.json();
//
//     if (!resp.ok) throw refreshToken;
//
//     return {
//         ...token,
//         access_token: refreshToken.access_token,
//         decoded: jwtDecode(refreshToken.access_token),
//         id_token: refreshToken.id_token,
//         expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
//         refresh_token: refreshToken.refresh_token,
//     };
// }
//
// export const authOptions: NextAuthOptions = {
//     providers: [
//         KeycloakProvider({
//             clientId: process.env.KEYCLOAK_STORE_CLIENT_ID!,
//             clientSecret: process.env.KEYCLOAK_STORE_CLIENT_SECRET!,
//             issuer: process.env.KEYCLOAK_DOMAIN!,
//         }),
//         KeycloakProvider({
//             clientId: process.env.KEYCLOAK_DASH_CLIENT_ID!,
//             clientSecret: process.env.KEYCLOAK_DASH_CLIENT_SECRET!,
//             issuer: process.env.KEYCLOAK_DOMAIN!,
//         }),
//         // Optionally enable Google login for store
//         // GoogleProvider({
//         //     clientId: process.env.GOOGLE_CLIENT_ID!,
//         //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         // }),
//     ],
//
//     callbacks: {
//         async jwt({ token, account }: { token: any; account: Account | null }) {
//             const nowTimeStamp = Math.floor(Date.now() / 1000);
//
//             if (account) {
//                 token.decoded = jwtDecode(account.access_token!);
//                 token.access_token = account.access_token!;
//                 token.id_token = account.id_token!;
//                 token.expires_at = account.expires_at;
//                 token.refresh_token = account.refresh_token!;
//                 return token;
//             }
//
//             if (nowTimeStamp < (token.expires_at || 0)) {
//                 return token;
//             } else {
//                 console.log("Token has expired. Attempting to refresh...");
//                 try {
//                     const refreshedToken = await refreshAccessToken(token);
//                     console.log("Token successfully refreshed.");
//                     return refreshedToken;
//                 } catch (error) {
//                     console.error("Error refreshing access token", error);
//                     return { ...token, error: "RefreshAccessTokenError" };
//                 }
//             }
//         },
//
//         async session({ session, token }: { session: any; token: any }) {
//             session.access_token = encrypt(token.access_token!);
//             session.id_token = encrypt(token.id_token!);
//             session.roles = token.decoded?.realm_access?.roles;
//             session.error = token.error;
//             return session;
//         },
//     },
// };
//
// const handler = NextAuth(authOptions);
//
// export {handler as GET, handler as POST};


import {AuthOptions, getServerSession, TokenSet} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"
import NextAuth from "next-auth";
import { JWT} from "next-auth/jwt";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";


function requestRefreshOfAccessToken(token: JWT) {
    return fetch(`${process.env.KEYCLOAK_DOMAIN}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_STORE_CLIENT_ID!,
            client_secret: process.env.KEYCLOAK_STORE_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token! as string,
        }),
        method: "POST",
        cache: "no-store"
    });
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
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiresAt = account.expires_at
                return token
            }
            if (Date.now() < (token.expiresAt! as number * 1000 - 60 * 1000)) {
                return token
            } else {
                try {
                    const response = await requestRefreshOfAccessToken(token)

                    const tokens: TokenSet = await response.json()

                    if (!response.ok) throw tokens

                    const updatedToken: JWT = {
                        ...token,
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    }
                    return updatedToken
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    return { ...token, error: "RefreshAccessTokenError" }
                }
            }
        },
        session: async ({ session, token, user }) => {
            session.access_token = token.accessToken as string;
            session.sub = token.sub;
            // session.roles = decode(token.accessToken as string).realm_access.roles;
            session.error = token.error as string;
            // console.log("[session callback] token " + JSON.stringify(token))

            return session;
        },
    },
}
export function auth(
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
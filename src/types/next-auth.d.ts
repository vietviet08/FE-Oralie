import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        error?: string;
        access_token?: string;
        id_token?: string;
        roles?: string[];
    }
}
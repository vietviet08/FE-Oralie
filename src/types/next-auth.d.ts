
declare module "next-auth" {
    interface Session {
        error?: string;
        sub?: string;
        access_token?: string;
        id_token?: string;
        roles?: string[];
    }
}
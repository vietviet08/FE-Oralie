import {NextRequest, NextResponse} from "next/server"
import {getToken} from "next-auth/jwt";
import {parseJwt} from "@/utils/encryption";

const privatePath = ["/account", "/cart"]
const authPath = ["/login", "/register"]
const adminPath = "/admin"
const secret = process.env.NEXTAUTH_SECRET;

const corsOptions: {
    allowedMethods: string[];
    allowedOrigins: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    maxAge?: number;
    credentials: boolean;
} = {
    allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
    allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
    allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
    exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
    maxAge: process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined,
    credentials: process.env?.CREDENTIALS == "true",
};

export async function middleware(req: NextRequest) {

    const token = await getToken({req, secret});
    const access_token = token?.accessToken;
    const roles = token ? parseJwt(access_token).realm_access.roles : []

    const {pathname} = req.nextUrl

    if (privatePath.some((path) => pathname.startsWith(path)) && !access_token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (authPath.some((path) => pathname.startsWith(path)) && access_token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (!access_token && adminPath === pathname) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    if (access_token && adminPath === pathname && !roles.includes("ADMIN"))
        return NextResponse.redirect(new URL('/', req.url))

    const origin = req.headers.get('origin') ?? '';
    if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
        req.headers.set('Access-Control-Allow-Origin', origin);
    }

    req.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
    req.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
    req.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
    req.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
    req.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");


    return NextResponse.next()

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

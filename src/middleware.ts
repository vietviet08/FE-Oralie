import {NextRequest, NextResponse} from "next/server"
import {getToken} from "next-auth/jwt";
import {parseJwt} from "@/utils/encryption";

const privatePath = ["/account", "/cart"]
const authPath = ["/login", "/register"]
const adminPath = "/admin"
const secret = process.env.NEXTAUTH_SECRET;

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

    return NextResponse.next();

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

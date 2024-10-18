import {JwtPayload, jwtDecode} from "jwt-decode";
import {NextRequest, NextResponse} from "next/server"
import {getToken} from "next-auth/jwt";

// declare module "next-auth" {
//     interface Session {
//         role?: string;
//     }
// }
//
// interface CustomJwtPayload extends JwtPayload {
//     role?: string;
// }

const privatePath = ["/account", "/cart"]
const authPath = ["/login", "/register"]
const adminPath = "/admin"
const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(req: NextRequest) {
    const access_token = await getToken({ req, secret });
    const roles: string[] = Array.isArray(access_token?.roles) ? access_token.roles : [];
    const {pathname} = req.nextUrl
    // const access_token = req.cookies.get("access_token")?.value

    // const session = access_token ? jwtDecode<CustomJwtPayload>(access_token) : null;

    // const role = session?.role;
    // const role = access_token ? jwtDecode<CustomJwtPayload>(access_token).role : null;

    if (privatePath.some((path) => pathname.startsWith(path)) && !access_token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (authPath.some((path) => pathname.startsWith(path)) && access_token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if ((adminPath === pathname && !roles.includes("ADMIN")) || (!access_token && adminPath === pathname)) {
        // return NextResponse.redirect(new URL('/login', request.url))
        return NextResponse.redirect(new URL(`${process.env.KEYCLOAK_URL}/realms/oralie/protocol/openid-connect/auth`, req.url));
    }

    return NextResponse.next()

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
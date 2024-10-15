import { JwtPayload ,jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server"

declare module "next-auth" {
    interface Session {
        role?: string;
    }
}

interface CustomJwtPayload extends JwtPayload {
    role?: string;
}

const privatePath = ["/account", "/cart"]
const authPath = ["/login", "/register"]
const adminPath = "/admin"

export async function middleware(request: NextRequest){
    const {pathname} = request.nextUrl
    
    const access_token = request.cookies.get("access_token")?.value
    
    const session = access_token ? jwtDecode<CustomJwtPayload>(access_token) : null;

    const role = session?.role;

    if(privatePath.some((path) => pathname.startsWith(path)) && !access_token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(authPath.some((path) => pathname.startsWith(path)) && access_token){
        return NextResponse.redirect(new URL('/', request.url))
    }

    if((adminPath === pathname && role !== "ADMIN") || (!access_token && adminPath === pathname )){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };
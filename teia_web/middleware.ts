
import { NextRequest , NextResponse } from "next/server";
import {cookies} from "next/headers";

export const TOKEN_KEY = 'token';

export async function Autentication(request: NextRequest) {
    const cookiesData = await cookies();
    const token = cookiesData.get(TOKEN_KEY);
    const protectedRoutes = ['/home', '/demandas', '/perfil', '/cadDemandas', '/vistoriadores'];

    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home/:path*', '/demandas/:path*', '/perfil/:path*', '/cadDemandas/:path*', '/vistoriadores/:path*'],
}

export { Autentication as middleware };
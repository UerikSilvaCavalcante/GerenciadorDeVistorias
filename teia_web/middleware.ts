import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { Type } from "./app/enums/user";


export async function Autentication(request: NextRequest) {
  const cookiesData = await cookies();
  const token = cookiesData.get("token");

  const response = NextResponse.next()

  response.headers.set('X-From-Middleware', 'HelloUerik')
  response.headers.set('Cache-Control', 'no-store')



  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = [
    "/home",
    "/demandas",
    "/perfil",
    "/cadDemandas",
    "/vistoriadores",
    "/completeDemanda",
  ].some((route) => pathname.startsWith(route));

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<{
        id: string;
        userName: string;
        tipo: string;
        exp: number;
      }>(token.value);

      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // Token expirado
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        return response;
      }

      const isCadDemandas = pathname.startsWith("/cadDemandas");
      if (isCadDemandas && decoded.tipo !== "Engenheiro") {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/home/:path*",
    "/demandas/:path*",
    "/perfil/:path*",
    "/cadDemandas/:path*",
    "/vistoriadores/:path*",
    "/completeDemanda/:path*",
  ],
};


export { Autentication as middleware };

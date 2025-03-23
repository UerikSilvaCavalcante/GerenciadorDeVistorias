import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { Type } from "./app/enums/user";

export async function Autentication(request: NextRequest) {
  const cookiesData = await cookies();
  const token = cookiesData.get("token");
  const protectedRoutes = [
    "/home",
    "/demandas",
    "/perfil",
    "/cadDemandas",
    "/vistoriadores",
    "/completeDemanda",
  ];
  const isCadDemandas = request.nextUrl.pathname.startsWith("/cadDemandas");

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token) {
    const decode = jwtDecode<{
      id: string;
      userName: string;
      tipo: string;
    }>(token.value);
    if (isCadDemandas && decode.tipo !== "Engenheiro") {
      return NextResponse.redirect(new URL("/home", request.url));
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

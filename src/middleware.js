import { NextResponse } from "next/server";
import { JWTVerify } from "./helpers/jwt";

export async function middleware(req, res) {
  var AccessToken =
    req.cookies.get("AccessToken")?.value &&
    (await JWTVerify(req.cookies.get("AccessToken")?.value));

  var pathname = req.nextUrl.pathname;

  var publicRoutes = ["/"];

  if (!AccessToken && !publicRoutes.includes(pathname)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({
        success: false,
        message: "Your are not Authorized!",
      });
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  if (AccessToken && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    // "/dashboard",
    // "/dashboard/:path*",
    // "/api/auth/profile",
    // "/api/auth/register",
  ],
};

import { getSessionUserTokenData } from "lib/app.next";
import { decodeToken } from "lib/token";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const tokenData = await getAuthTokenData(request);

  if (request.nextUrl.pathname == "/") {
    if (tokenData) {
      return NextResponse.rewrite(new URL("/user", request.url));
    } else {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

async function getAuthTokenData(request: NextRequest) {
  const cookie = request.cookies.get("auth_token");
  const value = cookie?.value;
  if (!cookie?.value) {
    return;
  }
  return decodeToken(value as string);
}

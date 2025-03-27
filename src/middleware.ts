import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token || (token && token.value === "")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const locale = pathname.split("/")[1];
  const headers = new Headers(request.headers);

  headers.set("x-locale", locale);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: "/(cs|en|pl)/admin/:path*",
};

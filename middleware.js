import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    (!session && req.nextUrl.pathname === "/dashboard") ||
    (!session && req.nextUrl.pathname.includes("/jobs/edit/")) ||
    (!session && req.nextUrl.pathname.includes("/jobs/new"))
  ) {
    console.log("no session");
    const url = new URL(req.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return res;
}

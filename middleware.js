import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    /*   const url = new URL(req.url);
    url.pathname = "/login";
    return NextResponse.redirect(url); */
    console.log("No session");
  }

  return res;
}

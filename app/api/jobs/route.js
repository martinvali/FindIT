import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createServerComponentClient({ cookies });

  const body = await req.json();
  const { title, url, location, experience, type, level, salary } = body;

  const user = await supabase.auth.getUser();

  const id = user.data.user.id;

  const resp = await supabase.from("posts").insert({
    user_id: id,
    title,
    location,
    type,
    experience,
    level,
    url,
    salary,
  });
  return NextResponse.json({}, { status: 200 });
}

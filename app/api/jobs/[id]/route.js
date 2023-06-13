import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function PUT(req) {
  const supabase = createServerComponentClient({ cookies });

  const body = await req.json();
  const { id, title, url, location, experience, type, level, salary } = body;

  //const user = await supabase.auth.getUser();

  //const userId = user.data.user.id;

  const post = await supabase
    .from("posts")
    .update({
      id,
      title,
      url,
      location,
      experience,
      type,
      level,
      salary,
    })
    .eq("id", id)
    .select();

  console.log(post);
}

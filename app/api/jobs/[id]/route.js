import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function PUT(req) {
  const supabase = createServerComponentClient({ cookies });

  const body = await req.json();
  const { id, title, url, location, experience, type, level, salary } = body;

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
}

export async function DELETE(req, { params }) {
  const supabase = createServerComponentClient({ cookies });
  const { id } = params;
  const resp = await supabase.from("posts").delete().eq("id", id);
  console.log(resp);
}

export async function GET(req, { params }) {
  const { id } = params;
  const supabase = createServerComponentClient({ cookies });

  const resp = await supabase.from("posts").select().eq("id", id);
  const post = resp.data[0];
  return NextResponse.json(post, { status: 200 });
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function PUT(req) {
  try {
    const supabase = createServerComponentClient({ cookies });

    const body = await req.json();
    const { id, title, url, location, experience, type, level, salary } = body;

    const { data, error } = await supabase
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
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { id } = params;
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 400 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = params;
  const supabase = createServerComponentClient({ cookies });

  const resp = await supabase.from("posts").select().eq("id", id);
  const post = resp.data[0];
  return NextResponse.json(post, { status: 200 });
}

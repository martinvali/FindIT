import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const supabase = createServerComponentClient({ cookies });

    const body = await req.json();
    const { title, url, location, experience, type, level, salary } = body;

    const user = await supabase.auth.getUser();

    const userId = user.data.user.id;

    const { data, error } = await supabase.from("posts").insert({
      user_id: userId,
      title,
      location,
      type,
      experience,
      level,
      url,
      salary,
    });

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

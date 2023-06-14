"use client";
import { FormInput } from "../components/FormInput";
import { useSupabase } from "../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { supabase } = useSupabase();
  const router = useRouter();

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">
          Articles from our team
        </h1>
      </section>
    </main>
  );
}

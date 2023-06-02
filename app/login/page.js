"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FormInput } from "../components/FormInput";
import { useSupabase } from "../providers/SupabaseProvider";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { supabase } = useSupabase();
  console.log(supabase.auth);
  const handleSubmit = async () => {};

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">Sign in</h1>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" />
          <FormInput label="Password" type="password" />
          <button
            type="submit"
            className="bg-cyan-500 text-white w-full rounded-md py-2 text-lg font-medium"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}

"use client";
import { FormInput } from "../components/FormInput";
import { useSupabase } from "../providers/SupabaseProvider";
import Link from "next/link";

export default function Login() {
  const { supabase } = useSupabase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input[name=email]").value;
    const password = e.target.querySelector("input[name=password]").value;

    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">Sign in</h1>
        <form className="max-w-lg mx-auto mb-4" onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" />
          <FormInput label="Password" type="password" />
          <button
            type="submit"
            className="bg-cyan-500 text-white w-full rounded-md py-2 text-lg font-medium"
          >
            Sign in
          </button>
        </form>
        <p>
          Don't have an account? <Link href="signup">Sign up</Link>
        </p>
      </section>
    </main>
  );
}

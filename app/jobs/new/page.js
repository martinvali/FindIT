"use client";
import { FormInput } from "../../components/FormInput";
import { useSupabase } from "../../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewJob() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input[name=email]").value;
    const password = e.target.querySelector("input[name=password]").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      router.push("/");
    }
  };

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">
          Post a new job
        </h1>
        <form className="max-w-xl mx-auto mb-4" onSubmit={handleSubmit}>
          <FormInput label="Title" type="text" name="title" />
          <FormInput label="Application URL" type="url" name="url" />
          <button
            type="submit"
            className="bg-cyan-500 text-white w-full rounded-md py-2 text-lg font-medium"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

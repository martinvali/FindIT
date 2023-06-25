"use client";
import { FormInput } from "../components/FormInput";
import { useSupabase } from "../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { notifications } from "@mantine/notifications";

export default function Login() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.querySelector("input[name=email]").value;
      const password = e.target.querySelector("input[name=password]").value;

      notifications.show({
        loading: true,
        title: "Loading...",
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      notifications.clean();

      if (error) {
        notifications.show({
          title: "Something went wrong.",
          message: error.message,
          color: "red",
        });
        return;
      }
      if (data.user) {
        notifications.show({
          title: "Welcome back!",
          color: "green",
        });
        router.push("/");
      }
    } catch (e) {
      notifications.show({
        title: "Something went wrong.",
        message: "Please refresh the page to try again.",
        color: "red",
      });
      return;
    }
  };

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">Sign in</h1>
        <form className="max-w-lg mx-auto mb-4" onSubmit={handleSubmit}>
          <FormInput label="Email" type="email" name="email" />
          <FormInput label="Password" type="password" name="password" />
          <button
            type="submit"
            className="bg-cyan-500 text-white w-full rounded-md py-2 text-lg font-medium"
          >
            Sign in
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link
            href="signup"
            className="z-10 font-medium relative after:absolute after:bottom-0.5 after:left-1/2	after:-translate-x-1/2 after:w-[110%] after:h-1 after:bg-cyan-400 after:-z-10 after:rounded-tl-xl"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}

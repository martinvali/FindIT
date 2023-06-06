"use client";
import { FormInput } from "../../components/FormInput";
import { useSupabase } from "../../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { Radio, Checkbox, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function NewJob() {
  const form = useForm({
    initialValues: {
      title: "",
      url: "",
      location: [],
      experience: "",
      type: "",
    },

    validate: {
      location(value) {
        if (!value || value.length === 0 || value.length > 2) {
          return "Please select up to 2 locations.";
        }
      },

      experience(value) {
        if (!value) {
          return "Please choose an experience level.";
        }
      },

      type(value) {
        if (!value) {
          return "Please choose a type.";
        }
      },
    },
  });

  const { supabase } = useSupabase();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = form.validate();
    console.log(form.values);
    if (!validate.hasErrors) {
      fetch("/api/jobs", { method: "POST", body: JSON.stringify(form.values) });
    }
  };

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">
          Post a new job
        </h1>
        <form className="max-w-xl mx-auto mb-4" onSubmit={handleSubmit}>
          <div className="flex flex-col text-left mb-6">
            <TextInput
              label="Title"
              radius="md"
              {...form.getInputProps("title")}
              withAsterisk
            />
          </div>

          <div className="flex flex-col text-left mb-6">
            <TextInput
              label="Application URL"
              radius="md"
              {...form.getInputProps("url")}
              withAsterisk
            />
          </div>
          <div className="flex flex-col text-left mb-6">
            <Checkbox.Group
              label="Location (select up to 2)"
              name="location"
              {...form.getInputProps("location", { type: "checkbox" })}
              withAsterisk
              required
            >
              <Checkbox value="Remote" label="Remote" />
              <Checkbox value="Tallinn" label="Tallinn" />
              <Checkbox value="Tartu" label="Tartu" />
              <Checkbox value="Pärnu" label="Pärnu" />
            </Checkbox.Group>
          </div>
          <div className="flex flex-col text-left mb-6">
            <Radio.Group
              name="experience"
              label="Experience level"
              required
              {...form.getInputProps("experience")}
              withAsterisk
            >
              <Radio value="Junior" label="Junior" />
              <Radio value="Mid-level" label="Mid-level" />
              <Radio value="Senior" label="Senior" />
            </Radio.Group>
          </div>

          <div className="flex flex-col text-left mb-6">
            <Radio.Group
              name="type"
              label="Type"
              {...form.getInputProps("type")}
              withAsterisk
            >
              <Radio value="Full-time" label="Full-time" />
              <Radio value="Part-time" label="Part-time" />
              <Radio value="Intership" label="Intership" />
            </Radio.Group>
          </div>

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

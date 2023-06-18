"use client";
import { useSupabase } from "../../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import {
  NativeSelect,
  Checkbox,
  TextInput,
  RangeSlider,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function NewJob({ post }) {
  let initialValues = {
    title: "",
    url: "",
    location: [],
    level: "",
    type: "",
    salary: [500, 500],
  };

  if (post) {
    initialValues = {
      title: post.title,
      url: post.url,
      location: post.location,
      level: post.level,
      type: post.type,
      salary: post.salary,
    };
  }

  const form = useForm({
    initialValues,
    validate: {
      location(value) {
        if (!value || value.length === 0 || value.length > 2) {
          return "Please select up to 2 locations.";
        }
      },

      level(value) {
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
    if (!validate.hasErrors) {
      if (!post) {
        fetch("/api/jobs", {
          method: "POST",
          body: JSON.stringify(form.values),
        });
      } else {
        fetch(`/api/jobs/${post.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...form.values, id: post.id }),
        });
      }
    }
  };

  const clearSalary = (e) => {
    e.preventDefault();
    form.setFieldValue("salary", [500, 500]);
  };

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">
          {post ? "Edit a job" : "Post a new job"}
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
              defaultValue={initialValues.location}
            >
              {["Remote", "Tallinn", "Tartu", "Pärnu"].map((location) => {
                return (
                  <Checkbox key={location} value={location} label={location} />
                );
              })}
            </Checkbox.Group>
          </div>
          <div className="flex flex-col text-left mb-6">
            <NativeSelect
              withAsterisk
              label="Experience level"
              {...form.getInputProps("level")}
            >
              <option hidden>Please choose an experience level</option>
              {["Junior", "Mid-level", "Senior"].map((level) => {
                return (
                  <option value={level} key={level}>
                    {level}
                  </option>
                );
              })}
            </NativeSelect>
          </div>

          <div className="flex flex-col text-left mb-6">
            <NativeSelect
              label="Job type"
              withAsterisk
              {...form.getInputProps("type")}
            >
              <option hidden>Please choose a type</option>
              {["Full-time", "Part-time", "Intership", "Contract"].map(
                (type) => {
                  return (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  );
                }
              )}
            </NativeSelect>
          </div>

          <div className="flex flex-col text-left mb-6">
            <div className="flex flex-row justify-between">
              <Text>Salary range (optional)</Text>
              <button
                onClick={clearSalary}
                className="text-cyan-500 font-semibold"
              >
                Clear
              </button>
            </div>
            <RangeSlider
              {...form.getInputProps("salary")}
              defaultValue={[500, 500]}
              min={500}
              max={10000}
              step={50}
              marks={[
                { value: 500, label: "500€" },
                { value: 2500, label: "2500€" },
                { value: 5000, label: "5000€" },
                { value: 7500, label: "7500€" },
                { value: 10000, label: "10000€" },
              ]}
            >
              <option hidden>Please choose a type</option>
              {["Full-time", "Part-time", "Intership", "Contract"].map(
                (type) => {
                  return (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  );
                }
              )}
            </RangeSlider>
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

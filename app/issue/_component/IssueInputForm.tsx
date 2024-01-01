"use client";

import { Button, Text, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { IssueForm } from "@/utils/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Issue } from "@prisma/client";

export default function IssueInputForm({ issue }: { issue?: Issue }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>();

  const route = useRouter();

  const submitForm = async (data: IssueForm) => {
    const req = issue
      ? axios.patch("/api/issue/" + issue.id, data)
      : axios.post("/api/issue", data);

    try {
      toast.promise(req, {
        pending: "Submitting issue",
        success: {
          render() {
            route.push(issue ? "/issue/" + issue.id : "/issue");
            route.refresh();
            return "Issue submitted 👌";
          },
        },
        error: "Failed to submit issue",
      });
    } catch (error) {
      toast("something went wrong, please try again.");
    }
  };

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit(submitForm)}>
      <TextFieldRoot>
        <TextFieldInput
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title", { required: true })}
        />
      </TextFieldRoot>
      {errors.title?.type === "required" && (
        <Text color="red" as="p">
          Title is required
        </Text>
      )}
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMdeReact placeholder="Description" {...field} />
        )}
      />

      {errors.description?.type === "required" && (
        <Text color="red" as="p">
          Description is required
        </Text>
      )}
      <Button disabled={isSubmitting} type="submit">
        {issue ? "Update Issue" : "Submit New Issue"}
      </Button>
    </form>
  );
}

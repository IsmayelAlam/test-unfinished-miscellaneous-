"use client";

import { Button, Text, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { IssueForm } from "@/utils/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function NewIssue() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>();

  const route = useRouter();

  const submitForm = async (data: IssueForm) => {
    try {
      toast.promise(axios.post("/api/issue", data), {
        pending: "Submitting new issue",
        success: {
          render() {
            route.push("/issue");
            route.refresh();
            return "New issue submitted 👌";
          },
        },
        error: {
          render({ data }) {
            return `${data.response.data?.description?._errors[0] || ""}
              ${data.response.data?.title?._errors[0] || ""}`;
          },
        },
      });
    } catch (error) {
      toast("something went wrong, please try again.");
    }
  };
  // console.log(isSubmitting);

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit(submitForm)}>
      <TextFieldRoot>
        <TextFieldInput
          placeholder="Title"
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
        rules={{ required: true }}
        render={({ field }) => (
          <SimpleMdeReact placeholder="Description" {...field} />
        )}
      />
      {errors.description?.type === "required" && (
        <Text color="red" as="p">
          Description is required
        </Text>
      )}
      <Button disabled={isSubmitting}>Submit New Issue</Button>
    </form>
  );
}

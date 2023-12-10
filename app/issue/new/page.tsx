"use client";

import { Button, TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { IssueForm } from "@/utils/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewIssue() {
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const route = useRouter();

  const submitForm = (data: IssueForm) => {
    axios.post("/api/issue", data);
    route.push("/issue");
  };

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit(submitForm)}>
      <TextFieldRoot>
        <TextFieldInput placeholder="Title" {...register("title")} required />
      </TextFieldRoot>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMdeReact placeholder="Description" {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
}

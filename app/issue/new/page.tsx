"use client";

import {
  Button,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";

import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function NewIssue() {
  return (
    <section className="space-y-4 max-w-xl">
      <TextFieldRoot>
        <TextFieldInput placeholder="Title" />
      </TextFieldRoot>
      <SimpleMdeReact />
      <Button>Submit New Issue</Button>
    </section>
  );
}

import {
  Button,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import React from "react";

export default function NewIssue() {
  return (
    <section className="space-y-4 max-w-xl">
      <TextFieldRoot>
        <TextFieldInput placeholder="Title" />
      </TextFieldRoot>
      <TextArea />
      <Button>Submit New Issue</Button>
    </section>
  );
}

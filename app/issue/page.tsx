import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function Issue() {
  return (
    <section>
      <Button>
        <Link href="/issue/new">Add New Issue</Link>
      </Button>
    </section>
  );
}

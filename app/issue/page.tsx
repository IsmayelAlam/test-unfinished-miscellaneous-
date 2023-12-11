import IssueStatusBadge from "@/components/IssueStatusBadge";
import { PrismaClient } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const prisma = new PrismaClient();

export default async function Issue() {
  const issues = await prisma.issue.findMany();
  // console.log(issues);

  return (
    <section>
      <Button>
        <Link href="/issue/new">Add New Issue</Link>
      </Button>

      <Table.Root variant="surface" mt="5">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>{issue.title}</Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </section>
  );
}

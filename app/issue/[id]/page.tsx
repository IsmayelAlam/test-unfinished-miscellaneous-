import IssueStatusBadge from "@/components/IssueStatusBadge";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function IssueDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return notFound();

  return (
    <div>
      {issue.title}
      {issue.createdAt.toDateString()}
      <IssueStatusBadge status={issue.status} />
      {issue.description}
    </div>
  );
}

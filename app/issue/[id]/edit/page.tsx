import { PrismaClient } from "@prisma/client";
import IssueInputForm from "../../_component/IssueInputForm";
import { notFound } from "next/navigation";
const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

export default async function EditIssue({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueInputForm issue={issue} />;
}

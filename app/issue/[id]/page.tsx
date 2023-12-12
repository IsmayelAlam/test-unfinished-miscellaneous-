import IssueStatusBadge from "@/components/IssueStatusBadge";
import { PrismaClient } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
      <Heading className="capitalize">{issue.title}</Heading>
      <Flex gap="5" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()} </Text>
      </Flex>
      <Card className="mt-5">
        <ReactMarkdown className="prose">{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}

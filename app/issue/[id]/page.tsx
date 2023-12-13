import IssueStatusBadge from "@/components/IssueStatusBadge";
import { PrismaClient } from "@prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PiNotePencilLight } from "react-icons/pi";
import Link from "next/link";

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
    <Grid columns="2" className="">
      <Box>
        <Heading className="capitalize">{issue.title}</Heading>
        <Flex gap="5" my="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()} </Text>
        </Flex>
        <Card className="mt-5">
          <ReactMarkdown className="prose">{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Flex direction="column" gap="2">
        <Button className="max-w-fit">
          <PiNotePencilLight />
          <Link href={`/issue/${params.id}/edit`}>Edit Issue</Link>
        </Button>
      </Flex>
    </Grid>
  );
}

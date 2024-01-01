import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createIssueSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be more than 5 characters long")
    .max(255),
  description: z
    .string()
    .min(50, "Description must be more than 50 characters long"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  const newIssue = await prisma.issue.findMany();

  return NextResponse.json(newIssue);
}

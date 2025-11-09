import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ZCreateTaskSchema } from '@/lib/validations';
import { z } from 'zod';

// GET all tasks for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tasks = await prisma.task.findMany({
      where: { projectId: id },
      include: {
        teamMember: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST create a new task for a project
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body with Zod
    const validatedData = ZCreateTaskSchema.parse(body);

    const task = await prisma.task.create({
      data: {
        name: validatedData.name,
        projectId: id,
        teamMemberId: validatedData.teamMemberId || null,
      },
      include: {
        teamMember: true,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

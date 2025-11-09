import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ZCreateProjectSchema } from '@/lib/validations';
import { z } from 'zod';

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = ZCreateProjectSchema.parse(body);

    const project = await prisma.project.create({
      data: {
        name: validatedData.name,
        status: validatedData.status || 'In Progress',
        progress: 0,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

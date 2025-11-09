import { z } from 'zod';

export const ZCreateProjectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Project name is too long'),
  status: z.enum(['In Progress', 'Completed']).optional(),
});

export const ZUpdateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  status: z.enum(['In Progress', 'Completed']).optional(),
  progress: z.number().min(0).max(100).optional(),
});

export const ZCreateTaskSchema = z.object({
  name: z
    .string()
    .min(1, 'Task name is required')
    .max(200, 'Task name is too long'),
  teamMemberId: z.string().nullable().optional(),
});

export const ZUpdateTaskSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  isComplete: z.boolean().optional(),
  teamMemberId: z.string().nullable().optional(),
});

export const ZCreateTeamMemberSchema = z.object({
  name: z
    .string()
    .min(1, 'Team member name is required')
    .max(100, 'Name is too long'),
});

export type CreateProjectInput = z.infer<typeof ZCreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof ZUpdateProjectSchema>;
export type CreateTaskInput = z.infer<typeof ZCreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof ZUpdateTaskSchema>;
export type CreateTeamMemberInput = z.infer<typeof ZCreateTeamMemberSchema>;
